import { Link, useParams } from "react-router-dom";
import { Mail, Phone } from "lucide-react";
import { PageBanner } from "@/components/layout/PageBanner";
import { SmartImage } from "@/components/ui/SmartImage";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/Icons";
import { TEAM, getLawyer, type Skill } from "@/content/equipe";
import { SITE, whatsappLink } from "@/config/site";
import { useDocumentTitle, useInView } from "@/hooks/useMotion";
import NotFound from "@/pages/NotFound";

/** Barra de habilidade que "enche" quando aparece na tela (igual às barras do original) */
function SkillBar({ skill }: { skill: Skill }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 });
  return (
    <div ref={ref} className="lba-skill">
      <div className="lba-skill__head">
        <span>{skill.label}</span>
        <span className="text-lba-steel">{skill.value}%</span>
      </div>
      <div className="lba-skill__track">
        <div className="lba-skill__bar" style={{ width: inView ? `${skill.value}%` : 0 }} />
      </div>
    </div>
  );
}

/** /team/:slug — página individual de cada advogado(a) (mesmo endereço do site antigo) */
export default function Equipe() {
  const { slug = "" } = useParams();
  const lawyer = getLawyer(slug);
  useDocumentTitle(lawyer ? `${lawyer.name} – LBA – Assessoria Jurídica` : undefined, lawyer?.bio[0]);

  if (!lawyer) return <NotFound />;
  const firstName = lawyer.name.split(" ")[0];
  const others = TEAM.filter((l) => l.slug !== lawyer.slug);

  return (
    <>
      <PageBanner title={lawyer.name} />

      <section className="py-[100px] max-md:py-[60px]">
        <div className="lba-container">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-[70px]">
            <div className="animate-fade-in">
              <div className="aspect-[1230/1500] overflow-hidden bg-[var(--lba-img-fallback)]">
                <SmartImage
                  src={lawyer.photo}
                  alt={`${lawyer.name} — ${lawyer.role} ${lawyer.oab}`}
                  className="h-full w-full object-cover"
                  width={1230}
                  height={1500}
                  fallbackLabel={lawyer.name
                    .split(" ")
                    .map((p) => p[0])
                    .join("")}
                />
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={lawyer.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#d7dfe8] px-4 py-2 text-[13px] font-bold uppercase tracking-[0.15em] text-lba-link transition-colors hover:border-lba-link hover:bg-lba-link hover:text-white"
                >
                  <InstagramIcon size={15} /> Instagram
                </a>
                <a
                  href={whatsappLink(`Olá, gostaria de falar com ${lawyer.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#d7dfe8] px-4 py-2 text-[13px] font-bold uppercase tracking-[0.15em] text-lba-link transition-colors hover:border-lba-link hover:bg-lba-link hover:text-white"
                >
                  <WhatsappIcon size={15} /> Falar com {firstName}
                </a>
              </div>
            </div>

            <div>
              <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-lba-steel">
                {lawyer.role} - {lawyer.oab}
              </p>
              <h2 className="lba-h2 mt-3 text-lba-ink">{lawyer.name}</h2>

              <div className="mt-10 grid gap-6">
                {lawyer.skills.map((s) => (
                  <SkillBar key={s.label} skill={s} />
                ))}
              </div>

              <div className="mt-12 grid gap-5">
                {lawyer.bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-12 grid gap-3 bg-lba-cream p-7 text-[16px]">
                <p className="flex items-center gap-3">
                  <Mail size={17} strokeWidth={1.5} className="text-lba-link" />
                  <span className="font-bold text-lba-ink">E-mail:</span>
                  <a href={`mailto:${SITE.email}`} className="lba-underline-hover break-all">
                    {SITE.email}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <Phone size={17} strokeWidth={1.5} className="text-lba-link" />
                  <span className="font-bold text-lba-ink">Telefone:</span>
                  <a href={`tel:${SITE.phone.tel}`} className="lba-underline-hover">
                    {SITE.phone.display}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h3 className="text-center text-[30px] text-lba-ink">Conheça também</h3>
            <div className="mx-auto mt-10 grid max-w-[900px] grid-cols-1 gap-8 sm:grid-cols-3">
              {others.map((o) => (
                <Link key={o.slug} to={`/team/${o.slug}`} className="group block text-center">
                  <div className="aspect-[570/696] overflow-hidden bg-[var(--lba-img-fallback)]">
                    <SmartImage
                      src={o.photo}
                      alt={o.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      fallbackLabel={o.name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    />
                  </div>
                  <h4 className="mt-4 text-[22px] font-medium text-lba-ink group-hover:text-lba-link">{o.name}</h4>
                  <p className="text-[12px] uppercase tracking-[0.05em] text-lba-steel">
                    {o.role} - {o.oab}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
