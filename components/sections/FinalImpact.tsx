"use client";

import { useLayoutEffect, useRef } from "react";
import { flavors } from "@/data/flavors";
import { gsap } from "@/lib/gsap";
import { MonsterCan } from "@/components/product/MonsterCan";
import { Shockwave } from "@/components/effects/Shockwave";
import { ActionLink } from "@/components/ui/ActionLink";

export function FinalImpact() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!root.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const rings = gsap.utils.toArray<HTMLElement>(".final-rings .shockwave__ring");
      const cans = gsap.utils.toArray<HTMLElement>(".final-can");
      gsap.set(rings, { scale: 0.1, autoAlpha: 0 });
      gsap.set(".final-flash", { autoAlpha: 0 });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 62%",
          once: true,
        },
      });
      timeline
        .fromTo(".final-title", { scale: 1.14, autoAlpha: 0.35 }, { scale: 1, autoAlpha: 1, duration: 0.45, ease: "power4.out" })
        .to(".final-flash", { autoAlpha: 0.2, duration: 0.04 }, 0)
        .to(".final-flash", { autoAlpha: 0, duration: 0.16 }, 0.04)
        .fromTo(
          rings,
          { scale: 0.1, autoAlpha: 0.78 },
          { scale: (index) => 6 + index * 2, autoAlpha: 0, duration: 0.68, stagger: 0.07, ease: "power2.out" },
          0.05,
        )
        .from(cans, { y: 85, autoAlpha: 0, rotation: (index) => [-5, 3, 0, -3, 5][index], duration: 0.65, stagger: 0.07, ease: "power3.out" }, 0.2);
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="final-section" id="encerramento" ref={root} aria-labelledby="final-title">
      <div className="final-flash" aria-hidden="true" />
      <div className="final-head">
        <p className="eyebrow"><span className="eyebrow-line" /> 04 / O PRÓXIMO É SEU</p>
        <h2 className="final-title" id="final-title"><span>EXPERIMENTE</span><span className="final-title__last">TODOS<span className="hero-title__dot"></span></span></h2>
        <Shockwave count={3} className="final-rings" />
      </div>
      <div className="final-products" aria-hidden="true">
        {flavors.map((flavor) => <MonsterCan flavor={flavor} className="final-can" decorative key={flavor.id} />)}
      </div>
      <div className="final-action">
        <p>ENCONTRE O SEU PRÓXIMO SABOR</p>
        <ActionLink href="https://www.monsterenergy.com/pt-br/energy-drinks/" external>VER TODOS OS SABORES</ActionLink>
      </div>
      <footer className="site-footer">
        <span>PROJETO CONCEITUAL INDEPENDENTE. NÃO AFILIADO À MONSTER ENERGY.</span>
        <span>IMAGENS DOS PRODUTOS: MONSTER ENERGY ©</span>
      </footer>
    </section>
  );
}
