export const profile = {
  name: "Irena Jurisic",
  // Add the verified recipient here to enable direct email and mailto submission.
  email: "",
  github: "https://github.com/irena-j92",
  website: "https://madein92.xyz",
};

export const projects = [
  {
    id: "sunter-realty",
    number: "01",
    title: "Sunter Realty",
    type: "Digital experience",
    year: "2026",
    color: "#e6e1d2",
    cover: "/assets/sunter.webp",
    detail: "/assets/sunter-detail.webp",
    role: "Visual design & frontend development",
    tagline: "A new perspective on finding home.",
    intro:
      "A cinematic real estate experience that brings architecture, people, and place into focus. Editorial layouts and carefully paced motion turn exploring a property into a story.",
    approach:
      "The experience begins with an immersive video sequence, then moves through property collections and the people behind them. A restrained palette, generous typography, and glass navigation keep the homes at the center.",
    details: [
      [
        "A cinematic beginning",
        "A scroll-led video hero establishes a sense of place before introducing the property collection.",
      ],
      [
        "Room to explore",
        "Property browsing, search, saved homes, and expert profiles give visitors clear ways to continue their journey.",
      ],
      [
        "Small moments of delight",
        "Fluid square-pattern interactions, understated hover states, and precise transitions make the experience feel alive.",
      ],
    ],
    tools: ["React", "GSAP", "Tailwind CSS", "UI design"],
    url: "https://github.com/irena-j92/sunter-realty",
  },
  {
    id: "antara",
    number: "02",
    title: "Antara",
    type: "Immersive WebGL",
    year: "2026",
    color: "#cddbc6",
    cover: "/assets/antara.webp",
    detail: "/assets/antara-detail.webp",
    role: "Art direction & creative development",
    tagline: "A quiet passage into another world.",
    intro:
      "An interactive temple journey where architecture, atmosphere, and storytelling meet. A garden becomes the doorway to a carefully composed world of color, light, and sound.",
    approach:
      "The journey unfolds from the water garden to the temple interior. Layered artwork sits alongside three-dimensional architecture, with small interaction cues guiding exploration without overwhelming the scene.",
    details: [
      [
        "A living landscape",
        "Water, lilies, birds, and atmospheric details establish the garden before the visitor enters the temple.",
      ],
      [
        "An invitation to explore",
        "Drag interaction, a subtle doorway cue, and controlled camera movement make the environment approachable.",
      ],
      [
        "Sound as atmosphere",
        "Sitar music and the interior soundscape support the journey, with clear sound controls available throughout.",
      ],
    ],
    tools: ["React Three Fiber", "Three.js", "WebGL", "Art direction"],
    url: "https://github.com/irena-j92/antara",
  },
  {
    id: "sombre",
    number: "03",
    title: "Sombre",
    type: "Product design",
    year: "2026",
    color: "#e7dcd6",
    cover: "/assets/sombre-mood.webp",
    detail: "/assets/sombre-entry.webp",
    role: "UX/UI design & interactive prototyping",
    tagline: "Make a little room for how you feel.",
    intro:
      "A mood-tracking concept that turns reflection into a gentle daily ritual. Expressive color, quiet typography, and tactile transitions give emotions room to exist without judgment.",
    approach:
      "The prototype connects mood selection, voice check-in, reflection, and a personal calendar. Entries are experienced like pages in a journal, while color and motion make patterns easier to feel and explore.",
    details: [
      [
        "A softer check-in",
        "A visual mood picker and a choice between voice and typing support different ways of expressing yourself.",
      ],
      [
        "Patterns over time",
        "The personal calendar links daily entries and makes returning to a particular moment simple.",
      ],
      [
        "A digital journal",
        "Book-like page turns connect entries, adding a tactile quality to an otherwise screen-based ritual.",
      ],
    ],
    tools: ["Figma", "React", "GSAP", "UX prototyping"],
    url: null,
  },
];

export const skills = [
  {
    id: "ux",
    number: "01",
    title: "UX / UI",
    subtitle: "Clarity, with character.",
    color: "#d4dfc0",
    icon: "layout",
    tools: ["Figma", "Research", "Design systems"],
    description:
      "From understanding the problem to building an intuitive, expressive interface. Thoughtful journeys, clear hierarchies, and details that make sense.",
  },
  {
    id: "visual",
    number: "02",
    title: "Visual design",
    subtitle: "A feeling, made visible.",
    color: "#edc7ad",
    icon: "flower",
    tools: ["Adobe CC", "Art direction", "Typography"],
    description:
      "A background in graphic arts, brought into the digital world. Distinctive identities, considered typography, and visual stories with a point of view.",
  },
  {
    id: "motion",
    number: "03",
    title: "Motion",
    subtitle: "The space between states.",
    color: "#cee2e7",
    icon: "waves",
    tools: ["GSAP", "ScrollTrigger", "Interaction"],
    description:
      "Movement that explains, guides, and occasionally surprises. Fluid transitions, scroll-driven stories, and micro-interactions with just enough personality.",
  },
  {
    id: "frontend",
    number: "04",
    title: "Frontend",
    subtitle: "Designed. Then built.",
    color: "#eee2ae",
    icon: "code",
    tools: ["React", "Next.js", "Tailwind CSS"],
    description:
      "Turning visual ideas into responsive, accessible experiences. A bridge between design decisions and the real details of how an interface behaves.",
  },
  {
    id: "creative",
    number: "05",
    title: "Creative code",
    subtitle: "A little beyond possible.",
    color: "#d3d0e4",
    icon: "spark",
    tools: ["Three.js", "WebGL", "GLSL"],
    description:
      "An experimental space for interactive worlds, shaders, and unexpected materiality. Where curiosity becomes something you can move, touch, and explore.",
  },
];
