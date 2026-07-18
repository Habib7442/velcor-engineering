import {
  Car,
  CircuitBoard,
  Cog,
  Cpu,
  Droplet,
  Flame,
  FlaskConical,
  Gauge,
  LineChart,
  Pickaxe,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Sector = {
  slug: string;
  name: string;
  blurb: string;
  icon: LucideIcon;
};

export const SECTORS: Sector[] = [
  {
    slug: "water-treatment",
    name: "Water Treatment",
    blurb:
      "Process design for treatment, filtration, and distribution systems that meet discharge and potable-water standards.",
    icon: Droplet,
  },
  {
    slug: "industrial-automation",
    name: "Industrial Automation",
    blurb: "Control architecture and automation design that keeps production lines running with minimal downtime.",
    icon: Cog,
  },
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    blurb: "Piping, process, and safety systems engineered to upstream and downstream industry codes.",
    icon: Flame,
  },
  {
    slug: "utilities",
    name: "Utilities",
    blurb:
      "Engineering support for utility infrastructure — supply, metering, and distribution — built for continuous service.",
    icon: Gauge,
  },
  {
    slug: "power",
    name: "Power",
    blurb: "Generation and transmission engineering, from single-line diagrams through commissioning support.",
    icon: Zap,
  },
  {
    slug: "power-distribution-equipment",
    name: "Power Distribution Equipment",
    blurb:
      "Switchgear, panel, and distribution equipment design specified for the load and fault conditions of your site.",
    icon: CircuitBoard,
  },
  {
    slug: "automotive-engineering",
    name: "Automotive Engineering",
    blurb: "Component and systems engineering for automotive manufacturing and test environments.",
    icon: Car,
  },
  {
    slug: "electronic-engineering",
    name: "Electronic Engineering",
    blurb: "Circuit and embedded hardware design for equipment that has to perform outside a lab.",
    icon: Cpu,
  },
  {
    slug: "mining-engineering",
    name: "Mining Engineering",
    blurb:
      "Plant and equipment engineering for extraction and processing operations in demanding site conditions.",
    icon: Pickaxe,
  },
  {
    slug: "power-system-studies",
    name: "Power System Studies",
    blurb: "Load flow, short-circuit, and protection coordination studies that validate a system before it's built.",
    icon: LineChart,
  },
  {
    slug: "analysis-simulation",
    name: "Analysis & Simulation",
    blurb: "Structural, thermal, and process simulation used to verify a design before it reaches fabrication.",
    icon: FlaskConical,
  },
  {
    slug: "solar-power-plant",
    name: "Solar Power Plant",
    blurb: "Utility and industrial-scale solar engineering, from site layout through interconnection.",
    icon: Sun,
  },
];
