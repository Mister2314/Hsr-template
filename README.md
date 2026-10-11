<h1 align="center">Star Rail — Game Landing Page</h1>

<p align="center"><b>A cinematic game landing page with a video hero, character carousel, soundtrack toggle and platform download CTAs.</b></p>

<p align="center">
[![Live Demo](https://img.shields.io/badge/Live_Demo-▶-2ea44f?style=for-the-badge&logo=vercel&logoColor=white)](https://mister2314.github.io/Hsr-template/)
![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logoColor=white)
![Swiper](https://img.shields.io/badge/Swiper-6332f6?style=flat-square&logoColor=white)
</p>

<p align="center">[**Live demo**](https://mister2314.github.io/Hsr-template/) · [Quick start](#quick-start) · [Features](#features) · [Architecture](#architecture) · [FAQ](#faq)</p>

<p align="center">
  <a href="https://mister2314.github.io/Hsr-template/">
    <img src="docs/demo.gif" alt="Star Rail — Game Landing Page — animated demo" width="88%">
  </a>
</p>

<p align="center"><sub>Live capture of the real build — 2575 KB, loops forever.</sub></p>

## Overview

A landing page for a space-fantasy game, built around motion and atmosphere. A muted video fills the hero, characters rotate through a Swiper carousel, and a small audio control lets the visitor toggle the soundtrack on and off without leaving the page.

The build leans on layered backgrounds, gradient overlays and blur to keep text readable over moving footage — the part of this kind of page that is easy to get wrong.

## At a glance

| Field | Detail |
| --- | --- |
| **Type** | Static site — no build step |
| **Primary language** | CSS |
| **Live demo** | [mister2314.github.io/Hsr-template](https://mister2314.github.io/Hsr-template/) |
| **Repository** | [Mister2314/Hsr-template](https://github.com/Mister2314/Hsr-template) |

## Features

- Full-screen autoplaying video hero with audio toggle
- Character carousel powered by Swiper
- Soundtrack playback control with on / off states
- Layered gradient and blur overlays for text legibility
- Platform download buttons — Windows, PlayStation 5, App Store, Google Play
- QR code block for mobile download
- Font Awesome icon set

## Tech Stack

| Layer | Technology |
| --- | --- |
| Markup | HTML5 (video, audio) |
| Styling | CSS3 |
| Carousel | Swiper 11 |
| Icons | Font Awesome 6 |
| Deploy | GitHub Pages |

## Architecture

```mermaid
flowchart LR
  A["Browser"] --> B["Markup<br/>HTML5 (video"] --> C["Styling<br/>CSS3"] --> D["Carousel<br/>Swiper 11"] --> E["Icons<br/>Font Awesome 6"] --> F["Deploy"]
```

## Screenshots

| Desktop | Mobile |
| :---: | :---: |
| <img src="docs/preview.png" alt="Desktop view"> | <img src="docs/preview-mobile.png" alt="Mobile view" width="230"> |

## Quick Start

```bash
git clone https://github.com/Mister2314/Hsr-template.git
cd Hsr-template

# open it directly
start index.html      # Windows
open  index.html      # macOS

# or serve the folder
npx serve .
```

## Project Structure

```
index.html — hero, character carousel and download sections
assets/css/style.css — layout, overlays and carousel styling
assets/js/index.js — Swiper init, audio toggle, video handling
assets/video/, assets/music/, assets/img/ — media assets
```

## Author

**Xəyal Hüseynli** — Junior Front-End Developer

[Portfolio](https://hypnosdev.vercel.app) · [GitHub](https://github.com/Mister2314) · [LinkedIn](https://www.linkedin.com/in/x%C9%99yal-h%C3%BCseynli-3487b91ba/) · [xeyalhuseynli06@gmail.com](mailto:xeyalhuseynli06@gmail.com)
