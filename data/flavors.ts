export interface Flavor {
  id: string;
  name: string;
  family: string;
  description: string;
  color: string;
  rgb: string;
  image: string;
  position: string;
  source: string;
}

// Product names, flavor notes and packaging follow Monster Energy's Brazilian catalog.
export const flavors: Flavor[] = [
  {
    id: "original",
    name: "Original Green",
    family: "Monster Energy",
    description: "Marcante e suave. O sabor inconfundível que começou tudo.",
    color: "#a4dc24",
    rgb: "164, 220, 36",
    image: "/media/cans/original.png",
    position: "01",
    source: "https://www.monsterenergy.com/pt-br/energy-drinks/monster-energy/monster-energy-original/",
  },
  {
    id: "white",
    name: "Ultra White",
    family: "Monster Ultra",
    description: "Sabor cítrico, sensação refrescante e zero açúcar.",
    color: "#dce5e1",
    rgb: "220, 229, 225",
    image: "/media/cans/white.png",
    position: "02",
    source: "https://www.monsterenergy.com/pt-br/energy-drinks/monster-ultra/monster-energy-zero-ultra/",
  },
  {
    id: "mango",
    name: "Mango Loco",
    family: "Juice Monster",
    description: "Suco de manga e um mix de frutas cítricas naturais.",
    color: "#37b8e0",
    rgb: "55, 184, 224",
    image: "/media/cans/mango.png",
    position: "03",
    source: "https://www.monsterenergy.com/pt-br/energy-drinks/juice-monster/monster-energy-juice-mango-loco/",
  },
  {
    id: "pipeline",
    name: "Pipeline Punch",
    family: "Juice Monster",
    description: "Maracujá, laranja e goiaba em um punch de frutas.",
    color: "#f16e95",
    rgb: "241, 110, 149",
    image: "/media/cans/pipeline.png",
    position: "04",
    source: "https://www.monsterenergy.com/pt-br/energy-drinks/juice-monster/monster-energy-juice-pipeline-punch/",
  },
  {
    id: "watermelon",
    name: "Ultra Watermelon",
    family: "Monster Ultra",
    description: "Melancia refrescante em uma versão sem açúcar.",
    color: "#f05260",
    rgb: "240, 82, 96",
    image: "/media/cans/watermelon.png",
    position: "05",
    source: "https://www.monsterenergy.com/pt-br/energy-drinks/monster-ultra/monster-energy-ultra-watermelon/",
  },
];
