import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "./Navigation.jsx";

gsap.registerPlugin(ScrollTrigger);
const beats = [
  {
    title: (
      <>
        Look a little
        <br />
        <em>closer.</em>
      </>
    ),
    text: "Behind every finished experience is a question worth exploring.",
    label: "CURIOSITY",
  },
  {
    title: (
      <>
        Imagine it
        <br />
        <em>differently.</em>
      </>
    ),
    text: "A familiar place. An unexpected perspective. A new way to feel.",
    label: "POSSIBILITY",
  },
  {
    title: (
      <>
        Then make
        <br />
        <em>it real.</em>
      </>
    ),
    text: "This is where intuition meets intention. And design meets code.",
    label: "CRAFT",
  },
];

export default function PortalStory({ motion }) {
  const root = useRef(null);
  const timeline = useRef(null);
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!motion) return;
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 800px)",
      () => {
        const element = root.current;
        element.classList.add("is-animated");
        const panels = element.querySelectorAll(".portal-beat");
        gsap.set(panels, { opacity: 0, y: 24 });
        gsap.set(panels[0], { opacity: 1, y: 0 });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
            invalidateOnRefresh: true,
            onUpdate: (self) =>
              setActive(
                self.progress < 0.32 ? 0 : self.progress < 0.66 ? 1 : 2,
              ),
          },
        });
        tl.to(".portal-art", { scale: 1.14, ease: "none", duration: 1 }, 0)
          .to(
            ".portal-progress-fill",
            { scaleX: 1, ease: "none", duration: 1 },
            0,
          )
          .to(panels[0], { opacity: 0, y: -24, duration: 0.12 }, 0.22)
          .to(panels[1], { opacity: 1, y: 0, duration: 0.12 }, 0.32)
          .to(panels[1], { opacity: 0, y: -24, duration: 0.12 }, 0.57)
          .to(panels[2], { opacity: 1, y: 0, duration: 0.12 }, 0.67)
          .to(
            ".portal-exit-veil",
            { opacity: 1, ease: "none", duration: 0.12 },
            0.88,
          );
        timeline.current = tl;
        return () => {
          element.classList.remove("is-animated");
          timeline.current = null;
        };
      },
      root,
    );
    return () => media.revert();
  }, [motion]);
  function goToBeat(index) {
    const trigger = timeline.current?.scrollTrigger;
    if (!trigger) return;
    window.scrollTo({
      top:
        trigger.start +
        (trigger.end - trigger.start) * [0.03, 0.46, 0.88][index],
      behavior: "smooth",
    });
  }
  return (
    <section
      className="portal-story"
      ref={root}
      id="possibility"
      aria-label="From curiosity to craft"
    >
      <div className="portal-stage">
        <div className="portal-visual" aria-hidden="true">
          <img
            className="portal-art"
            src="/assets/portal.webp"
            alt=""
            loading="lazy"
            decoding="async"
            width="1672"
            height="941"
          />
          <div className="portal-shade" />
        </div>
        <div className="portal-topline">
          <span className="eyebrow">ON THE OTHER SIDE OF “WHAT IF”</span>
          <span className="eyebrow">IMAGINATION → INTERACTION</span>
        </div>
        <div className="portal-copy">
          {beats.map((beat, index) => (
            <div className="portal-beat" key={beat.label}>
              <span className="eyebrow">
                0{index + 1} / {beat.label}
              </span>
              <h2>{beat.title}</h2>
              <p>{beat.text}</p>
            </div>
          ))}
        </div>
        <div className="portal-caption">
          <span>
            AN OPENING.
            <br />
            NOT AN ENDPOINT.
          </span>
          <span>
            Every project is a chance
            <br />
            to see something anew.
          </span>
        </div>
        <div className="portal-bottom">
          <div
            className="portal-chapters"
            aria-label="Explore the creative process"
          >
            {beats.map((beat, index) => (
              <button
                key={beat.label}
                onClick={() => goToBeat(index)}
                aria-label={`Go to ${beat.label.toLowerCase()}`}
                aria-pressed={active === index}
              >
                <span>0{index + 1}</span>
                {beat.label}
              </button>
            ))}
          </div>
          <a
            className="portal-continue"
            href="#practice"
            onClick={(e) => scrollToSection(e, "practice")}
          >
            MEET THE CRAFT <ArrowDown size={16} />
          </a>
        </div>
        <div className="portal-progress" aria-hidden="true">
          <span className="portal-progress-fill" />
        </div>
        <div className="portal-exit-veil" aria-hidden="true" />
      </div>
    </section>
  );
}
