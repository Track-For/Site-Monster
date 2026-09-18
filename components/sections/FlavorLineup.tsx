"use client";

import { useLayoutEffect, useRef } from "react";
import { flavors } from "@/data/flavors";
import { gsap } from "@/lib/gsap";
import { MonsterCan } from "@/components/product/MonsterCan";

export function FlavorLineup({ videoSrc }: { videoSrc?: string }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".lineup-item");
      const stage = root.current?.querySelector<HTMLElement>(".lineup-stage");
      gsap.fromTo(
        items,
        { y: 110, rotation: (index) => [-5, 3, -2, 4, -3][index], autoAlpha: 0 },
        {
          y: 0,
          rotation: 0,
          autoAlpha: 1,
          duration: 0.78,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stage,
            start: "top 68%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const element = root.current;
    const cinema = element?.querySelector<HTMLElement>(".lineup-cinema");
    const stage = element?.querySelector<HTMLElement>(".lineup-film");
    const film = video.current;
    if (!element || !cinema || !stage || !film || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let filmContext: ReturnType<typeof gsap.context> | undefined;
    let stageObserver: ResizeObserver | undefined;
    const syncStageHeight = () => {
      element.style.setProperty("--lineup-film-height", `${stage.offsetHeight}px`);
    };

    const setupFilm = () => {
      if (filmContext || !Number.isFinite(film.duration) || film.duration <= 0) return;
      film.pause();
      film.currentTime = 0;
      syncStageHeight();
      element.classList.add("lineup--cinematic");
      stageObserver = new ResizeObserver(syncStageHeight);
      stageObserver.observe(stage);

      filmContext = gsap.context(() => {
        const phrases = gsap.utils.toArray<HTMLElement>(".lineup-film__phrase");
        gsap.set(phrases, { autoAlpha: 0, y: 24 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: cinema,
            start: () => window.innerWidth <= 640
              ? `top ${Math.round((window.innerHeight - stage.offsetHeight) / 2)}px`
              : "top 14%",
            end: () => window.innerWidth <= 640
              ? `+=${Math.max(900, Math.round(window.innerHeight * 1.35))}`
              : `+=${Math.max(2100, Math.round(window.innerHeight * 3))}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(film, { currentTime: Math.max(0, film.duration - 0.05), duration: 1, ease: "none" }, 0)
          .to(phrases[0], { autoAlpha: 1, y: 0, duration: 0.055, ease: "power2.out" }, 0.025)
          .to(phrases[0], { autoAlpha: 0, y: -20, duration: 0.05, ease: "power2.in" }, 0.26)
          .to(phrases[1], { autoAlpha: 1, y: 0, duration: 0.055, ease: "power2.out" }, 0.345)
          .to(phrases[1], { autoAlpha: 0, y: -20, duration: 0.05, ease: "power2.in" }, 0.55)
          .to(phrases[2], { autoAlpha: 1, y: 0, duration: 0.055, ease: "power2.out" }, 0.635)
          .to(phrases[2], { autoAlpha: 0, y: -20, duration: 0.05, ease: "power2.in" }, 0.735);
      }, element);
    };

    film.addEventListener("loadedmetadata", setupFilm);
    if (film.readyState >= HTMLMediaElement.HAVE_METADATA) setupFilm();

    return () => {
      film.removeEventListener("loadedmetadata", setupFilm);
      stageObserver?.disconnect();
      filmContext?.revert();
      element.classList.remove("lineup--cinematic");
      element.style.removeProperty("--lineup-film-height");
    };
  }, [videoSrc]);

  return (
    <section className="lineup-section" id="sabores" ref={root} aria-labelledby="lineup-title">
      <div className="lineup-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> 02 / O ELENCO</p>
          <h2 id="lineup-title">UM IMPACTO<br /><em>CINCO FORMAS</em></h2>
        </div>
        <p>Do original aos sabores frutados. Conheça a seleção desta experiência conceitual.</p>
      </div>

      {videoSrc && (
        <div className="lineup-cinema">
          <div className="lineup-film" role="group" aria-label="Filme cinematográfico em que o Monster Original revela os cinco sabores">
            <video
              ref={video}
              className="lineup-film__video"
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
            <MonsterCan flavor={flavors[0]} className="lineup-film__fallback" decorative />
            <div className="lineup-film__copy">
              <p className="lineup-film__phrase"><span>01 / A ORIGEM</span><strong>O ORIGINAL<br />DESPERTA</strong></p>
              <p className="lineup-film__phrase"><span>02 / A TRANSFORMAÇÃO</span><strong>A ENERGIA<br />SE MULTIPLICA</strong></p>
              <p className="lineup-film__phrase"><span>03 / O ELENCO</span><strong>CINCO SABORES<br />UM IMPACTO</strong></p>
            </div>
            <div className="lineup-film__caption" aria-hidden="true">
              <span>01 → 05 / CINCO FORMAS</span>
              <span>ROLE PARA SENTIR O IMPACTO</span>
            </div>
          </div>
        </div>
      )}

      <div className="lineup-stage">
        <span className="lineup-stage__word" aria-hidden="true">SABORES</span>
        <div className="lineup-row">
          {flavors.map((flavor) => (
            <div className="lineup-item" key={flavor.id} style={{ "--flavor-color": flavor.color, "--flavor-rgb": flavor.rgb } as React.CSSProperties}>
              <span className="lineup-item__number">{flavor.position} / 05</span>
              <MonsterCan flavor={flavor} className="lineup-can" decorative />
              <span className="lineup-item__ground-shadow" aria-hidden="true" />
              <span className="lineup-item__name">{flavor.name}</span>
            </div>
          ))}
        </div>
        <span className="lineup-stage__floor" aria-hidden="true" />
      </div>
      <p className="lineup-next">CONTINUE PARA VER CADA SABOR <span aria-hidden="true">↓</span></p>
    </section>
  );
}
