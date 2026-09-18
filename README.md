# Monster Energy — Sinta o Impacto

Independent concept landing page built with Next.js App Router, React, TypeScript, Tailwind CSS, GSAP, ScrollTrigger and `next/image`. It is not an official Monster Energy website.

## Run

```bash
npm install
npm run dev
```

## Validate

```bash
npm run lint
npm run typecheck
npm run build
```

The desktop flavor chapters use a moderate pinned ScrollTrigger sequence. On mobile they are vertical chapters. With reduced motion or without JavaScript, all chapters remain visible in normal document flow. Timelines and ScrollTriggers are scoped and reverted on unmount.

Product names, flavor descriptions, image sources and the official catalog destination are documented in [docs/product-assets.md](docs/product-assets.md).

The 15-second Higgsfield film is served from `public/media/lineup-impact.mp4` as a web-ready H.264 file and scrubbed with ScrollTrigger before the five-can lineup. Its brief, prompt and setup are in [docs/higgsfield-lineup-video.md](docs/higgsfield-lineup-video.md); the original HEVC export is preserved in `docs/video-source`.
