import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Mail, MessageSquareText, PenLine, Phone, Send, User } from "lucide-react";
import { CONTACT } from "@/content/home";
import { whatsappLink } from "@/config/site";
import { sendContactMessage } from "@/lib/messages";
import { WhatsappIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type Fields = { name: string; email: string; phone: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields | "consent", string>>;

const EMPTY: Fields = { name: "", email: "", phone: "", subject: "", message: "" };

/** Máscara de telefone brasileiro: (69) 99204-8517 */
function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validate(f: Fields, consent: boolean): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Informe o seu nome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Informe um e-mail válido.";
  if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Informe um telefone com DDD.";
  if (f.subject.trim().length < 2) e.subject = "Informe o tema.";
  if (f.message.trim().length < 5) e.message = "Escreva a sua mensagem.";
  if (!consent) e.consent = "É preciso concordar com a política de privacidade.";
  return e;
}

function Field({
  name,
  icon,
  error,
  children,
}: {
  name: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("lba-field", error && "has-error")}>
      <span className="lba-field__icon">{icon}</span>
      {children}
      <div className="lba-field__line" />
      {error && (
        <p className="lba-field__error" id={`${name}-erro`}>
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Formulário "Fale conosco" — mesmos campos do original (Nome, E-mail, Telefone, Tema, Mensagem
 * e aceite da política de privacidade). Linha embaixo de cada campo se acende ao digitar.
 */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent-db" | "sent-local" | "error">("idle");
  const [lastMessage, setLastMessage] = useState("");

  const set = (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = key === "phone" ? maskPhone(e.target.value) : e.target.value;
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // robô
    const found = validate(fields, consent);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus("idle");
      return;
    }
    setStatus("sending");
    const whatsappText =
      `Olá! Meu nome é ${fields.name.trim()}.\n` +
      `Tema: ${fields.subject.trim()}\n` +
      `${fields.message.trim()}\n\n` +
      `E-mail: ${fields.email.trim()} | Telefone: ${fields.phone}`;
    try {
      const where = await sendContactMessage({ ...fields, consent });
      setLastMessage(whatsappText);
      setFields(EMPTY);
      setConsent(false);
      setStatus(where === "banco" ? "sent-db" : "sent-local");
    } catch (err) {
      console.error(err);
      setLastMessage(whatsappText);
      setStatus("error");
    }
  };

  const f = CONTACT.form;

  return (
    <form className="lba-form" onSubmit={onSubmit} noValidate aria-label="Formulário de contato">
      {/* campo invisível anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div className="lba-form__row">
        <Field name="name" icon={<User size={19} strokeWidth={1.4} />} error={errors.name}>
          <input
            name="name"
            type="text"
            placeholder={f.name}
            aria-label={f.name}
            autoComplete="name"
            value={fields.name}
            onChange={set("name")}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-erro" : undefined}
          />
        </Field>
        <Field name="email" icon={<Mail size={19} strokeWidth={1.4} />} error={errors.email}>
          <input
            name="email"
            type="email"
            placeholder={f.email}
            aria-label={f.email}
            autoComplete="email"
            value={fields.email}
            onChange={set("email")}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-erro" : undefined}
          />
        </Field>
      </div>

      <div className="lba-form__row">
        <Field name="phone" icon={<Phone size={19} strokeWidth={1.4} />} error={errors.phone}>
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            placeholder={f.phone}
            aria-label={f.phone}
            autoComplete="tel"
            value={fields.phone}
            onChange={set("phone")}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-erro" : undefined}
          />
        </Field>
        <Field name="subject" icon={<MessageSquareText size={19} strokeWidth={1.4} />} error={errors.subject}>
          <input
            name="subject"
            type="text"
            placeholder={f.subject}
            aria-label={f.subject}
            value={fields.subject}
            onChange={set("subject")}
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? "subject-erro" : undefined}
          />
        </Field>
      </div>

      <Field name="message" icon={<PenLine size={19} strokeWidth={1.4} />} error={errors.message}>
        <textarea
          name="message"
          rows={3}
          placeholder={f.message}
          aria-label="Mensagem"
          value={fields.message}
          onChange={set("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-erro" : undefined}
        />
      </Field>

      <div className="lba-form__actions">
        <button type="submit" className="lba-btn lba-submit" disabled={status === "sending"}>
          <Send size={14} strokeWidth={2} aria-hidden="true" />
          {status === "sending" ? "Enviando…" : f.submit}
        </button>
        <label className="lba-consent">
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>
            {f.consentPrefix} <Link to="/politica-de-privacidade">{f.consentLink}</Link>.
          </span>
        </label>
      </div>
      {errors.consent && <p className="lba-field__error -mt-3">{errors.consent}</p>}

      <div aria-live="polite">
        {status === "sent-db" && (
          <div className="lba-form__notice">
            Obrigado pela mensagem! Ela foi enviada e entraremos em contato em breve.{" "}
            <a href={whatsappLink(lastMessage)} target="_blank" rel="noopener noreferrer" className="font-bold text-lba-link underline">
              Prefere falar agora pelo WhatsApp?
            </a>
          </div>
        )}
        {status === "sent-local" && (
          <div className="lba-form__notice">
            Mensagem pronta! Toque no botão abaixo para enviá-la ao escritório pelo WhatsApp.
            <a
              href={whatsappLink(lastMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="lba-btn mt-3 !flex w-fit !bg-[#1f8f4e] hover:!bg-[#17713d]"
            >
              <WhatsappIcon size={16} /> Enviar pelo WhatsApp
            </a>
          </div>
        )}
        {status === "error" && (
          <div className="lba-form__notice is-error">
            Não foi possível enviar agora.{" "}
            <a href={whatsappLink(lastMessage)} target="_blank" rel="noopener noreferrer" className="font-bold underline">
              Envie pelo WhatsApp
            </a>{" "}
            ou escreva para o nosso e-mail.
          </div>
        )}
      </div>
    </form>
  );
}
