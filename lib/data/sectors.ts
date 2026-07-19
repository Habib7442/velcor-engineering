import {
  Car,
  CircuitBoard,
  Code2,
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
  description: string;
  capabilities: string[];
  icon: LucideIcon;
};

export const SECTORS: Sector[] = [
  {
    slug: "water-treatment",
    name: "Water Treatment",
    blurb:
      "Process design for treatment, filtration, and distribution systems that meet discharge and potable-water standards.",
    description:
      "Water and wastewater systems have to perform under regulatory scrutiny and public health stakes — there's no margin for a design that works on paper but fails at commissioning. We handle process design end to end: intake, pretreatment, filtration and membrane systems, chemical dosing, and distribution network engineering, sized and specified against discharge permits and potable-water standards from day one.",
    capabilities: [
      "Intake & pretreatment design",
      "Filtration & membrane systems",
      "Chemical dosing & disinfection",
      "Distribution network engineering",
      "Regulatory compliance & permitting support",
    ],
    icon: Droplet,
  },
  {
    slug: "industrial-automation",
    name: "Industrial Automation",
    blurb: "Control architecture and automation design that keeps production lines running with minimal downtime.",
    description:
      "Automation is only as good as the uptime it delivers. We design control architecture — PLC/SCADA logic, sensor and actuator integration, HMI layout — around the failure modes of your specific line, not a generic template, so the system degrades gracefully instead of stopping cold.",
    capabilities: [
      "PLC & SCADA architecture",
      "Sensor & actuator integration",
      "HMI design",
      "Fault detection & alarm logic",
      "Control panel specification",
    ],
    icon: Cog,
  },
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    blurb: "Piping, process, and safety systems engineered to upstream and downstream industry codes.",
    description:
      "Upstream and downstream facilities run on piping, process, and safety systems that have to hold up to code — API, ASME, and site-specific HAZOP findings included. We design and verify these systems against the standards your inspectors will actually check.",
    capabilities: [
      "Piping design & stress analysis",
      "Process flow diagrams (PFDs) & P&IDs",
      "Safety & relief system design",
      "HAZOP & risk assessment support",
      "Code compliance (API/ASME)",
    ],
    icon: Flame,
  },
  {
    slug: "utilities",
    name: "Utilities",
    blurb:
      "Engineering support for utility infrastructure — supply, metering, and distribution — built for continuous service.",
    description:
      "Utility infrastructure has one job: stay up. We engineer supply, metering, and distribution systems for continuous service, with redundancy and maintenance access built into the design rather than retrofitted after the first outage.",
    capabilities: [
      "Supply & distribution network design",
      "Metering system specification",
      "Redundancy & failover planning",
      "Asset condition assessment",
      "Capacity planning for growth",
    ],
    icon: Gauge,
  },
  {
    slug: "power",
    name: "Power",
    blurb: "Generation and transmission engineering, from single-line diagrams through commissioning support.",
    description:
      "From single-line diagrams through commissioning support, we cover generation and transmission engineering for facilities that can't afford ambiguity in their electrical design. Every drawing is built to be buildable, not just approvable.",
    capabilities: [
      "Single-line & three-line diagrams",
      "Generation system design",
      "Transmission line engineering",
      "Protection & relay coordination",
      "Commissioning support",
    ],
    icon: Zap,
  },
  {
    slug: "power-distribution-equipment",
    name: "Power Distribution Equipment",
    blurb:
      "Switchgear, panel, and distribution equipment design specified for the load and fault conditions of your site.",
    description:
      "Switchgear and panel design that ignores your actual load and fault conditions is a liability waiting to happen. We specify distribution equipment against the real electrical environment of your site — load profiles, fault currents, and future capacity — not a catalog default.",
    capabilities: [
      "Switchgear specification",
      "Panel & enclosure design",
      "Load & fault current analysis",
      "Arc-flash study coordination",
      "Equipment selection & sizing",
    ],
    icon: CircuitBoard,
  },
  {
    slug: "automotive-engineering",
    name: "Automotive Engineering",
    blurb: "Component and systems engineering for automotive manufacturing and test environments.",
    description:
      "Manufacturing and test environments for automotive components demand tight tolerances and repeatable process control. We handle component and systems engineering built to survive both production-line reality and validation testing.",
    capabilities: [
      "Component design & tolerancing",
      "Manufacturing process engineering",
      "Test rig & fixture design",
      "Validation & DFMEA support",
      "Production line integration",
    ],
    icon: Car,
  },
  {
    slug: "electronic-engineering",
    name: "Electronic Engineering",
    blurb: "Circuit and embedded hardware design for equipment that has to perform outside a lab.",
    description:
      "Circuit and embedded hardware design for equipment that has to perform outside a lab — vibration, temperature swings, and electrical noise included. We design for the environment your product actually ships into, not a clean-bench best case.",
    capabilities: [
      "Circuit & PCB design",
      "Embedded firmware integration",
      "Environmental & EMC design",
      "Prototyping & bring-up support",
      "Design for manufacturing (DFM)",
    ],
    icon: Cpu,
  },
  {
    slug: "mining-engineering",
    name: "Mining Engineering",
    blurb:
      "Plant and equipment engineering for extraction and processing operations in demanding site conditions.",
    description:
      "Extraction and processing operations run in some of the harshest site conditions in industry — dust, vibration, remote logistics. We engineer plant and equipment built to keep operating there, not just survive a factory acceptance test.",
    capabilities: [
      "Plant layout & material handling",
      "Equipment specification for harsh environments",
      "Processing circuit design",
      "Structural & foundation engineering",
      "Site logistics coordination",
    ],
    icon: Pickaxe,
  },
  {
    slug: "power-system-studies",
    name: "Power System Studies",
    blurb: "Load flow, short-circuit, and protection coordination studies that validate a system before it's built.",
    description:
      "A power system that hasn't been studied is a system you're hoping works. We run load flow, short-circuit, and protection coordination studies that validate design assumptions before equipment is ordered, not after it fails to trip correctly.",
    capabilities: [
      "Load flow analysis",
      "Short-circuit studies",
      "Protection coordination",
      "Arc-flash hazard analysis",
      "Power quality assessment",
    ],
    icon: LineChart,
  },
  {
    slug: "analysis-simulation",
    name: "Analysis & Simulation",
    blurb: "Structural, thermal, and process simulation used to verify a design before it reaches fabrication.",
    description:
      "Structural, thermal, and process simulation catches the failure mode before it reaches fabrication — where fixing it is a design change, not a field retrofit. We run the analysis your design decisions actually depend on.",
    capabilities: [
      "Structural (FEA) analysis",
      "Thermal & CFD simulation",
      "Process simulation",
      "Fatigue & failure analysis",
      "Design verification reporting",
    ],
    icon: FlaskConical,
  },
  {
    slug: "solar-power-plant",
    name: "Solar Power Plant",
    blurb: "Utility and industrial-scale solar engineering, from site layout through interconnection.",
    description:
      "Utility and industrial-scale solar projects live or die on site layout, interconnection design, and yield assumptions that hold up over 25 years, not just at commissioning. We engineer for the full project lifecycle, from site assessment through grid interconnection.",
    capabilities: [
      "Site layout & yield assessment",
      "Array & inverter design",
      "Grid interconnection engineering",
      "Structural mounting design",
      "Performance & commissioning support",
    ],
    icon: Sun,
  },
  {
    slug: "software-development",
    name: "Software Development",
    blurb:
      "Web and mobile application development, plus workflow automation with tools like n8n, for teams that need custom software alongside their engineering.",
    description:
      "Web and mobile applications, plus workflow automation with tools like n8n, for teams that need custom software to run alongside their engineering work — not a separate vendor relationship with none of the context.",
    capabilities: [
      "Web application development",
      "Mobile application development",
      "Workflow automation (n8n)",
      "API & systems integration",
      "Internal tooling & dashboards",
    ],
    icon: Code2,
  },
];
