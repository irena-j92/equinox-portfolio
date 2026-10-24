import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { projects } from "../data/portfolio.js";
import ProjectArtwork from "./ProjectArtwork.jsx";

export default function ProjectDetail({ project, onClose, onNext, motion }) {
  const dialog = useRef(null);
  const body = useRef(null);
  const previousFocus = useRef(null);
  useEffect(() => {
    if (!project) return;
    const node = dialog.current;
    previousFocus.current = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    const oldPadding = document.body.style.paddingRight;
    document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
    document.body.style.overflow = "hidden";
    node.showModal();
    node.querySelector('[aria-label="Close project"]')?.focus();
    node.scrollTop = 0;
    const handleCancel = (e) => {
      e.preventDefault();
      onClose();
    };
    node.addEventListener("cancel", handleCancel);
    return () => {
      node.removeEventListener("cancel", handleCancel);
      node.close();
      document.body.style.overflow = oldOverflow;
      document.body.style.paddingRight = oldPadding;
      previousFocus.current?.focus({ preventScroll: true });
    };
  }, [!!project]);
  useEffect(() => {
    if (!project) return;
    dialog.current.scrollTop = 0;
    const tween = gsap.fromTo(
      body.current,
      { opacity: 0, y: motion ? 35 : 0 },
      { opacity: 1, y: 0, duration: motion ? 0.6 : 0, ease: "power3.out" },
    );
    return () => tween.kill();
  }, [project, motion]);
  if (!project) return null;
  const next =
    projects[
      (projects.findIndex((p) => p.id === project.id) + 1) % projects.length
    ];
  return (
    <dialog
      className="project-dialog"
      ref={dialog}
      aria-labelledby="detail-title"
      aria-describedby="detail-intro"
    >
      <div className="detail-nav">
        <button className="text-button" onClick={onClose}>
          <ArrowLeft size={17} /> ALL WORK
        </button>
        <span className="eyebrow">{project.number} / SELECTED PROJECT</span>
        <button
          className="icon-button"
          aria-label="Close project"
          onClick={onClose}
        >
          <X size={22} />
        </button>
      </div>
      <article ref={body}>
        <header className="detail-header">
          <div className="eyebrow">
            {project.type} / {project.year}
          </div>
          <h2 id="detail-title">{project.title}</h2>
          <p className="serif">{project.tagline}</p>
        </header>
        <div className="detail-cover">
          <ProjectArtwork project={project} />
        </div>
        <div className="detail-overview">
          <aside>
            <span className="eyebrow">MY ROLE</span>
            <p>{project.role}</p>
            <span className="eyebrow">MADE WITH</span>
            <div className="tool-tags">
              {project.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
            {project.url && (
              <a
                className="underlined-link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore the code <ArrowUpRight size={16} />
              </a>
            )}
          </aside>
          <div>
            <h3>{project.tagline}</h3>
            <p id="detail-intro">{project.intro}</p>
            <p>{project.approach}</p>
          </div>
        </div>
        <div className="detail-features">
          {project.details.map(([title, description], i) => (
            <section key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </section>
          ))}
        </div>
        <div className="detail-secondary">
          <ProjectArtwork project={project} detail />
        </div>
        <button className="next-project" onClick={() => onNext(next)}>
          <span className="eyebrow">NEXT PROJECT</span>
          <span className="next-project-name">
            {next.title}
            <ArrowRight strokeWidth={1} />
          </span>
        </button>
      </article>
    </dialog>
  );
}
