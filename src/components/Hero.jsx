import { lazy, Suspense, useEffect, useRef } from "react";
import { ArrowDown, Pause, Play } from "lucide-react";
import gsap from "gsap";
import { scrollToSection } from "./Navigation.jsx";

const Landscape = lazy(() => import("./Landscape.jsx"));

export default function Hero({ motion, onToggleMotion, reduced }) {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-reveal",
        { y: motion ? 24 : 0, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: motion ? 0.55 : 0,
          stagger: motion ? 0.08 : 0,
          ease: "power3.out",
          clearProps: "transform",
        },
      );
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <section className="hero" id="top" ref={root} aria-labelledby="hero-title">
      <div className="hero-art" aria-hidden="true">
        <img
          className="landscape-fallback"
          src="/assets/oasis.webp"
          alt=""
          fetchPriority="high"
          width="1672"
          height="941"
        />
        {!reduced && (
          <Suspense fallback={null}>
            <Landscape motion={motion} />
          </Suspense>
        )}
      </div>
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-kicker hero-reveal">
          DESIGNER, DEVELOPER & A CURIOUS HUMAN
        </p>
        <h1 id="hero-title" className="hero-reveal">
          Follow your
          <br />
          <span className="serif">curiosity.</span>
        </h1>
        <p className="hero-introduction hero-reveal">
          I’m Irena. I make digital places
          <br />
          that invite you to feel, explore, and stay.
        </p>
      </div>
      <div className="hero-bottom hero-reveal">
        <span className="hero-note">
          A CREATIVE WORLD
          <br />
          BETWEEN DESIGN & CODE
        </span>
        <a
          className="explore-link"
          href="#beginning"
          onClick={(e) => scrollToSection(e, "beginning")}
        >
          <span>FOLLOW THE PATH</span>
          <span className="arrow-box">
            <ArrowDown size={19} />
          </span>
        </a>
        <button
          className="motion-toggle"
          onClick={onToggleMotion}
          disabled={reduced}
          title={
            reduced
              ? "Motion follows your device’s reduced-motion setting"
              : undefined
          }
          aria-label={
            reduced
              ? "Reduced motion enabled by your device"
              : motion
                ? "Pause ambient motion"
                : "Enable ambient motion"
          }
          aria-pressed={!motion}
        >
          {motion ? <Pause size={13} /> : <Play size={13} />}
          <span>
            {reduced ? "REDUCED MOTION" : `MOTION ${motion ? "ON" : "OFF"}`}
          </span>
        </button>
      </div>
    </section>
  );
}
