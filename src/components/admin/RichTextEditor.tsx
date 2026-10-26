import { useEffect, useRef } from "react";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Heading2,
  Heading3,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
} from "lucide-react";
import { toast } from "sonner";
import { uploadArticleImage } from "@/lib/articles";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

function ToolButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md text-[#3d4660] transition-colors hover:bg-[#eef3f8] disabled:opacity-35",
        active && "bg-[#e3ecf6] text-lba-link",
      )}
    >
      {children}
    </button>
  );
}

const Sep = () => <span className="mx-1 h-6 w-px bg-[#e3e8ee]" aria-hidden="true" />;

function Toolbar({ editor, onPickImage }: { editor: Editor; onPickImage: () => void }) {
  const setLink = () => {
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Endereço do link (https://…)", previous || "https://");
    if (url === null) return;
    if (url.trim() === "" || url.trim() === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  return (
    <div className="sticky top-16 z-10 flex flex-wrap items-center gap-0.5 rounded-t-lg border border-b-0 border-[#d5dce5] bg-white px-2 py-1.5">
      <ToolButton label="Desfazer" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <Undo2 size={16} />
      </ToolButton>
      <ToolButton label="Refazer" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <Redo2 size={16} />
      </ToolButton>
      <Sep />
      <ToolButton label="Parágrafo" onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive("paragraph")}>
        <Pilcrow size={16} />
      </ToolButton>
      <ToolButton
        label="Título"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
      >
        <Heading2 size={17} />
      </ToolButton>
      <ToolButton
        label="Subtítulo"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
      >
        <Heading3 size={17} />
      </ToolButton>
      <Sep />
      <ToolButton label="Negrito" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
        <Bold size={16} />
      </ToolButton>
      <ToolButton label="Itálico" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
        <Italic size={16} />
      </ToolButton>
      <ToolButton
        label="Sublinhado"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        active={editor.isActive("underline")}
      >
        <UnderlineIcon size={16} />
      </ToolButton>
      <ToolButton label="Riscado" onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}>
        <Strikethrough size={16} />
      </ToolButton>
      <Sep />
      <ToolButton label="Lista" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
        <List size={17} />
      </ToolButton>
      <ToolButton
        label="Lista numerada"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
      >
        <ListOrdered size={17} />
      </ToolButton>
      <ToolButton label="Citação" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
        <Quote size={16} />
      </ToolButton>
      <ToolButton label="Linha divisória" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus size={17} />
      </ToolButton>
      <Sep />
      <ToolButton
        label="Alinhar à esquerda"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        active={editor.isActive({ textAlign: "left" })}
      >
        <AlignLeft size={16} />
      </ToolButton>
      <ToolButton
        label="Centralizar"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        active={editor.isActive({ textAlign: "center" })}
      >
        <AlignCenter size={16} />
      </ToolButton>
      <ToolButton
        label="Alinhar à direita"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        active={editor.isActive({ textAlign: "right" })}
      >
        <AlignRight size={16} />
      </ToolButton>
      <ToolButton
        label="Justificar"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        active={editor.isActive({ textAlign: "justify" })}
      >
        <AlignJustify size={16} />
      </ToolButton>
      <Sep />
      <ToolButton label="Inserir link" onClick={setLink} active={editor.isActive("link")}>
        <Link2 size={16} />
      </ToolButton>
      <ToolButton
        label="Remover link"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
      >
        <Unlink size={16} />
      </ToolButton>
      <ToolButton label="Inserir imagem" onClick={onPickImage}>
        <ImagePlus size={16} />
      </ToolButton>
    </div>
  );
}

/**
 * Editor de texto dos artigos (TipTap).
 * Dica: dá para COLAR um texto do Word, Google Docs ou do site antigo — a formatação básica é mantida.
 */
export function RichTextEditor({ value, onChange, placeholder = "Escreva ou cole aqui o texto do artigo…" }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] } }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ inline: false }),
      Placeholder.configure({ placeholder }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: "lba-prose min-h-[420px] px-6 py-5 outline-none",
      },
    },
    onUpdate: ({ editor: ed }) => onChange(ed.isEmpty ? "" : ed.getHTML()),
  });

  // quando o artigo termina de carregar, coloca o conteúdo no editor
  useEffect(() => {
    if (!editor) return;
    const current = editor.isEmpty ? "" : editor.getHTML();
    if (value !== current) editor.commands.setContent(value || "", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, value === "" ? "vazio" : "cheio"]);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;
    const id = toast.loading("Enviando imagem…");
    try {
      const url = await uploadArticleImage(file);
      editor.chain().focus().setImage({ src: url, alt: "" }).run();
      toast.success("Imagem inserida.", { id });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha ao enviar imagem.", { id });
    }
  };

  if (!editor) return <div className="h-[480px] animate-pulse rounded-lg border border-[#d5dce5] bg-white" />;

  return (
    <div>
      <Toolbar editor={editor} onPickImage={() => fileRef.current?.click()} />
      <div className="rounded-b-lg border border-[#d5dce5] bg-white">
        <EditorContent editor={editor} />
      </div>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
    </div>
  );
}
