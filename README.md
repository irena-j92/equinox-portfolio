# Equinox — Irena Jurisic

A responsive portfolio built with React, Vite, Tailwind CSS, GSAP, and Three.js.

## Develop

```sh
npm ci
npm run dev
npm run build
```

The static production output is `dist/`. It can be hosted on any static host.
The configured Sites deployment remains private by default.

## Components

- `Hero` / `Landscape`: original surreal landscape artwork with a lightweight
  Three.js GLSL parallax, water shimmer, mist and glint pass. This is a 2.5D image-based scene,
  not a freely navigable 3D environment. Includes an image fallback, a pause
  control, tab/viewport suspension, and reduced-motion support.
- `StoryIntro`: connects the opening landscape to the project index through the
  central question: what if a website felt more like somewhere?
- `PortalStory`: original forest-portal artwork with a native-scroll sticky stage.
  Three narrative beats connect curiosity, possibility and craft. GSAP ties the
  slow camera push, copy changes, progress line and exit fade to scroll position.
  Chapter buttons and a skip-to-practice link provide direct control. Below 800px,
  or when motion is paused/reduced, the artwork and all three beats flow normally.
- `AboutPage`: a dedicated `#about` route with Irena's design story, perspective,
  background and links back to work/contact. Hash routing supports static hosts,
  browser history, deep links, route-specific titles and heading focus.
- `SelectedWork`: numbered index, spring-like GSAP hover preview, grid/list views,
  keyboard support, and tap-friendly behavior.
- `ProjectDetail`: full-screen native dialog with focus isolation, Escape handling,
  hash deep links, project story, tools and next-project navigation.
- `Practice`: scroll-triggered card fan, hover/focus/tap details, deck toggle, and
  mobile horizontal card browsing.
- `Contact`: native form validation, interest selection, magnetic action, message
  review, copy and download. No false submission confirmation.
- `useScrollReveal`: a shared IntersectionObserver-driven reveal vocabulary.
- `experience.css`: the connected narrative composition, new scene layouts,
  About page, responsive behavior and motion preferences.

## Content and contact setup

Edit `src/data/portfolio.js` for projects, skills and public contact links.
`profile.email` is intentionally empty until Irena supplies a verified recipient.
Once populated, the direct Email link and prefilled email-app handoff are enabled.
The website does not send mail or store contact messages on a server. In its current
state it prepares a note that visitors can copy or save. To support server-side
delivery, connect a real form backend and replace the mailto handoff.

Existing project copy is based on the user's project context. It makes no claims
about client commissions, commercial launch status or measured impact.

## Assets

- `oasis.webp`: original sandstone oasis artwork. A winding pale path, sage-green
  grass, water and a naturally sculpted rock formation beneath an open warm sky.
  Source: `/workspace/scratch/3e8f61af0da3/generated_images/exec-bc1d946f-ea30-4904-aa1c-833af9c46361.png`.
- `portal.webp`: original twilight landscape with an organic glowing gateway into
  a forest, reflected in water. Source:
  `/workspace/scratch/3e8f61af0da3/generated_images/exec-61419b86-d61c-4dbb-b7f3-bae943775262.png`.
  Both artworks follow the user's new landscape references; reference images
  themselves are not redistributed.
- Sunter: existing user-owned project assets, from
  `/workspace/sites/long-realty-import/public/assets/` (`properties-1.jpg`,
  `hero-poster.webp`). These are project images, not interface screenshots.
- Antara: existing user project story artwork from
  `/workspace/sites/lotus-temple/public/assets/stories/` (`lotus.webp`, `krishna.webp`).
- Sombre: user-provided screen designs rendered in the existing task's inspection
  folder `/workspace/scratch/4838137d915e/inspection/`. Calendar, Mood Picker and
  Today's Entry are used as product previews.
- Fonts are self-hosted via Fontsource. No remote fonts or runtime image hotlinks.

## Verification

The Vite production build and static asset checks are run before publication.
DOM-level checks passed for the list/grid switch, project open/next/close cycle,
focus restoration, hash-based navigation, skills selection, required form fields,
contact draft copying, About-page routing, cross-page work/contact links, repeat
same-anchor navigation, page titles and heading focus. The reduced-motion portal
fallback exposes all three story beats. These checks use a
simulated DOM; they do not verify visual layout or the GPU shader.
Interactive browser QA is unavailable in this environment because the supported
Browser control skill is missing; no claim of browser-tested behavior is made.

## Notes

The supplied reference images are not redistributed with this repository.
The authored component code and optimized final assets are contained in this Site's
source repository. Public portfolio recipients and optional project demo links can
be added in the data file without changing layout components.
