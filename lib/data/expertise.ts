export type ExpertiseScopeGroup = {
  groupLabel?: string;
  items: string[];
};

export type ExpertiseService = {
  slug: string;
  name: string;
  tagline: string;
  intro: string[];
  scope: ExpertiseScopeGroup[];
  applications?: string[];
  deliverables: string[];
  imageQuery: string;
};

export type ExpertiseCategory = {
  slug: string;
  name: string;
  tagline: string;
  intro: string[];
  imageQuery: string;
  services: ExpertiseService[];
};

export const EXPERTISE_CATEGORIES: ExpertiseCategory[] = [
  {
    slug: "plants-infrastructure",
    name: "Plants & Infrastructure",
    tagline: "Engineering Complex Industrial Facilities and Critical Infrastructure",
    intro: [
      "Velcor Engineering provides multidisciplinary engineering solutions for industrial plants and critical infrastructure. We combine process, mechanical, piping, electrical, instrumentation, civil, and structural engineering to develop coordinated solutions across the project lifecycle.",
      "From concept development and detailed engineering to 3D modelling, analysis, documentation, and project support, we help clients develop practical, build-ready engineering packages for new facilities, expansions, upgrades, and brownfield modifications.",
    ],
    imageQuery: "industrial plant infrastructure",
    services: [
      {
        slug: "oil-gas",
        name: "Oil & Gas",
        tagline: "Engineering for Upstream, Midstream and Downstream Facilities",
        intro: [
          "We provide multidisciplinary engineering support for oil and gas facilities, including processing plants, pipelines, terminals, utility systems, and associated infrastructure. Our teams develop coordinated engineering packages across piping, mechanical, electrical, instrumentation, and structural disciplines.",
        ],
        scope: [
          {
            groupLabel: "Process & Piping Engineering",
            items: [
              "P&ID development and drafting",
              "Process and utility piping layouts",
              "3D piping modelling",
              "Equipment and piping arrangement",
              "Pipe routing and clash coordination",
              "General arrangement drawings",
              "Piping isometric drawings",
              "Material take-offs",
              "Pipe support design and detailing",
              "Pipe stress analysis support",
              "Brownfield modifications and as-built updates",
            ],
          },
          {
            groupLabel: "Mechanical Engineering",
            items: [
              "Static and rotating equipment layouts",
              "Equipment datasheets and specifications",
              "Pressure vessel engineering support",
              "Storage tank engineering",
              "Heat exchanger engineering",
              "Package and skid engineering",
              "Equipment support structures",
              "Fabrication and assembly drawings",
            ],
          },
          {
            groupLabel: "Electrical Engineering",
            items: [
              "Single-line diagrams",
              "Electrical load lists and calculations",
              "MCC and switchgear engineering",
              "Cable sizing and schedules",
              "Cable tray layouts",
              "Electrical equipment layouts",
              "Earthing and lightning protection",
            ],
          },
          {
            groupLabel: "Instrumentation & Control",
            items: [
              "Instrument index and datasheets",
              "Instrument sizing and selection",
              "Instrument location layouts",
              "Hook-up drawings",
              "Loop diagrams",
              "Interconnection diagrams",
              "Control system architecture",
              "PLC, DCS, and SCADA engineering support",
            ],
          },
          {
            groupLabel: "Civil & Structural Engineering",
            items: [
              "Plot plans",
              "Equipment foundations",
              "Pipe racks",
              "Structural steel",
              "Platforms and access structures",
              "RCC structures",
              "Equipment support structures",
            ],
          },
        ],
        deliverables: [
          "P&IDs",
          "3D Models",
          "Plant Layouts",
          "Piping Isometrics",
          "MTOs",
          "Equipment Datasheets",
          "Electrical Drawings",
          "Instrumentation Packages",
          "Structural Drawings",
          "Engineering Calculations",
        ],
        imageQuery: "oil and gas refinery plant",
      },
      {
        slug: "water-wastewater-treatment",
        name: "Water & Wastewater Treatment Plants",
        tagline: "Engineering Treatment Systems from Process to Automation",
        intro: [
          "We provide multidisciplinary engineering support for water and wastewater treatment facilities, including treatment processes, pumping, filtration, chemical dosing, utility systems, and automation.",
          "Our engineering approach integrates process, mechanical, piping, electrical, instrumentation, structural, and control disciplines into coordinated plant solutions.",
        ],
        scope: [
          {
            groupLabel: "Process Engineering",
            items: [
              "Process flow diagrams",
              "P&ID development",
              "Hydraulic calculations",
              "Process equipment sizing",
              "Pump and equipment selection support",
              "Filtration systems",
              "Chemical dosing systems",
              "Sludge and waste handling systems",
            ],
          },
          {
            groupLabel: "Mechanical & Piping",
            items: [
              "Equipment layouts",
              "Pumping systems",
              "Pipe routing",
              "Piping isometrics",
              "Tank and vessel engineering support",
              "Pipe supports",
              "Material take-offs",
            ],
          },
          {
            groupLabel: "Electrical & Automation",
            items: [
              "MCC and control panel engineering",
              "Motor control systems",
              "Instrumentation",
              "PLC automation",
              "HMI development",
              "SCADA systems",
              "Remote monitoring",
            ],
          },
          {
            groupLabel: "Civil & Structural",
            items: ["Equipment foundations", "Tank and basin structures", "Pipe support structures", "Plant buildings", "Structural steel"],
          },
        ],
        deliverables: [
          "Process Flow Diagrams",
          "P&IDs",
          "Hydraulic Calculations",
          "Equipment Layouts",
          "Piping Packages",
          "Electrical Drawings",
          "PLC/SCADA Documentation",
          "Structural Drawings",
        ],
        imageQuery: "water treatment plant",
      },
      {
        slug: "infrastructure",
        name: "Infrastructure",
        tagline: "Coordinated Engineering for Industrial and Utility Infrastructure",
        intro: [
          "We provide engineering support for industrial and utility infrastructure requiring coordination across structural, mechanical, electrical, and utility systems.",
          "Our scope covers new developments, expansions, upgrades, and brownfield modifications, supported by detailed engineering and coordinated design documentation.",
        ],
        scope: [
          {
            items: [
              "Industrial buildings and facilities",
              "Equipment foundations",
              "Structural steel engineering",
              "Pipe racks",
              "Platforms and access structures",
              "Utility piping",
              "Electrical infrastructure",
              "Cable routing systems",
              "Drainage and site services",
              "Equipment layouts",
              "3D coordination and modelling",
              "Brownfield modifications",
              "As-built engineering and documentation",
            ],
          },
        ],
        deliverables: [
          "Site Layouts",
          "General Arrangement Drawings",
          "Structural Drawings",
          "Foundation Drawings",
          "Utility Layouts",
          "3D Models",
          "Material Take-Offs",
          "Construction Documentation",
        ],
        imageQuery: "industrial construction site infrastructure",
      },
      {
        slug: "utilities-substations-grid",
        name: "Utilities, Substations & Grid Infrastructure",
        tagline: "Engineering Reliable Electrical Infrastructure",
        intro: [
          "We support the engineering of utility and electrical infrastructure, including substations, distribution systems, protection and control systems, and associated monitoring solutions.",
          "Our engineering scope supports the generation, transformation, distribution, protection, and control of electrical power across industrial and utility applications.",
        ],
        scope: [
          {
            groupLabel: "Substation Engineering",
            items: [
              "Substation layouts",
              "Primary equipment layouts",
              "Busbar arrangements",
              "Transformer integration",
              "AIS and GIS engineering support",
              "Equipment foundations and structures",
            ],
          },
          {
            groupLabel: "Electrical Design",
            items: [
              "Single-line diagrams",
              "Three-line diagrams",
              "AC and DC auxiliary systems",
              "Protection and control schematics",
              "Relay coordination",
              "Cable schedules",
              "Cable tray layouts",
              "Earthing and grounding systems",
              "Lightning protection",
            ],
          },
          {
            groupLabel: "Power System Studies",
            items: ["Load flow analysis", "Short-circuit analysis", "Protection coordination", "Arc-flash studies", "Harmonic studies", "Grounding studies"],
          },
          {
            groupLabel: "Automation & Monitoring",
            items: [
              "Substation automation",
              "SCADA integration",
              "Remote monitoring",
              "Communication architecture",
              "Protection and control system integration",
            ],
          },
        ],
        deliverables: [
          "Substation Layouts",
          "SLDs",
          "Protection Schemes",
          "Electrical Schematics",
          "Cable Schedules",
          "Grounding Designs",
          "Power System Studies",
          "SCADA Documentation",
        ],
        imageQuery: "electrical substation high voltage",
      },
      {
        slug: "mining-heavy-industry",
        name: "Mining & Heavy Industry",
        tagline: "Engineering for Demanding Industrial Environments",
        intro: [
          "We provide engineering support for mining and heavy industrial operations where equipment reliability, material movement, structural integrity, power availability, and maintainability are critical.",
          "Our multidisciplinary capabilities support processing plants, material handling systems, electrical infrastructure, and associated industrial facilities.",
        ],
        scope: [
          {
            items: [
              "Crushing and screening plant layouts",
              "Material handling systems",
              "Conveyor systems",
              "Chutes and transfer systems",
              "Processing equipment layouts",
              "Structural steel and platforms",
              "Equipment foundations",
              "Industrial piping systems",
              "Electrical distribution",
              "MCC and motor systems",
              "Plant automation",
              "Power system studies",
              "3D plant modelling",
              "Brownfield modifications",
            ],
          },
        ],
        deliverables: [
          "Plant Layouts",
          "Conveyor Drawings",
          "Structural Drawings",
          "Equipment Layouts",
          "Electrical Packages",
          "Automation Documentation",
          "3D Models",
          "Material Take-Offs",
        ],
        imageQuery: "mining heavy industry plant",
      },
    ],
  },
  {
    slug: "product-engineering",
    name: "Product Engineering",
    tagline: "From Engineering Concept to Manufacturing-Ready Products",
    intro: [
      "Velcor Engineering helps manufacturers, OEMs, and technology companies develop engineered products from initial concepts through detailed design and manufacturing documentation.",
      "We combine electrical, mechanical, structural, and control engineering to develop products that are practical to manufacture, assemble, test, transport, install, and operate.",
    ],
    imageQuery: "engineered electrical product manufacturing",
    services: [
      {
        slug: "lv-mv-switchgear",
        name: "LV/MV Switchgear & Power Distribution Equipment",
        tagline: "Engineering Reliable Power Distribution Solutions",
        intro: [
          "We provide engineering support for low-voltage and medium-voltage switchgear, switchboards, motor control centers, distribution systems, protection panels, and associated electrical equipment.",
          "Our work combines electrical and mechanical engineering to develop coordinated product designs and complete manufacturing documentation.",
        ],
        scope: [
          {
            groupLabel: "Electrical Engineering",
            items: [
              "Single-line diagrams",
              "Power circuit design",
              "Control schematics",
              "Protection schemes",
              "Relay selection",
              "Component sizing and selection",
              "Busbar sizing",
              "Electrical coordination",
            ],
          },
          {
            groupLabel: "Mechanical Engineering",
            items: [
              "Enclosure design",
              "Internal equipment layouts",
              "Panel general arrangement drawings",
              "Busbar arrangements",
              "Cable routing",
              "Compartment design",
              "Equipment mounting",
              "Structural and fabrication design",
            ],
          },
          {
            groupLabel: "Manufacturing Documentation",
            items: [
              "Bill of materials",
              "Wiring diagrams",
              "Terminal plans",
              "Fabrication drawings",
              "Assembly drawings",
              "Component schedules",
              "Nameplate and labelling support",
            ],
          },
          {
            groupLabel: "Testing & Validation Support",
            items: ["Design review", "Testing documentation", "Compliance documentation", "Type-test support documentation"],
          },
        ],
        deliverables: [
          "SLDs",
          "Schematics",
          "Panel GAs",
          "Wiring Diagrams",
          "Busbar Layouts",
          "Fabrication Drawings",
          "Assembly Drawings",
          "BOMs",
          "Testing Documentation",
        ],
        imageQuery: "electrical switchgear panel",
      },
      {
        slug: "e-houses-modular-power",
        name: "E-Houses & Modular Power Systems",
        tagline: "Engineering Prefabricated and Modular Electrical Infrastructure",
        intro: [
          "We provide engineering support for electrical houses, modular substations, containerized power systems, and skid-mounted electrical packages.",
          "Our multidisciplinary teams coordinate electrical equipment, structural systems, HVAC, cable management, auxiliary systems, and safety requirements into complete modular engineering packages.",
        ],
        scope: [
          {
            groupLabel: "Electrical Integration",
            items: [
              "Switchgear integration",
              "Transformer integration",
              "MCC integration",
              "UPS and DC systems",
              "Protection and control systems",
              "Auxiliary power systems",
            ],
          },
          {
            groupLabel: "Mechanical & Structural Engineering",
            items: [
              "E-House layouts",
              "Container and enclosure design",
              "Structural frame design",
              "Equipment supports",
              "Access platforms",
              "Lifting and transportation considerations",
            ],
          },
          {
            groupLabel: "Building & Auxiliary Systems",
            items: ["HVAC coordination", "Lighting systems", "Cable management", "Fire and safety system coordination", "Earthing", "Auxiliary systems"],
          },
        ],
        deliverables: [
          "General Arrangement Drawings",
          "Electrical Layouts",
          "Structural Drawings",
          "Equipment Integration Drawings",
          "Cable Routing",
          "Auxiliary System Layouts",
          "BOMs",
          "Fabrication Packages",
        ],
        imageQuery: "e-house modular electrical container",
      },
      {
        slug: "bess-modular-energy",
        name: "BESS & Modular Energy Structures",
        tagline: "Engineering Flexible Energy Storage Infrastructure",
        intro: [
          "Velcor Engineering provides engineering support for Battery Energy Storage Systems and modular energy infrastructure.",
          "We coordinate electrical, mechanical, structural, thermal, and auxiliary systems to develop integrated engineering packages for containerized and modular energy storage applications.",
        ],
        scope: [
          {
            groupLabel: "Electrical Engineering",
            items: [
              "Battery system architecture support",
              "PCS and inverter integration",
              "Transformer integration",
              "Switchgear integration",
              "DC and AC distribution",
              "Protection systems",
              "Auxiliary power systems",
            ],
          },
          {
            groupLabel: "Mechanical & Structural Engineering",
            items: [
              "Container and enclosure layouts",
              "Equipment arrangement",
              "Structural frame design",
              "Skid design",
              "Equipment supports",
              "Transportation and lifting considerations",
            ],
          },
          {
            groupLabel: "Thermal & Safety Coordination",
            items: [
              "HVAC integration",
              "Cooling system coordination",
              "Thermal management support",
              "Fire detection coordination",
              "Fire suppression system coordination",
              "Emergency systems",
            ],
          },
        ],
        deliverables: [
          "General Arrangement Drawings",
          "Single-Line Diagrams",
          "Electrical Schematics",
          "Equipment Layouts",
          "Cable Schedules",
          "Structural Drawings",
          "BOMs",
          "Installation Documentation",
        ],
        imageQuery: "battery energy storage system container",
      },
    ],
  },
  {
    slug: "industrial-automation",
    name: "Industrial Automation",
    tagline: "Engineering Smarter Machines and More Efficient Manufacturing Operations",
    intro: [
      "Velcor Engineering develops automation and machinery solutions for manufacturing and industrial operations.",
      "We combine mechanical design, electrical engineering, controls, robotics, sensors, electronics, and software to develop systems that improve productivity, repeatability, quality, safety, and operational visibility.",
    ],
    imageQuery: "industrial automation robotics factory",
    services: [
      {
        slug: "special-purpose-machines",
        name: "Special Purpose Machines",
        tagline: "Custom Machines Engineered Around Your Process",
        intro: [
          "We design Special Purpose Machines for manufacturing, assembly, testing, inspection, and other specialized industrial applications.",
          "Each machine is engineered around the client's specific process requirements, combining mechanical systems, tooling, motion, controls, safety, and automation into a complete solution.",
        ],
        scope: [
          {
            groupLabel: "Machine Design",
            items: [
              "Concept development",
              "Feasibility studies",
              "Machine architecture",
              "3D machine design",
              "Mechanism design",
              "Assembly and part design",
              "Fixtures and tooling",
            ],
          },
          {
            groupLabel: "Automation & Controls",
            items: [
              "PLC architecture",
              "HMI systems",
              "Servo and motion systems",
              "Pneumatic systems",
              "Hydraulic systems",
              "Sensors and actuators",
              "Control panel engineering",
            ],
          },
          {
            groupLabel: "Safety Engineering",
            items: ["Machine guarding", "Safety interlocks", "Emergency stop systems", "Safety sensors and controls"],
          },
        ],
        deliverables: [
          "Concept Designs",
          "3D CAD Models",
          "Assembly Drawings",
          "Manufacturing Drawings",
          "BOMs",
          "Pneumatic Schematics",
          "Electrical Schematics",
          "PLC/HMI Documentation",
        ],
        imageQuery: "special purpose machine manufacturing automation",
      },
      {
        slug: "factory-automation",
        name: "Factory Automation",
        tagline: "Connecting Machines, Processes and Production Lines",
        intro: [
          "We provide automation engineering for individual machines, production stations, and complete manufacturing lines.",
          "Our solutions integrate controls, robotics, sensors, material movement, machine safety, and production data to create efficient, connected, and scalable manufacturing operations.",
        ],
        scope: [
          {
            items: [
              "Production line design",
              "Workstation design",
              "Automation architecture",
              "PLC engineering",
              "HMI development",
              "SCADA integration",
              "Robotic integration",
              "Machine vision systems",
              "Sensors and actuators",
              "Safety systems and interlocks",
              "Process sequencing",
              "Cycle-time optimization",
              "OEE monitoring",
            ],
          },
        ],
        applications: ["Assembly", "Testing", "Inspection", "Packaging", "Material Movement", "Process Automation", "Quality Control"],
        deliverables: [
          "Automation Architecture",
          "Electrical Schematics",
          "Control Panel Drawings",
          "PLC/HMI Documentation",
          "Line Layouts",
          "Robot Cell Layouts",
          "Safety Documentation",
        ],
        imageQuery: "factory automation robotics production line",
      },
      {
        slug: "material-handling-systems",
        name: "Material Handling Systems",
        tagline: "Engineering Efficient Material Movement",
        intro: [
          "We design material handling systems that move, position, transfer, and manage materials throughout industrial and manufacturing facilities.",
          "Our engineering considers material flow, throughput, equipment selection, structural design, controls, and integration with the overall production process.",
        ],
        scope: [
          {
            items: [
              "Belt conveyor systems",
              "Roller conveyors",
              "Chain conveyors",
              "Pallet handling systems",
              "Transfer systems",
              "Lifting and positioning systems",
              "Sorting systems",
              "Automated material movement",
              "Conveyor controls",
              "Sensors and tracking",
              "Equipment integration",
            ],
          },
        ],
        deliverables: [
          "System Layouts",
          "Equipment Designs",
          "Conveyor Calculations",
          "Structural Drawings",
          "Drive Selection",
          "Controls Architecture",
          "Manufacturing Documentation",
        ],
        imageQuery: "conveyor material handling system warehouse",
      },
      {
        slug: "embedded-electronics",
        name: "Embedded Electronics Products",
        tagline: "From Electronic Concept to Connected Product",
        intro: [
          "Velcor Engineering develops embedded and electronic products by combining electronics, firmware, connectivity, mechanical integration, and product engineering.",
          "We support product development from initial architecture through schematic design, PCB development, embedded software, prototyping, testing, and manufacturing support.",
        ],
        scope: [
          {
            groupLabel: "Electronics Hardware",
            items: [
              "System architecture",
              "Schematic design",
              "Component selection",
              "PCB design and layout",
              "Power electronics support",
              "Signal integrity considerations",
              "Design for manufacturing",
            ],
          },
          {
            groupLabel: "Embedded Firmware",
            items: [
              "Microcontroller programming",
              "Embedded firmware development",
              "Sensor integration",
              "Communication protocols",
              "Wireless and IoT connectivity",
              "Edge data processing",
            ],
          },
          {
            groupLabel: "Product Development",
            items: [
              "Enclosure integration",
              "Thermal considerations",
              "Prototype development",
              "Testing support",
              "Manufacturing documentation",
              "Product lifecycle engineering",
            ],
          },
        ],
        deliverables: [
          "System Architecture",
          "Schematics",
          "PCB Layouts",
          "Gerber and Manufacturing Files",
          "Firmware",
          "BOMs",
          "Test Documentation",
          "Product Manufacturing Packages",
        ],
        imageQuery: "PCB embedded electronics engineering",
      },
    ],
  },
];

export type FlatExpertiseService = ExpertiseService & { categorySlug: string; categoryName: string };

export const ALL_SERVICES: FlatExpertiseService[] = EXPERTISE_CATEGORIES.flatMap((category) =>
  category.services.map((service) => ({ ...service, categorySlug: category.slug, categoryName: category.name })),
);

export function getCategory(slug: string): ExpertiseCategory | undefined {
  return EXPERTISE_CATEGORIES.find((category) => category.slug === slug);
}

export function getService(categorySlug: string, serviceSlug: string): FlatExpertiseService | undefined {
  return ALL_SERVICES.find((service) => service.categorySlug === categorySlug && service.slug === serviceSlug);
}
