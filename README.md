# Hsr-template

Game landing page for Honkai: Star Rail — video hero, interactive character dossiers, soundtrack toggle and platform download links.

**Live demo:** <https://hsr-template.vercel.app/>

<div align="center">

<img src="docs/demo.gif" alt="Hsr-template — animated demo" width="700">

| Desktop | Mobile |
|---|---|
| <img src="docs/shot-desktop.png" alt="Desktop view" width="700"> | <img src="docs/shot-mobile.png" alt="Mobile view" width="290"> |

<details>
<summary>More screenshots</summary>

| Desktop | Mobile |
|---|---|
| <img src="docs/preview.png" alt="Desktop, alternate view" width="700"> | <img src="docs/preview-mobile.png" alt="Mobile, alternate view" width="290"> |

</details>

</div>

## What it does

Reproduces a AAA-game storefront hero: a muted MP4 fills the screen, platform CTAs (Windows, PS5, Epic, App Store, Google Play) sit over it, and an interactive character dossier section lets you open each trailblazer's file. React wires the video play/pause and an `<audio>` soundtrack toggle whose state is remembered in `localStorage`.

## Tech stack

React 19 · TypeScript · Vite · View Transitions API — zero animation libraries (71 KB gzip JS total)

## Features

- **Poster-first video hero** — a 160 KB poster frame renders instantly; the 12.6 MB MP4 only autoplays on desktop-class viewports. On mobile the hero is a composed still (a 390 px phone should not download a trailer by default)
- **Intersection-aware playback** — an IntersectionObserver pauses the video when the hero scrolls offscreen and resumes it when you come back (only if you had it playing)
- **Interactive character dossier** — five characters (Kafka, Blade, Dan Heng, Black Swan, Argenti) with element/path data; opening a file morphs the card into the detail panel via the View Transitions API, with a graceful no-transition fallback
- **Keyboard-first dossier** — arrow keys move between characters, Enter opens, Esc closes and returns focus; the soundtrack and share controls are real buttons with `aria-pressed` / `aria-label`
- **Soundtrack toggle** that persists its muted/unmuted state in `localStorage`
- **Platform CTA polish** — semantic anchors with alt text, focus-visible rings, hover lift and press-scale, laid out responsively instead of at hardcoded pixel positions
- **Reduced motion honored** — `prefers-reduced-motion` disables all transitions, skips autoplay and view transitions; the static page is the complete page

## Run locally

```bash
git clone https://github.com/Mister2314/Hsr-template.git
cd Hsr-template
npm install
npm run dev
```

## What I learned

- Browsers only let autoplaying video start muted, and only let audio start after a click — so the soundtrack begins silent and unlocks on the first toggle.
- `preload="metadata"` + a poster attribute is the cheapest big win a video hero can get: first paint drops from megabytes to one JPEG, and the browser only streams the video when you decide it should play.
- The View Transitions API makes shared-element morphs a one-liner — `document.startViewTransition(update)` — but you must move the `view-transition-name` off the card the moment the panel opens, or the duplicate name silently cancels the animation.
