export default function ProjectArtwork({ project, detail = false }) {
  if (project.id === "sombre") {
    return (
      <div
        className={`project-artwork sombre-art ${detail ? "is-detail" : ""}`}
        style={{ background: project.color }}
      >
        <span className="art-label">A LITTLE SPACE TO FEEL.</span>
        <div className="phone-composition">
          <img
            src="/assets/sombre-calendar.webp"
            alt="Sombre calendar interface"
            className="phone phone-left"
            loading="lazy"
          />
          <img
            src={
              detail ? "/assets/sombre-entry.webp" : "/assets/sombre-mood.webp"
            }
            alt={detail ? "Sombre journal entry" : "Sombre mood picker"}
            className="phone phone-right"
            loading="lazy"
          />
        </div>
        <span className="art-brand sombre-brand">Sombre.</span>
      </div>
    );
  }
  return (
    <div className={`project-artwork ${project.id}-art`}>
      <img
        src={detail ? project.detail : project.cover}
        alt={
          project.id === "sunter-realty"
            ? "Modern architecture from the Sunter Realty experience"
            : "Lotus artwork from the Antara temple experience"
        }
        loading="lazy"
      />
      <div className="art-shade" />
      <span className="art-label">
        {project.id === "sunter-realty"
          ? "A DIFFERENT PERSPECTIVE"
          : "AN IMMERSIVE TEMPLE JOURNEY"}
      </span>
      <span className="art-brand">
        {project.id === "sunter-realty" ? "Sunter Realty" : "ANTARA"}
      </span>
      <span className="art-bottom">
        {project.type}
        <span>↗</span>
      </span>
    </div>
  );
}
