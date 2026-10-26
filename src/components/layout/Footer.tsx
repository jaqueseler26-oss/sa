import { IMAGES, NAV_ITEMS, SITE, whatsappLink } from "@/config/site";
import { FOOTER } from "@/content/home";
import { SmartLink } from "@/components/layout/SmartLink";
import { InstagramIcon, WhatsappIcon } from "@/components/ui/Icons";
import { bgImage } from "@/components/ui/SmartImage";

/** Rodapé azul-marinho com a imagem de fundo do original */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="lba-footer" style={bgImage(IMAGES.footerBg, "linear-gradient(#242353,#242353)")}>
      <div className="lba-container">
        <div className="lba-footer__top">
          <h2 className="lba-h2 lba-footer__title">{FOOTER.title}</h2>

          <div className="lba-footer__col">
            <h6>{FOOTER.addressLabel}</h6>
            <p>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {SITE.address}
              </a>
            </p>
            <div className="lba-footer__socials">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da LBA">
                <InstagramIcon size={18} />
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da LBA">
                <WhatsappIcon size={18} />
              </a>
            </div>
          </div>

          <div className="lba-footer__col">
            <h6>{FOOTER.contactLabel}</h6>
            <p>
              <a href={`mailto:${SITE.email}`} className="lba-underline-anim">
                {SITE.email}
              </a>
            </p>
            <p className="mt-2">
              <a href={`tel:${SITE.phone.tel}`} className="!text-[18px] !font-normal hover:text-white">
                {SITE.phone.display}
              </a>
            </p>
          </div>
        </div>

        <div className="lba-footer__divider" />

        <div className="lba-footer__bottom">
          <nav aria-label="Menu do rodapé">
            <ul className="lba-menu lba-menu--footer flex-wrap">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <SmartLink href={item.href}>
                    <span>{item.label}</span>
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
          <p className="lba-footer__copy">
            © {year} – {FOOTER.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
