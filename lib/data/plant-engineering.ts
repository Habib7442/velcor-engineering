import { Building2, Gauge, Settings2, Waypoints, Zap, type LucideIcon } from "lucide-react";

export type PlantEngineeringDiscipline = {
  name: string;
  icon: LucideIcon;
  deliverables: string[];
};

export const PLANT_ENGINEERING_DISCIPLINES: PlantEngineeringDiscipline[] = [
  {
    name: "Piping",
    icon: Waypoints,
    deliverables: [
      "P&ID drafting",
      "Pipe routing & equipment modeling",
      "GA / Layout",
      "Isometrics & spool drawing",
      "Material take-off",
      "Pipe support design & detailing",
      "Stress analysis",
      "Review & validation of stress reports",
    ],
  },
  {
    name: "Electrical",
    icon: Zap,
    deliverables: [
      "3D modeling of cable tray",
      "SLD & 3-line diagrams",
      "MCC & SWGR schematics",
      "Specification & datasheet",
      "Panel GA (internal & external)",
      "Cable schedule",
      "Cable & cable tray sizing",
      "Cable tray & equipment layouts",
      "Lighting calculation & layout",
      "Earthing & lightning design",
      "BOM",
      "Power system study — short circuit, load flow, earthing, relay coordination, grid code compliance, arc flash",
    ],
  },
  {
    name: "Mechanical",
    icon: Settings2,
    deliverables: [
      "Design specification & datasheets",
      "Equipment modeling",
      "Base frame design & detailing",
      "Shop / fabrication drawing",
      "BOM",
      "ASME pressure vessel design (Sec VIII Div 1)",
      "API storage tank design",
      "Heat exchangers",
      "FEA analysis",
    ],
  },
  {
    name: "Instrumentation & Control",
    icon: Gauge,
    deliverables: [
      "Instrument specification & datasheet",
      "Instrument sizing & selection",
      "Instrument list",
      "Interconnection cable schedule",
      "Location layout",
      "Control system design",
      "System architecture",
      "Schematics",
      "Control panel GA",
      "Logic diagram",
      "Loop drawing",
      "PLC, HMI & SCADA programming support",
    ],
  },
  {
    name: "Civil & Structural",
    icon: Building2,
    deliverables: [
      "RCC & steel structure design & detailing",
      "Plot plan",
      "Foundation design",
      "Steel connection design & detail",
      "Structural analysis",
    ],
  },
];
