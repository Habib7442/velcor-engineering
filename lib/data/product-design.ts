import { CircuitBoard, Cog, Cpu, Puzzle, SlidersHorizontal, Workflow, Wrench, type LucideIcon } from "lucide-react";

export type ProductDesignItem = {
  name: string;
  description: string;
  icon: LucideIcon;
};

export const PRODUCT_DESIGN_ITEMS: ProductDesignItem[] = [
  {
    name: "Industrial Automation",
    description: "Automation solutions to optimize manufacturing processes and efficiency.",
    icon: Cog,
  },
  {
    name: "Machine & Equipment Design (SPMs)",
    description: "Custom machinery and special-purpose machine design.",
    icon: Wrench,
  },
  {
    name: "Control Systems",
    description: "Precision, reliable, easy-to-operate control systems.",
    icon: SlidersHorizontal,
  },
  {
    name: "Assembly Lines",
    description: "Streamlined assembly solutions that scale production.",
    icon: Workflow,
  },
  {
    name: "Robotic Integration",
    description: "Integration of robotic systems into production workflows.",
    icon: Puzzle,
  },
  {
    name: "Power Distribution Equipment",
    description: "Power solutions tailored for industrial environments.",
    icon: CircuitBoard,
  },
  {
    name: "Embedded Products",
    description: "Embedded systems for real-time control and monitoring.",
    icon: Cpu,
  },
];
