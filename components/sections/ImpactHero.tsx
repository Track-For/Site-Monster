"use client";

import { useLayoutEffect, useRef } from "react";
import { flavors } from "@/data/flavors";
import { gsap } from "@/lib/gsap";
import { MonsterCan } from "@/components/product/MonsterCan";
import { ActionLink } from "@/components/ui/ActionLink";

const SCENES = [
  { at: 0, label: "01 / O IMPACTO", title: "DAS SOMBRAS,\nNASCE A FERA" },
  { at: 0.13, label: "02 / O FRIO", title: "FRIO PURO,\nENERGIA VIVA" },
  { at: 0.27, label: "03 / O DESPERTAR", title: "A FERA\nDESPERTA" },
  { at: 0.46, label: "04 / A LIBERAÇÃO", title: "ENERGIA\nLIBERADA" },
  { at: 0.62, label: "05 / O ELENCO", title: "CINCO SABORES,\nUM SÓ IMPACTO" },
] as const;

export function ImpactHero({ videoSrc }: { videoSrc?: string }) {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    const cinema = element?.querySelector<HTMLElement>(".hero-cinema");
    const stage = element?.querySelector<HTMLElement>(".hero-cinema__stage");
    const film = video.current;
    if (!element || !cinema || !stage || !film || !videoSrc || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Hide the phrases/final title synchronously (before first paint) so the
    // static copy never flashes on screen while the video is still loading —
    // the scroll timeline below reveals them again once it's ready.
    const phrases = gsap.utils.toArray<HTMLElement>(".hero-cinema__phrase", element);
    const finalScene = element.querySelector<HTMLElement>(".hero-cinema__final");
    gsap.set(phrases, { autoAlpha: 0, y: 26 });
    gsap.set(finalScene, { autoAlpha: 0, y: 34 });

    let filmContext: ReturnType<typeof gsap.context> | undefined;
    let seekRequest: number | undefined;
    const playhead = { time: 0 };
    let targetTime = 0;

    const seekToTarget = () => {
      seekRequest = undefined;
      if (film.seeking || film.readyState < HTMLMediaElement.HAVE_METADATA) return;
      if (Math.abs(film.currentTime - targetTime) < 1 / 48) return;
      film.currentTime = targetTime;
    };

    const scheduleSeek = () => {
      if (seekRequest === undefined) {
        seekRequest = window.requestAnimationFrame(seekToTarget);
      }
    };

    film.addEventListener("seeked", scheduleSeek);

    const setupFilm = () => {
      if (filmContext || !Number.isFinite(film.duration) || film.duration <= 0) return;
      film.pause();
      film.currentTime = 0;
      element.classList.add("hero--cinematic");

      filmContext = gsap.context(() => {
        const cue = element.querySelector<HTMLElement>(".hero-bottom");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: cinema,
            start: "top top",
            end: () => `+=${Math.round((cinema.offsetHeight - stage.offsetHeight) * 0.82)}`,
            scrub: 0.45,
            invalidateOnRefresh: true,
          },
        });

        timeline.to(playhead, {
          time: () => Math.max(0, film.duration - 0.04),
          duration: 1,
          ease: "none",
          onUpdate: () => {
            targetTime = playhead.time;
            scheduleSeek();
          },
        }, 0);
        if (cue) timeline.to(cue, { autoAlpha: 0, duration: 0.03, ease: "power1.in" }, 0.02);

        phrases.forEach((phrase, index) => {
          const start = SCENES[index].at;
          timeline
            .to(phrase, { autoAlpha: 1, y: 0, duration: 0.045, ease: "power2.out" }, start + 0.01)
            .to(phrase, { autoAlpha: 0, y: -18, duration: 0.045, ease: "power2.in" }, start + 0.1);
        });

        timeline.to(finalScene, { autoAlpha: 1, y: 0, duration: 0.09, ease: "power3.out" }, 0.82);
      }, element);
    };

    film.addEventListener("loadedmetadata", setupFilm);
    if (film.readyState >= HTMLMediaElement.HAVE_METADATA) setupFilm();

    return () => {
      film.removeEventListener("loadedmetadata", setupFilm);
      film.removeEventListener("seeked", scheduleSeek);
      if (seekRequest !== undefined) window.cancelAnimationFrame(seekRequest);
      filmContext?.revert();
      gsap.set(phrases, { clearProps: "all" });
      gsap.set(finalScene, { clearProps: "all" });
      element.classList.remove("hero--cinematic");
    };
  }, [videoSrc]);

  return (
    <section className="impact-hero relative" id="inicio" ref={root} aria-labelledby="impact-title">
      <div className="hero-cinema">
        <div className="hero-cinema__stage">
          {videoSrc && (
            <video
              ref={video}
              className="hero-cinema__video"
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          )}
          <MonsterCan flavor={flavors[0]} className="hero-cinema__fallback" decorative priority />
          <div className="hero-cinema__scrim" aria-hidden="true" />

          <div className="hero-cinema__copy">
            {SCENES.map((scene) => (
              <p className="hero-cinema__phrase" key={scene.label} aria-hidden="true">
                <span>{scene.label}</span>
                <strong>
                  {scene.title.split("\n").map((line, index) => (
                    <span key={index}>{line}</span>
                  ))}
                </strong>
              </p>
            ))}

            <div className="hero-cinema__final">
              <p className="eyebrow"><span className="eyebrow-line" /> CONCEITO INDEPENDENTE / 001</p>
              <h1 id="impact-title" className="hero-title">
                <span>SINTA O</span>
                <span>IMPACTO<span className="hero-title__dot"></span></span>
              </h1>
              <p className="hero-lead">Cinco sabores do catálogo brasileiro. Cada lata, um impacto diferente.</p>
              <ActionLink href="#sabores">EXPLORE OS SABORES</ActionLink>
            </div>
          </div>

          <div className="hero-bottom" aria-hidden="true">
            <span>CONCEITO INDEPENDENTE · NÃO OFICIAL</span>
            <span className="scroll-cue">ROLE PARA SENTIR O IMPACTO <i /></span>
          </div>
        </div>
      </div>
    </section>
  );
}
