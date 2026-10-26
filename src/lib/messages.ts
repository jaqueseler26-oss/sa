/**
 * MENSAGENS DO FORMULÁRIO "FALE CONOSCO"
 * - Com banco: salva em public.contact_messages e aparecem no painel /admin (aba Mensagens).
 * - Sem banco: guarda no navegador e o site oferece enviar pelo WhatsApp (o contato nunca se perde).
 */
import { supabase, hasBackend } from "@/lib/backend";
import type { ContactMessage, ContactMessageInput } from "@/lib/types";
import { safeStorage, uid } from "@/lib/utils";

const LOCAL_KEY = "lba:mensagens:v1";

type Row = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  read: boolean;
  created_at: string;
};

const fromRow = (r: Row): ContactMessage => ({
  id: r.id,
  name: r.name,
  email: r.email,
  phone: r.phone,
  subject: r.subject,
  message: r.message,
  consent: r.consent,
  read: r.read,
  createdAt: r.created_at,
});

/** Retorna "banco" quando salvou no banco, ou "local" quando não há banco configurado */
export async function sendContactMessage(input: ContactMessageInput): Promise<"banco" | "local"> {
  if (!hasBackend) {
    const list = safeStorage.get<ContactMessage[]>(LOCAL_KEY, []);
    list.unshift({ ...input, id: uid("msg"), read: false, createdAt: new Date().toISOString() });
    safeStorage.set(LOCAL_KEY, list.slice(0, 200));
    return "local";
  }
  const { error } = await supabase!.from("contact_messages").insert({
    name: input.name,
    email: input.email,
    phone: input.phone,
    subject: input.subject,
    message: input.message,
    consent: input.consent,
  });
  if (error) throw error;
  return "banco";
}

export async function listMessages(): Promise<ContactMessage[]> {
  if (!hasBackend) return safeStorage.get<ContactMessage[]>(LOCAL_KEY, []);
  const { data, error } = await supabase!
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as Row[]).map(fromRow);
}

export async function setMessageRead(id: string, read: boolean) {
  if (!hasBackend) {
    const list = safeStorage.get<ContactMessage[]>(LOCAL_KEY, []);
    safeStorage.set(
      LOCAL_KEY,
      list.map((m) => (m.id === id ? { ...m, read } : m)),
    );
    return;
  }
  const { error } = await supabase!.from("contact_messages").update({ read }).eq("id", id);
  if (error) throw error;
}

export async function deleteMessage(id: string) {
  if (!hasBackend) {
    const list = safeStorage.get<ContactMessage[]>(LOCAL_KEY, []);
    safeStorage.set(
      LOCAL_KEY,
      list.filter((m) => m.id !== id),
    );
    return;
  }
  const { error } = await supabase!.from("contact_messages").delete().eq("id", id);
  if (error) throw error;
}
