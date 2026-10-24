import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  Layers2,
  MoveUpRight,
  Sparkles,
  Waves,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "../data/portfolio.js";

gsap.registerPlugin(ScrollTrigger);
const icons = {
  layout: Layers2,
  flower: Sparkles,
  waves: Waves,
  code: Code2,
  spark: MoveUpRight,
};

export default function Practice({ motion }) {
  const root = useRef(null);
  const stage = useRef(null);
  const cards = useRef([]);
  const expandedRef = useRef(false);
  const selectedRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState(null);

  const arrange = useCallback(
    (fan, immediate = false, active = null) => {
      const width = stage.current?.clientWidth || 1000;
      const small = width < 600;
      const step = Math.min(small ? 124 : 215, width * (small ? 0.235 : 0.188));
      cards.current.forEach((card, i) => {
        if (!card) return;
        const offset = i - 2;
        const isActive = active === i;
        const x = fan ? offset * step : offset * 7;
        const y = fan
          ? Math.abs(offset) * Math.abs(offset) * (small ? 15 : 18) -
            (isActive ? 35 : 0)
          : Math.abs(offset) * 4;
        gsap.to(card, {
          x,
          y,
          rotation: fan
            ? isActive
              ? 0
              : offset * (small ? 9 : 9)
            : offset * 4,
          scale: isActive ? 1.055 : 1,
          zIndex: isActive ? 20 : 5 - Math.abs(offset),
          duration: immediate || !motion ? 0 : 0.9,
          delay:
            immediate || !motion || active !== null
              ? 0
              : Math.abs(offset) * 0.035,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    },
    [motion],
  );
  useEffect(() => {
    if (!motion) {
      expandedRef.current = true;
      setExpanded(true);
    }
    arrange(expandedRef.current, true, selectedRef.current);
    const trigger = motion
      ? ScrollTrigger.create({
          trigger: root.current,
          start: "top 55%",
          once: true,
          onEnter: () => {
            expandedRef.current = true;
            setExpanded(true);
            arrange(true);
          },
        })
      : null;
    const resize = new ResizeObserver(() =>
      arrange(expandedRef.current, true, selectedRef.current),
    );
    resize.observe(stage.current);
    return () => {
      trigger?.kill();
      resize.disconnect();
      cards.current.forEach((card) => gsap.killTweensOf(card));
    };
  }, [arrange]);
  function toggle() {
    const next = !expandedRef.current;
    expandedRef.current = next;
    selectedRef.current = null;
    setExpanded(next);
    setSelected(null);
    arrange(next);
  }
  function select(index) {
    if (!expandedRef.current) {
      expandedRef.current = true;
      setExpanded(true);
    }
    selectedRef.current = index;
    setSelected(index);
    arrange(true, false, index);
  }
  function release() {
    selectedRef.current = null;
    arrange(expandedRef.current);
  }
  return (
    <section
      id="practice"
      className="practice section-pad"
      ref={root}
      aria-labelledby="practice-title"
    >
      <div className="section-topline" data-reveal>
        <span className="eyebrow">
          FROM POSSIBILITY TO SOMETHING YOU CAN TOUCH
        </span>
        <span className="eyebrow muted">THE PRACTICE</span>
      </div>
      <div className="practice-intro" data-reveal>
        <p className="eyebrow">
          MANY WAYS IN.
          <br />
          ONE CONNECTED PROCESS.
        </p>
        <div>
          <h2 id="practice-title">
            A thought. A sketch.
            <br />
            <span className="serif">Something real.</span>
          </h2>
          <p>
            I move between disciplines to keep the idea intact.
            <br />
            From the first question to the smallest interaction.
          </p>
        </div>
      </div>
      <div
        className={`card-stage ${expanded ? "is-expanded" : ""}`}
        ref={stage}
      >
        <div className="card-ground" aria-hidden="true" />
        {skills.map((skill, index) => {
          const Icon = icons[skill.icon];
          return (
            <button
              key={skill.id}
              ref={(element) => (cards.current[index] = element)}
              className={`skill-card ${selected === index ? "is-selected" : ""}`}
              style={{ "--card-color": skill.color }}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") select(index);
              }}
              onPointerLeave={release}
              onFocus={() => select(index)}
              onBlur={release}
              onClick={() => select(index)}
              aria-label={`Explore ${skill.title}`}
              aria-pressed={selected === index}
            >
              <div className="card-top">
                <span>{skill.number} /</span>
                <ArrowUpRight size={16} strokeWidth={1.3} />
              </div>
              <div
                className={`card-symbol symbol-${skill.icon}`}
                aria-hidden="true"
              >
                <Icon strokeWidth={0.75} />
              </div>
              <div className="card-copy">
                <h3>{skill.title}</h3>
                <p>{skill.subtitle}</p>
              </div>
              <div className="card-tools">
                {skill.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>
      <div className="deck-controls" data-reveal>
        <span className="eyebrow">HOVER, TAP, GET CURIOUS.</span>
        <button onClick={toggle} className="text-button">
          {expanded ? "GATHER THE CARDS" : "SPREAD THE CARDS"}
          <Layers2 size={15} />
        </button>
      </div>
      <div className="practice-story" aria-live="polite" data-reveal>
        <span className="eyebrow">
          {selected === null
            ? "THE COMMON THREAD"
            : `${skills[selected].number} / ${skills[selected].title.toUpperCase()}`}
        </span>
        <p key={selected ?? "intro"}>
          {selected === null
            ? "My roots are in graphic arts. My curiosity lives in the space between design and technology. I bring both to everything I make."
            : skills[selected].description}
        </p>
      </div>
    </section>
  );
}
