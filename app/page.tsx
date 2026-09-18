import { existsSync } from "node:fs";
import { join } from "node:path";
import { Header } from "@/components/layout/Header";
import { Grain } from "@/components/effects/Grain";
import { ImpactHero } from "@/components/sections/ImpactHero";
import { FlavorLineup } from "@/components/sections/FlavorLineup";
import { FlavorStory } from "@/components/sections/FlavorStory";
import { FinalImpact } from "@/components/sections/FinalImpact";

export default function Home() {
  const heroVideoSrc = existsSync(join(process.cwd(), "public", "media", "Monster AD.mp4"))
    ? "/media/Monster%20AD.mp4"
    : existsSync(join(process.cwd(), "public", "media", "hero-impact.mp4"))
      ? "/media/hero-impact.mp4"
      : undefined;
  const lineupVideoSrc = existsSync(join(process.cwd(), "public", "media", "lineup-impact.mp4"))
    ? "/media/lineup-impact.mp4"
    : undefined;

  return (
    <>
      <a className="skip-link" href="#content">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="content">
        <ImpactHero videoSrc={heroVideoSrc} />
        <FlavorLineup videoSrc={lineupVideoSrc} />
        <FlavorStory />
        <FinalImpact />
      </main>
      <Grain />
    </>
  );
}
