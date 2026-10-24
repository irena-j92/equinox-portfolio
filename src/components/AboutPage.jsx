import { ArrowDown, ArrowUpRight } from "lucide-react";
import { scrollToSection } from "./Navigation.jsx";

export default function AboutPage() {
  return (
    <article className="about-page" id="about" aria-labelledby="about-title">
      <header className="about-hero section-pad">
        <p className="eyebrow">A LITTLE ABOUT THE HUMAN BEHIND EQUINOX</p>
        <h1 id="about-title">
          A curious mind.
          <br />
          <span className="serif">An open horizon.</span>
        </h1>
        <div className="about-intro">
          <span className="about-monogram" aria-hidden="true">
            ij<span>✳</span>
          </span>
          <div>
            <p>Hello, I’m Irena.</p>
            <p>
              A designer and creative developer, finding my way through the
              space where art, people, and technology meet.
            </p>
          </div>
          <a
            href="#about-content"
            className="about-read"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("about-content")
                ?.scrollIntoView({
                  behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)",
                  ).matches
                    ? "instant"
                    : "smooth",
                });
            }}
          >
            MY STORY <ArrowDown size={18} />
          </a>
        </div>
      </header>
      <div className="about-landscape" data-reveal>
        <img
          src="/assets/oasis.webp"
          alt="A pale path winding between sage hills, sandstone dunes and still water."
          width="1672"
          height="941"
        />
        <span>THERE’S ALWAYS ANOTHER WAY TO SEE IT.</span>
      </div>
      <section
        className="about-story section-pad"
        id="about-content"
        aria-labelledby="about-story-title"
      >
        <p className="eyebrow" data-reveal>
          THE THREAD THAT CONNECTS IT ALL
        </p>
        <div className="about-story-copy" data-reveal>
          <h2 id="about-story-title">
            I started with images.
            <br />
            <span className="serif">Then I wanted them to move.</span>
          </h2>
          <p>
            My roots are in graphic arts: composition, color, and the quiet
            details that give something its character. Over time, my curiosity
            moved beyond how things look to how they work—and how they make
            people feel.
          </p>
          <p>
            That led me into UX/UI design, then into code. Today, I move between
            sketching an idea, shaping an interface, and building the
            interactions that bring it to life. I like being close to the whole
            process.
          </p>
          <p>
            Whether I’m making a thoughtful product or an experimental digital
            world, I’m looking for the same thing: something clear enough to
            use, and expressive enough to remember.
          </p>
        </div>
      </section>
      <section
        className="about-perspective section-pad"
        aria-labelledby="perspective-title"
      >
        <div data-reveal>
          <p className="eyebrow">A FEW THINGS I BRING WITH ME</p>
          <h2 id="perspective-title">
            Different perspectives.
            <br />
            <span className="serif">One point of view.</span>
          </h2>
        </div>
        <div className="about-notes">
          <div data-reveal>
            <span>01</span>
            <h3>An artist’s eye.</h3>
            <p>
              A background in graphic arts and art education. A lasting love for
              expressive typography, thoughtful composition, and a little visual
              surprise.
            </p>
          </div>
          <div data-reveal>
            <span>02</span>
            <h3>A designer’s empathy.</h3>
            <p>
              A curiosity about people: what they need, where they get stuck,
              and what might make an everyday interaction feel a little more
              human.
            </p>
          </div>
          <div data-reveal>
            <span>03</span>
            <h3>A builder’s curiosity.</h3>
            <p>
              I learn by making. Code gives me a way to test an idea, follow an
              unexpected direction, and keep the small details intact.
            </p>
          </div>
        </div>
      </section>
      <div className="about-location section-pad" data-reveal>
        <span className="eyebrow">ROOTED SOMEWHERE. OPEN TO EVERYWHERE.</span>
        <p>
          Based in Bosnia & Herzegovina, shaped by nearly a decade in Germany.
          Comfortable collaborating in English and German, wherever the next
          good idea takes us.
        </p>
      </div>
      <section
        className="about-end section-pad"
        aria-labelledby="about-end-title"
        data-reveal
      >
        <p className="eyebrow">ENOUGH ABOUT ME</p>
        <h2 id="about-end-title">
          What are you
          <br />
          <span className="serif">curious about?</span>
        </h2>
        <div>
          <a
            className="pill-button dark"
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
          >
            Let’s make something <ArrowUpRight size={18} />
          </a>
          <a
            className="inline-link"
            href="#work"
            onClick={(e) => scrollToSection(e, "work")}
          >
            Explore my work <ArrowUpRight size={16} />
          </a>
        </div>
      </section>
    </article>
  );
}
