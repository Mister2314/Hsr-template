# Hsr-template

Game landing page for Honkai: Star Rail — video hero, character carousel, soundtrack toggle and platform download links.

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

Reproduces a AAA-game storefront hero: a muted, autoplaying MP4 fills the screen, platform CTAs (Windows, PS5, Epic, App Store, Google Play) sit over it, and a Swiper carousel rotates through character art. Vanilla JS wires the video play/pause and an `<audio>` soundtrack toggle whose state is remembered in `localStorage`.

## Tech stack

React 19 · TypeScript · Vite

## Features

- Full-screen autoplaying video hero with a play/pause checkbox control
- Soundtrack toggle that persists its muted/unmuted state in `localStorage`
- Swiper 11 character carousel
- Five platform download CTAs plus a QR code block
- Gradient and blur overlays that keep copy legible over moving footage

## Run locally

```bash
git clone https://github.com/Mister2314/Hsr-template.git
cd Hsr-template
npx serve .   # or just open index.html
```

## What I learned

Browsers only let autoplaying video start if it is muted, and only let audio start after a click — so the soundtrack begins silent and unlocks on the first toggle.
