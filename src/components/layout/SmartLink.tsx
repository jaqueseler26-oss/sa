import { forwardRef, type AnchorHTMLAttributes, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scrollToId } from "@/lib/scroll";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Link que entende os 3 tipos de endereço do site:
 * - "/#Contato"  → rola suavemente até a seção (ou vai para a Home e rola)
 * - "/artigos"   → navegação interna (sem recarregar a página)
 * - "https://…", "tel:", "mailto:" → link externo normal
 */
export const SmartLink = forwardRef<HTMLAnchorElement, Props>(function SmartLink(
  { href, onClick, children, ...rest },
  ref,
) {
  const location = useLocation();
  const navigate = useNavigate();

  const isExternal = /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const [path, hash] = href.split("#");
  const targetPath = path || "/";

  if (hash) {
    const handle = (e: MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      e.preventDefault();
      if (location.pathname === targetPath) {
        const id = hash === "home" ? null : hash;
        if (id && scrollToId(id)) {
          window.history.replaceState(null, "", `${targetPath}#${hash}`);
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
          window.history.replaceState(null, "", targetPath);
        }
      } else {
        navigate(`${targetPath}#${hash}`);
      }
    };
    return (
      <a ref={ref} href={href} onClick={handle} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link ref={ref} to={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
});
