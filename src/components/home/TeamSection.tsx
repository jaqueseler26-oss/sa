import { Link } from "react-router-dom";
import { TEAM, type Lawyer } from "@/content/equipe";
import { TEAM_INTRO } from "@/content/home";
import { whatsappLink } from "@/config/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SmartImage } from "@/components/ui/SmartImage";
import { InstagramIcon } from "@/components/ui/Icons";
import { useTilt } from "@/hooks/useMotion";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

/** Card da equipe: inclinação 3D ao passar o mouse + máscara escura com Instagram */
function TeamCard({ lawyer }: { lawyer: Lawyer }) {
  const tiltRef = useTilt<HTMLDivElement>(5, 1500, 1000);
  const href = `/team/${lawyer.slug}`;

  return (
    <article ref={tiltRef} className="lba-team-card">
      <div className="lba-team-card__thumb">
        <SmartImage
          src={lawyer.photo}
          alt={`${lawyer.name} — ${lawyer.role} ${lawyer.oab}`}
          loading="lazy"
          width={570}
          height={696}
          fallbackLabel={initials(lawyer.name)}
        />
        <Link to={href} className="absolute inset-0 z-[1]" aria-label={`Ver perfil de ${lawyer.name}`} />
        <div className="lba-team-card__mask pointer-events-none z-[2]">
          <a
            href={lawyer.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="lba-team-card__social pointer-events-auto"
            aria-label={`Instagram de ${lawyer.name}`}
          >
            <InstagramIcon size={18} />
          </a>
        </div>
      </div>
      <div className="lba-team-card__info">
        <h4 className="lba-team-card__name">
          <Link to={href}>{lawyer.name}</Link>
        </h4>
        <p className="lba-team-card__role">
          {lawyer.role} - {lawyer.oab}
        </p>
      </div>
    </article>
  );
}

/** Seção "Nosso time de ESPECIALISTAS" (âncora #QuemSomos) */
export function TeamSection() {
  return (
    <section id="QuemSomos" className="lba-team">
      <div className="lba-container">
        <div className="lba-team__head">
          <SectionTitle
            subtitle={TEAM_INTRO.subtitle}
            title={TEAM_INTRO.title}
            subtitleColor="var(--lba-indigo)"
          />
          <p>{TEAM_INTRO.text}</p>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="lba-btn-simple">
            {TEAM_INTRO.button}
          </a>
        </div>

        <div className="lba-team__grid">
          {TEAM.map((lawyer) => (
            <TeamCard key={lawyer.slug} lawyer={lawyer} />
          ))}
        </div>
      </div>
    </section>
  );
}
