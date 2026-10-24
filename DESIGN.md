# Equinox — Irena Jurisic

A portfolio experienced as a journey from curiosity to craft. The revised visual
world follows the user's October 19 landscape references, retaining the established
Equinox identity, real project content and pastel skill-card fan.

## Reference interpretation

The sandstone/grass reference defines the opening: open warm sky, fine sculptural
rock, a quiet pool, and a pale path disappearing into the distance. The winding
path references inform the journey metaphor. The twilight monolith and forest
portal references inform the middle scene: crossing from possibility to reality.
Sand, sage, champagne and dusty blue replace pink and lavender. Both production
artworks are original; the supplied reference images are not published.

## Story

1. **Invitation — Follow your curiosity.** The landscape and centered typography
   establish a place to enter. The first CTA follows the path into a short question.
2. **Question — What if a website felt more like somewhere?** A quiet connecting
   passage introduces Irena's point of view and a direct link to her personal story.
3. **Evidence — Different worlds, the same curiosity.** Sunter, Antara and Sombre
   become three answers to that question. Hover previews and full-screen project
   stories retain their original interaction model.
4. **Threshold — Look closer, imagine differently, make it real.** A full-bleed
   portal becomes the visual midpoint. A slow native-scroll push links those three
   ideas, followed by a soft dissolve into the palette of the craft section.
5. **Craft — A thought. A sketch. Something real.** The card fan explains the
   disciplines that connect an idea to a working experience.
6. **Invitation back — You've seen my world. What's on your mind?** The opening
   landscape returns subtly behind the form, bringing the journey back to its start.

About is a distinct quieter page, reachable from the fixed navigation, introduction
and footer. Its typography, landscape crop and colors belong to the same world.
Copy is grounded in Irena's established graphic arts, UX and development background;
there are no fabricated awards, clients, impact numbers or portrait photographs.

## Visual system

Warm ivory #f3f0e9, charcoal #292922, sage, champagne and deep dusty blue #152a38.
Self-hosted Manrope for display/UI, Instrument Serif for expressive editorial lines.
Fluid outer gutters, generous breathing room, thin rules and restrained controls.
The old numbered section dividers are replaced by sentences that connect each act.

## Motion brief and choreography

**Cinematic** personality, moderate density, native scrolling. Motion establishes
spatial relationships and reveals the connection from curiosity to craft. Shared
24px/opacity reveals use one 700ms vocabulary; state changes use a soft settle,
ambient transitions use smooth in-out pacing. Hero entry settles in under 800ms.

| Element                 | Trigger                    | Treatment                                                  |
| ----------------------- | -------------------------- | ---------------------------------------------------------- |
| Header                  | Load / scroll / hover      | Short entrance, fixed glass surface, link feedback         |
| Hero                    | Load / pointer             | Staggered text, subtle image-based depth and water shimmer |
| Narrative text / footer | First intersection         | Shared 24px reveal, once                                   |
| Projects                | Hover / focus / click      | Floating spring-like preview, full-screen dialog           |
| Portal                  | Native scroll, desktop     | Image push, three copy beats, progress and exit fade       |
| Cards                   | Intersection / interaction | Deck fans out, selected discipline comes forward           |
| About route             | Navigation                 | Brief crossfade, title update, heading focus               |
| Form                    | Focus / submit             | Field feedback, restrained magnetic action, draft review   |

No scroll interception or wheel trapping. The portal's CSS sticky stage spans
250svh only above 800px with motion enabled. Compact, paused and reduced-motion
versions show all story copy in document order and disable the sticky sequence.
Focus within the portal removes the exit veil so controls always remain visible.
The hero is a 2.5D image-based WebGL scene, not freely navigable terrain. GPU work
pauses outside the viewport and in hidden tabs; an image is always present behind it.

## Verification limits

Production build and DOM interaction checks are performed before publishing.
The available test environment cannot verify responsive visual layout, native dialog
focus isolation, GPU output or frame rate. No browser-level visual sign-off is claimed.
