import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, LayoutGrid, List } from "lucide-react";
import gsap from "gsap";
import { projects } from "../data/portfolio.js";
import ProjectArtwork from "./ProjectArtwork.jsx";

export default function SelectedWork({ onOpen, motion }) {
  const [mode, setMode] = useState("list");
  const [active, setActive] = useState(null);
  const root = useRef(null);
  const preview = useRef(null);
  const moveTo = useRef(null);
  useEffect(() => {
    if (!preview.current) return;
    moveTo.current = {
      x: gsap.quickTo(preview.current, "x", {
        duration: motion ? 0.75 : 0,
        ease: "power3.out",
      }),
      y: gsap.quickTo(preview.current, "y", {
        duration: motion ? 0.75 : 0,
        ease: "power3.out",
      }),
    };
    return () => {
      moveTo.current?.x.tween.kill();
      moveTo.current?.y.tween.kill();
    };
  }, [mode, motion]);
  useEffect(() => {
    if (!preview.current) return;
    gsap.to(preview.current, {
      autoAlpha: active ? 1 : 0,
      scale: active ? 1 : 0.86,
      rotation: active ? -5 : -1,
      duration: motion ? 0.45 : 0,
      ease: "back.out(1.4)",
      overwrite: "auto",
    });
  }, [active, motion]);
  useEffect(() => {
    const ctx = gsap.context(
      () =>
        gsap.fromTo(
          ".work-item",
          { opacity: 0, y: motion ? 18 : 0 },
          {
            opacity: 1,
            y: 0,
            duration: motion ? 0.45 : 0,
            stagger: motion ? 0.05 : 0,
            ease: "power2.out",
            clearProps: "transform",
          },
        ),
      root,
    );
    return () => ctx.revert();
  }, [mode]);
  function move(event) {
    if (event.pointerType === "touch" || mode !== "list") return;
    const rect = root.current.getBoundingClientRect();
    moveTo.current?.x(
      Math.max(180, Math.min(rect.width - 190, event.clientX - rect.left)),
    );
    moveTo.current?.y(event.clientY - rect.top);
  }
  function focusProject(project, event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const section = root.current.getBoundingClientRect();
    moveTo.current?.x(section.width * 0.56);
    moveTo.current?.y(bounds.top - section.top + bounds.height * 0.5);
    setActive(project);
  }
  return (
    <section
      id="work"
      className="work section-pad"
      ref={root}
      onPointerMove={move}
      aria-labelledby="work-title"
    >
      <div className="section-topline" data-reveal>
        <span className="eyebrow">A FEW PLACES THAT QUESTION HAS TAKEN ME</span>
        <span className="eyebrow muted">SELECTED WORK / 01—03</span>
      </div>
      <div className="work-intro" data-reveal>
        <h2 id="work-title">
          Different worlds.
          <br />
          <span className="serif">The same curiosity.</span>
        </h2>
        <div className="view-switch" aria-label="Project view">
          <button
            className={mode === "list" ? "is-active" : ""}
            aria-label="List view"
            aria-pressed={mode === "list"}
            onClick={() => {
              setMode("list");
              setActive(null);
            }}
          >
            <List size={16} />
            <span>LIST</span>
          </button>
          <button
            className={mode === "grid" ? "is-active" : ""}
            aria-label="Grid view"
            aria-pressed={mode === "grid"}
            onClick={() => {
              setMode("grid");
              setActive(null);
            }}
          >
            <LayoutGrid size={15} />
            <span>GRID</span>
          </button>
        </div>
      </div>
      <div
        className={mode === "list" ? "project-list" : "project-grid"}
        data-reveal
        onPointerLeave={() => setActive(null)}
      >
        {projects.map((project) => (
          <button
            key={project.id}
            className={`work-item ${active?.id === project.id ? "is-active" : ""}`}
            aria-label={`Explore ${project.title}, ${project.type}`}
            onPointerEnter={(e) => {
              if (e.pointerType !== "touch") focusProject(project, e);
            }}
            onFocus={(e) => focusProject(project, e)}
            onBlur={() => setActive(null)}
            onClick={() => {
              setActive(null);
              onOpen(project);
            }}
          >
            {mode === "grid" && <ProjectArtwork project={project} />}
            <div className="project-row">
              <span className="project-number">{project.number}</span>
              <h3>{project.title}</h3>
              <span className="project-type">{project.type}</span>
              <ArrowUpRight className="project-arrow" strokeWidth={1} />
            </div>
          </button>
        ))}
      </div>
      {mode === "list" && (
        <div className="work-preview" ref={preview} aria-hidden="true">
          {active && (
            <div key={active.id} className="preview-content">
              <ProjectArtwork project={active} />
              <div className="preview-caption">
                EXPLORE PROJECT <ArrowUpRight size={14} />
              </div>
            </div>
          )}
        </div>
      )}
      <div className="work-foot" data-reveal>
        <p>The finished work is only one side of the story.</p>
        <span className="eyebrow">
          KEEP GOING. THERE’S MORE BENEATH THE SURFACE. ↓
        </span>
      </div>
    </section>
  );
}
