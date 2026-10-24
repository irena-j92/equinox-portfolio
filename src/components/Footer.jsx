import { ArrowUp, ArrowUpRight } from "lucide-react";
import { scrollToSection } from "./Navigation.jsx";

export default function Footer({ page = "home" }) {
  return (
    <footer className="footer">
      <div className="footer-top" data-reveal>
        <a
          href="#top"
          className="wordmark"
          onClick={(event) => scrollToSection(event, "top")}
        >
          equinox
          <span className="wordmark-star" aria-hidden="true">
            ✳
          </span>
        </a>
        <a
          className="inline-link footer-about"
          href="#about"
          onClick={(e) => scrollToSection(e, "about")}
        >
          The human behind the work <ArrowUpRight size={15} />
        </a>
        <a
          href={page === "about" ? "#about" : "#top"}
          className="back-to-top"
          onClick={(event) =>
            scrollToSection(event, page === "about" ? "about" : "top")
          }
        >
          BACK TO THE TOP
          <ArrowUp size={16} />
        </a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} IRENA JURISIC</span>
        <span>DESIGNED WITH INTENTION. BUILT WITH CURIOSITY.</span>
        <span>BOSNIA & HERZEGOVINA / WORKING EVERYWHERE</span>
      </div>
    </footer>
  );
}
