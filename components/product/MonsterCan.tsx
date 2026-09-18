import Image from "next/image";
import type { Flavor } from "@/data/flavors";

interface MonsterCanProps {
  flavor: Flavor;
  className?: string;
  priority?: boolean;
  decorative?: boolean;
}

export function MonsterCan({
  flavor,
  className = "",
  priority = false,
  decorative = false,
}: MonsterCanProps) {
  return (
    <div className={`can ${className}`} style={{ "--can-color": flavor.color } as React.CSSProperties}>
      <Image
        src={flavor.image}
        alt={decorative ? "" : `Lata Monster Energy ${flavor.name}`}
        width={250}
        height={625}
        preload={priority}
        sizes="(max-width: 767px) 46vw, (max-width: 1199px) 25vw, 20vw"
        draggable={false}
      />
      <span className="can__shadow" aria-hidden="true" />
    </div>
  );
}
