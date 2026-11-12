export type VehicleMode = 'sky' | 'road';

export interface EngineeringHotspot {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  metric: string;
  metricLabel: string;
  description: string;
  /** Percentage coordinates on the 16:9 hero stage */
  xPercent: number;
  yPercent: number;
}

export interface ModeConfiguration {
  id: VehicleMode;
  label: string;
  kicker: string;
  environmentTag: string;
  image: string;
  imageAlt: string;
  headline: string;
  subheadline: string;
  telemetry: {
    label: string;
    value: string;
    unit: string;
    detail: string;
  }[];
  hotspots: EngineeringHotspot[];
}

export interface TransitionStage {
  step: string;
  timestamp: string;
  title: string;
  mechanicalState: string;
  summary: string;
  metrics: {
    wingSpan: string;
    rotorPitch: string;
    groundClearance: string;
    powerDraw: string;
  };
}

export const AERO_X_MODES: Record<VehicleMode, ModeConfiguration> = {
  sky: {
    id: 'sky',
    label: 'Sky Mode · eVTOL Flight',
    kicker: 'Dual-Mode Electric Flagship · 400m Urban Flight Corridor · Certified Category A',
    environmentTag: 'Hovering 420m Above Neo-Metropolis Sector 4',
    image: '/src/assets/images/aero_x_hero_render_1794424547585.jpg',
    imageAlt:
      '3D render of the Aero X luxury electric flying car hovering above a twilight futuristic city with glowing quad-ducted rotors deployed',
    headline: 'The Road Ends Where Your Horizon Begins.',
    subheadline:
      'Aero X is a flagship all-electric grand tourer that transitions seamlessly from city asphalt to 400-meter aerial flight corridors in 18 seconds—uniting sculpted titanium aerodynamics with whisper-quiet quad-ducted propulsion.',
    telemetry: [
      {
        label: 'Cruise Velocity',
        value: '340',
        unit: 'km/h',
        detail: 'Horizontal vector-thrust cruise at 400m–1,500m altitude',
      },
      {
        label: 'Transition Time',
        value: '18.0',
        unit: 'sec',
        detail: 'Automated mechanical morph from road chassis to flight lock',
      },
      {
        label: 'Combined Range',
        value: '680',
        unit: 'km',
        detail: '1,000V solid-state lithium-silicon structural battery pack',
      },
      {
        label: 'Acoustic Footprint',
        value: '54.2',
        unit: 'dBA',
        detail: 'Measured at 50m hover via noise-canceling stator geometry',
      },
    ],
    hotspots: [
      {
        id: 'front-port-rotor',
        index: '01',
        title: 'Acoustic-Shielded Quad Ducts',
        subtitle: 'Counter-Rotating Carbon-Titanium Fans',
        metric: '1,100 kW',
        metricLabel: 'Combined Peak Vertical Thrust',
        description:
          'Four independent variable-pitch electric ducted rotors deploy laterally from the fenders. Serrated titanium stator vanes cancel harmonic blade-vortex noise for urban flight approval.',
        xPercent: 66,
        yPercent: 60,
      },
      {
        id: 'canopy-monocoque',
        index: '02',
        title: 'Electrochromic Glass Monocoque',
        subtitle: '300° Augmented Flight Deck HUD',
        metric: '0.19 Cd',
        metricLabel: 'Aerodynamic Drag Coefficient',
        description:
          'Flush-bonded aerospace polycarbonate canopy projects real-time 3D flight corridors, wind-shear vectors, and landing pad alignment directly onto the curvature of the glass.',
        xPercent: 62,
        yPercent: 40,
      },
      {
        id: 'aft-thruster',
        index: '03',
        title: 'Vector-Thrust Rear Fairing',
        subtitle: 'Active Pitch & Yaw Stabilization',
        metric: '400 Hz',
        metricLabel: 'Fly-By-Wire Adjustment Rate',
        description:
          'Rear ducted nacelles tilt up to 38 degrees to transition smoothly from vertical hover to high-speed forward cruise while compensating for urban crosswinds.',
        xPercent: 86,
        yPercent: 44,
      },
    ],
  },
  road: {
    id: 'road',
    label: 'Road Mode · Grand Tourer',
    kicker: 'Dual-Mode Electric Flagship · All-Wheel Torque Vectoring · Flush Wing Chassis',
    environmentTag: 'Coastal Skyway · Quad-Ducts Retracted & Locked',
    image: '/src/assets/images/aero_x_road_mode_1794424548113.jpg',
    imageAlt:
      '3D render of the Aero X in Ground Grand-Tourer Mode driving along a curved coastal highway at blue hour with flight rotors retracted flush into the bodywork',
    headline: 'Sculpted for the Asphalt. Engineered for the Sky.',
    subheadline:
      'With its quad-ducted flight pods retracted flush inside the carbon-titanium bodywork, Aero X drives with the poised center of gravity and instantaneous torque of a purebred electric grand tourer.',
    telemetry: [
      {
        label: '0–100 km/h Sprint',
        value: '2.6',
        unit: 'sec',
        detail: 'Dual-axle permanent magnet synchronous drive motors',
      },
      {
        label: 'Ground Range',
        value: '740',
        unit: 'km',
        detail: 'WLTP combined cycle with regenerative ceramic braking',
      },
      {
        label: 'Track Width',
        value: '2,040',
        unit: 'mm',
        detail: 'Fits standard metropolitan lanes and subterranean parking',
      },
      {
        label: '800kW Hypercharge',
        value: '11.5',
        unit: 'min',
        detail: '10% to 80% state-of-charge at vertiport or highway hubs',
      },
    ],
    hotspots: [
      {
        id: 'retracted-fender',
        index: '01',
        title: 'Flush-Sealed Rotor Vaults',
        subtitle: 'Zero-Gap Titanium Clamshell Doors',
        metric: '0.20 mm',
        metricLabel: 'Laser-Measured Panel Tolerance',
        description:
          'During ground operation, the four flight rotors seal completely inside the front and rear quarter panels, protecting the carbon blades from road debris and aerodynamic turbulence.',
        xPercent: 48,
        yPercent: 56,
      },
      {
        id: 'active-suspension',
        index: '02',
        title: 'Dual-Regime Adaptive Chassis',
        subtitle: 'Hydraulic Ride-Height & Roll Control',
        metric: '115 mm',
        metricLabel: 'Dynamic Ground Clearance Range',
        description:
          'Active predictive dampers read road topography 150 meters ahead and automatically absorb vertical touchdown loads during vertiport landings.',
        xPercent: 65,
        yPercent: 64,
      },
      {
        id: 'rear-diffuser',
        index: '03',
        title: 'Active Venturi Rear Diffuser',
        subtitle: 'High-Speed Ground Downforce',
        metric: '310 kg',
        metricLabel: 'Downforce at 250 km/h',
        description:
          'Deployable carbon underbody channels generate planted grand-touring stability on highways and neutralize ground-effect lift until flight mode is authorized.',
        xPercent: 80,
        yPercent: 60,
      },
    ],
  },
};

export const TRANSITION_STAGES: TransitionStage[] = [
  {
    step: '01',
    timestamp: '00.0 s',
    title: 'Corridor Handshake & Chassis Pre-Check',
    mechanicalState: 'Ground Grand-Tourer Configuration',
    summary:
      'Upon entering a designated vertiport or clearing zone, onboard triple-redundant avionics verify airspace clearance, battery thermal margin, and 360-degree LiDAR obstacle clearance.',
    metrics: {
      wingSpan: '2,040 mm',
      rotorPitch: '0.0° (Stowed)',
      groundClearance: '125 mm',
      powerDraw: '18 kW',
    },
  },
  {
    step: '02',
    timestamp: '06.5 s',
    title: 'Clamshell Fairing Deployment',
    mechanicalState: 'Fender Vaults Unfolding',
    summary:
      'Electro-hydraulic titanium actuators glide the front and rear fender vaults outward along forged carbon-fiber four-bar linkages, exposing the four counter-rotating ducted fans.',
    metrics: {
      wingSpan: '3,480 mm',
      rotorPitch: '4.5° (Idle Spin)',
      groundClearance: '165 mm',
      powerDraw: '64 kW',
    },
  },
  {
    step: '03',
    timestamp: '12.5 s',
    title: 'Structural Lock & Rotor Spool-Up',
    mechanicalState: 'Acoustic-Ducted Hover Readiness',
    summary:
      'Dual locking pins secure each nacelle with 14-ton shear resistance. All eight counter-rotating coaxial motors spool to synchronous hover RPM while wheel drive disconnects.',
    metrics: {
      wingSpan: '4,120 mm',
      rotorPitch: '14.2° (Armed)',
      groundClearance: '190 mm',
      powerDraw: '320 kW',
    },
  },
  {
    step: '04',
    timestamp: '18.0 s',
    title: 'Vertical Ascent & Vector Cruise',
    mechanicalState: 'Full eVTOL Flight Regime',
    summary:
      'Aero X lifts smoothly off the tarmac at up to 6.5 m/s vertical climb rate, tilting its rear ducts forward as it merges effortlessly into the 400-meter urban skyway.',
    metrics: {
      wingSpan: '4,120 mm',
      rotorPitch: '28.5° (Climb)',
      groundClearance: '400,000 mm',
      powerDraw: '890 kW',
    },
  },
];

export const SPECIFICATION_LEDGER = [
  {
    category: 'Propulsion & Energy',
    items: [
      {
        parameter: 'Flight Architecture',
        value: '4 × Coaxial Ducted Electric Fans (8 Independent Motors)',
      },
      {
        parameter: 'Road Drivetrain',
        value: 'Dual-Axle Permanent Magnet Synchronous AWD',
      },
      {
        parameter: 'Battery Chemistry',
        value: '142 kWh Solid-State Lithium-Silicon (420 Wh/kg)',
      },
      {
        parameter: 'System Voltage & Charging',
        value: '1,000V Architecture · 800 kW Ultra-Fast DC (10–80% in 11.5 min)',
      },
    ],
  },
  {
    category: 'Performance Envelope',
    items: [
      {
        parameter: 'Aerial Cruise / Max Speed',
        value: '340 km/h Cruise · 385 km/h Maximum Level Flight',
      },
      {
        parameter: 'Ground Acceleration & Top Speed',
        value: '0–100 km/h in 2.6 s · 290 km/h Electronically Governed',
      },
      {
        parameter: 'Operating Ceiling & Climb Rate',
        value: '2,400 m Service Ceiling · 6.5 m/s Vertical Ascent',
      },
      {
        parameter: 'Payload & Seating Capacity',
        value: '2+2 Executive Lounge Cabin · 340 kg Useful Payload',
      },
    ],
  },
  {
    category: 'Avionics & Safety Systems',
    items: [
      {
        parameter: 'Flight Control Redundancy',
        value: 'Triple-Modular Fly-By-Wire with Optical Data Bus',
      },
      {
        parameter: 'Sensor Suite',
        value: '4 × Solid-State Imaging LiDAR · Millimeter-Wave Radar · Thermal IR',
      },
      {
        parameter: 'Emergency Recovery',
        value: 'Single-Duct Out Hover Capability + Whole-Airframe Ballistic Parachute',
      },
      {
        parameter: 'Chassis Construction',
        value: 'Autoclaved Carbon-Titanium Monocoque Cell',
      },
    ],
  },
];
