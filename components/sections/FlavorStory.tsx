"use client";

import { useLayoutEffect, useRef } from "react";
import { flavors } from "@/data/flavors";
import { gsap } from "@/lib/gsap";
import { MonsterCan } from "@/components/product/MonsterCan";

export function FlavorStory() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = gsap.matchMedia();
    media.add("(min-width: 900px)", () => {
      element.classList.add("story--enhanced");
      const ctx = gsap.context(() => {
        const stage = element.querySelector<HTMLElement>(".story-stage");
        const chapters = gsap.utils.toArray<HTMLElement>(".story-chapter");
        gsap.set(chapters.slice(1), { autoAlpha: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 3.5)}`,
            pin: stage,
            scrub: 0.55,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.to({}, { duration: 0.45 });
        for (let index = 1; index < chapters.length; index += 1) {
          const point = `chapter-${index}`;
          const outgoing = chapters[index - 1];
          const incoming = chapters[index];
          const outgoingCan = outgoing.querySelector<HTMLElement>(".story-can");
          const outgoingCopy = outgoing.querySelector<HTMLElement>(".story-chapter__copy");
          const incomingCan = incoming.querySelector<HTMLElement>(".story-can");
          const incomingCopy = incoming.querySelector<HTMLElement>(".story-chapter__copy");

          timeline
            .addLabel(point)
            .to(outgoingCan, { yPercent: -48, rotation: -3, autoAlpha: 0, duration: 0.58, ease: "power2.inOut" }, point)
            .to(outgoingCopy, { y: -28, autoAlpha: 0, duration: 0.42, ease: "power2.inOut" }, point)
            .fromTo(
              incoming,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.4, ease: "none" },
              `${point}+=0.18`,
            )
            .fromTo(
              incomingCan,
              { yPercent: 50, rotation: 4, scale: 0.92, autoAlpha: 0 },
              { yPercent: 0, rotation: 0, scale: 1, autoAlpha: 1, duration: 0.72, ease: "power2.out" },
              `${point}+=0.18`,
            )
            .fromTo(
              incomingCopy,
              { y: 32, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.5, ease: "power2.out" },
              `${point}+=0.34`,
            )
            .set(outgoing, { autoAlpha: 0 }, `${point}+=0.87`)
            .to({}, { duration: 0.25 });
        }
        timeline.to({}, { duration: 0.5 });
      }, element);

      return () => {
        ctx.revert();
        element.classList.remove("story--enhanced");
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section className="story-section" id="detalhes" ref={root} aria-label="Detalhes dos cinco sabores">
      <div className="story-stage">
        {flavors.map((flavor) => (
          <article
            className="story-chapter"
            key={flavor.id}
            style={{ "--flavor-color": flavor.color, "--flavor-rgb": flavor.rgb } as React.CSSProperties}
            aria-labelledby={`story-title-${flavor.id}`}
          >
            <span className="story-chapter__watermark" aria-hidden="true">{flavor.position}</span>
            <div className="story-chapter__top">
              <span>03 / DETALHES</span>
              <span>MONSTER ENERGY · BRASIL</span>
            </div>
            <div className="story-chapter__copy">
              <p className="story-chapter__family"><span />{flavor.family}</p>
              <h2 id={`story-title-${flavor.id}`}>{flavor.name}</h2>
              <p className="story-chapter__description">{flavor.description}</p>
            </div>
            <div className="story-chapter__product">
              <div className="story-chapter__light" aria-hidden="true" />
              <MonsterCan flavor={flavor} className="story-can" />
            </div>
            <div className="story-chapter__progress" aria-label={`Sabor ${flavor.position} de 05`}>
              <strong>{flavor.position}<span>/05</span></strong>
              <span className="story-chapter__progress-track" aria-hidden="true"><i style={{ width: `${Number(flavor.position) * 20}%` }} /></span>
              <span>PRÓXIMO SABOR ↓</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
