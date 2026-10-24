import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

export function scrollToSection(event, id) {
  if (
    event &&
    (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
  )
    return;
  event?.preventDefault();
  const changingPage =
    (id === "about") !== /^#about(?:$|-)/.test(window.location.hash);
  window.history[changingPage ? "pushState" : "replaceState"](
    null,
    "",
    `#${id}`,
  );
  window.dispatchEvent(new Event("portfolio:navigate"));
}

export default function Navigation({ page = "home" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  function navigate(event, id) {
    scrollToSection(event, id);
    setOpen(false);
  }
  return (
    <header
      className={`navigation ${scrolled ? "is-scrolled" : ""} ${page === "about" ? "on-about" : ""}`}
    >
      <a
        className="wordmark"
        href="#top"
        onClick={(e) => navigate(e, "top")}
        aria-label="Equinox, back to top"
      >
        equinox
        <span className="wordmark-star" aria-hidden="true">
          ✳
        </span>
      </a>
      <span className="nav-credit">
        THE CREATIVE WORLD OF
        <br />
        <strong>IRENA JURISIC</strong>
      </span>
      <nav
        aria-label="Main navigation"
        className={open ? "nav-links is-open" : "nav-links"}
        id="main-nav"
      >
        <a href="#work" onClick={(e) => navigate(e, "work")}>
          Work <sup>03</sup>
        </a>
        <a href="#practice" onClick={(e) => navigate(e, "practice")}>
          My practice
        </a>
        <a
          href="#about"
          aria-current={page === "about" ? "page" : undefined}
          onClick={(e) => navigate(e, "about")}
        >
          About me
        </a>
        <a
          className="nav-contact"
          href="#contact"
          onClick={(e) => navigate(e, "contact")}
        >
          Let’s talk <ArrowUpRight size={15} />
        </a>
      </nav>
      <button
        className="mobile-menu icon-button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="main-nav"
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}
