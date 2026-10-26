import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Inbox, Mail, Phone, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteMessage, listMessages, setMessageRead } from "@/lib/messages";
import { formatDateTime } from "@/lib/format";
import { WhatsappIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

/** Caixa de entrada com as mensagens do formulário "Fale conosco" */
export function MessagesList() {
  const qc = useQueryClient();
  const { data: messages = [], isLoading, error } = useQuery({ queryKey: ["mensagens"], queryFn: listMessages });

  const toggleRead = useMutation({
    mutationFn: ({ id, read }: { id: string; read: boolean }) => setMessageRead(id, read),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["mensagens"] }),
  });
  const remove = useMutation({
    mutationFn: (id: string) => deleteMessage(id),
    onSuccess: () => {
      toast.success("Mensagem excluída.");
      qc.invalidateQueries({ queryKey: ["mensagens"] });
    },
  });

  if (isLoading) return <p className="py-10 text-center text-lba-steel">Carregando mensagens…</p>;
  if (error)
    return (
      <p className="rounded-lg bg-[#fdf0f0] p-4 text-[#b42318]">
        Não foi possível carregar as mensagens. Confira se a migração do banco foi aplicada (LOVABLE.md).
      </p>
    );
  if (!messages.length)
    return (
      <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[#d5dce5] bg-white py-16 text-center text-lba-steel">
        <Inbox size={28} />
        Nenhuma mensagem recebida ainda.
      </div>
    );

  return (
    <div className="grid gap-4">
      {messages.map((m) => {
        const digits = m.phone.replace(/\D/g, "");
        return (
          <article
            key={m.id}
            className={cn(
              "rounded-xl border bg-white p-5 shadow-sm transition",
              m.read ? "border-[#e3e8ee]" : "border-lba-link/40 ring-1 ring-lba-link/10",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-sans text-[16px] font-bold normal-case text-[#1f2840]">
                  {!m.read && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-lba-link align-middle" />}
                  {m.name}
                </h3>
                <p className="mt-0.5 text-[13px] text-lba-steel">
                  {formatDateTime(m.createdAt)} · Tema: <strong className="text-[#3d4660]">{m.subject || "—"}</strong>
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => toggleRead.mutate({ id: m.id, read: !m.read })}
                  className="rounded-md px-3 py-1.5 text-[12.5px] font-semibold text-lba-link hover:bg-[#eef3f8]"
                >
                  {m.read ? "Marcar como não lida" : "Marcar como lida"}
                </button>
                <button
                  type="button"
                  onClick={() => window.confirm("Excluir esta mensagem?") && remove.mutate(m.id)}
                  className="rounded-md p-2 text-[#b42318] hover:bg-[#fdf0f0]"
                  aria-label="Excluir mensagem"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-relaxed text-[#2b3550]">{m.message}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-[13px]">
              <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1.5 rounded-md bg-[#eef3f8] px-3 py-1.5 text-lba-link">
                <Mail size={14} /> {m.email}
              </a>
              {digits && (
                <>
                  <a href={`tel:+55${digits}`} className="inline-flex items-center gap-1.5 rounded-md bg-[#eef3f8] px-3 py-1.5 text-lba-link">
                    <Phone size={14} /> {m.phone}
                  </a>
                  <a
                    href={`https://api.whatsapp.com/send?phone=55${digits}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#e8f7ee] px-3 py-1.5 text-[#1f7a3a]"
                  >
                    <WhatsappIcon size={14} /> WhatsApp
                  </a>
                </>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}
