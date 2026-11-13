import React, { useState, useEffect, useRef } from 'react';
import { PortfolioContext } from './PortfolioContext.jsx';
import Navbar from './components/sections/Navbar.jsx';
import HomeSection from './components/sections/HomeSection.jsx';
import AboutSection from './components/sections/AboutSection.jsx';
import SkillsSection from './components/sections/SkillsSection.jsx';
import ProjectsSection from './components/sections/ProjectsSection.jsx';
import LabSection from './components/sections/LabSection.jsx';
import ExperienceSection from './components/sections/ExperienceSection.jsx';
import CertificationsSection from './components/sections/CertificationsSection.jsx';
import ContactSection from './components/sections/ContactSection.jsx';
import FooterSection from './components/sections/FooterSection.jsx';
import SolderCursor from './components/SolderCursor.jsx';
import {
  Plus, Pencil, Trash2, Upload, Save, X
} from 'lucide-react';

// ================= DEFAULT DATA (dipakai saat pertama kali dibuka) =================

const PROJECTS_DEFAULT = [
  {
    id: 'gateway-modbus-mqtt',
    title: 'Industrial Multi-Protocol Smart Gateway',
    subtitle: 'Modbus RTU to MQTT/Cloud Edge Translator',
    category: 'Industrial Automation',
    tags: ['ESP32', 'Modbus RTU', 'MQTT', 'RS485', 'C/C++', 'FreeRTOS'],
    overview: 'A robust industrial gateway designed to bridge legacy RS485 Modbus RTU PLC equipment with modern cloud telemetry platforms via encrypted MQTT over Wi-Fi/Ethernet.',
    problem: 'Industrial facilities operated legacy energy meters and sensors that lacked cloud connectivity, requiring expensive manual logging or complete infrastructure overhauls.',
    objective: 'Develop an isolated, cost-effective industrial edge device capable of polling up to 32 RS485 slave devices simultaneously and publishing structured JSON telemetry with sub-second latency.',
    architecture: 'RS485 Transceiver (MAX13487 with auto-direction) -> ESP32 Dual-Core (Task 1: Modbus Polling, Task 2: MQTT Publish & TLS) -> AWS IoT Core / Private Broker -> Grafana Dashboard.',
    hardwareBOM: ['ESP32-WROOM-32U Microcontroller', 'MAX13487 EESA isolated RS485 Transceiver', 'B0505S-1W Galvanic Isolated Power Module', 'Optocoupler PC817 for signal isolation', 'Din-rail mountable ABS Enclosure'],
    softwareStack: ['Embedded C++', 'FreeRTOS Tasks', 'PubSubClient MQTT', 'ModbusMaster Library', 'Node-RED', 'Docker Edge'],
    implementation: 'Engineered a custom 2-layer PCB with power isolation to prevent ground loops in industrial environments. Software utilizes task queueing in FreeRTOS to ensure Modbus timing constraints are never missed during Wi-Fi reconnects.',
    testingResults: 'Maintained 99.98% uptime in a high-EMF manufacturing plant over a 6-month continuous trial with 0 dropped frames.',
    responsibilities: ['PCB schematic design and thermal layout in EasyEDA', 'FreeRTOS firmware implementation in Embedded C++', 'Field installation and Modbus slave address mapping', 'Integration testing with Schneider and Omron PLCs']
  },
  {
    id: 'maritime-telemetry',
    title: 'Autonomous Maritime Telemetry & Vessel Tracker',
    subtitle: 'J1939 CAN Bus to Satellite/Cellular Bridge',
    category: 'Maritime IoT',
    tags: ['STM32', 'CAN Bus', 'J1939', 'GPS/GNSS', 'Cellular IoT', 'Satellite'],
    overview: 'An offshore vessel monitoring hardware system that reads engine parameters directly from CAN Bus J1939 and transmits position and health status to coastal servers.',
    problem: 'Marine vessels face engine downtime due to undetected overheating or oil pressure drops when out of cellular range.',
    objective: 'Build an IP67 marine-grade logger that automatically switches between cellular LTE-M and Iridium Satellite link depending on shore proximity.',
    architecture: 'Marine Diesel Engine J1939 Port -> MCP2515 CAN Controller -> STM32F4 Cortex-M4 -> SIM7080G Modem -> Azure IoT Hub / InfluxDB.',
    hardwareBOM: ['STM32F407VGT6 ARM Cortex-M4', 'MCP2515 CAN Controller + TJA1050 Transceiver', 'SIM7080G Cat-M1/NB-IoT/GNSS Module', 'Iridium SBD 9603N Satellite Transceiver', 'IP67 Aluminum Waterproof Enclosure'],
    softwareStack: ['STM32CubeHAL', 'Embedded C', 'J1939 Protocol Parser', 'MQTT-SN over Satellite', 'Python Data Pipeline'],
    implementation: 'Decoded marine engine diagnostics (RPM, coolant temp, fuel rate, oil pressure) using a low-footprint J1939 frame parser. Implemented dynamic payload compression for satellite bandwidth cost optimization.',
    testingResults: 'Successfully deployed on 3 offshore supply vessels with seamless handover between cellular and satellite telemetry during 500+ nautical miles of sea trials.',
    responsibilities: ['Engineered marine-grade PCB with reverse polarity & surge protection', 'Implemented CAN Bus J1939 frame decoding algorithms', 'Designed power management sleep modes for battery backup', 'Conducted harbor and sea trial validation testing']
  },
  {
    id: 'rfid-access-control',
    title: 'Smart RFID Access Control & Edge Node',
    subtitle: 'Offline-First Door Controller with REST Sync',
    category: 'RFID & Access Control',
    tags: ['ESP32', 'PN532 RFID', 'Wiegand', 'SQLite', 'WebSockets', 'REST API'],
    overview: 'An enterprise multi-door access controller supporting RFID badges, NFC smartphones, and local encrypted edge credential verification.',
    problem: 'Cloud-dependent access systems fail or cause long entry delays when internet connection drops.',
    objective: 'Create an offline-first access node capable of validating badges in <100ms using local flash cache while syncing logs seamlessly upon reconnection.',
    architecture: 'PN532 NFC Module -> Wiegand Interface -> ESP32-S3 -> Local SPIFFS SQLite DB -> Relay Output / Electro-lock -> Cloud REST API.',
    hardwareBOM: ['ESP32-S3-WROOM-1', 'PN532 NFC/RFID Reader Module', 'Solid State Relay (SSR) 10A for Solenoid Lock', 'Piezo Buzzer & RGB LED Status Indicators', 'Optically Isolated Wiegand Input Ports'],
    softwareStack: ['C++', 'Arduino Framework', 'LittleFS / SQLite3 Embedded', 'AsyncTCP', 'React Dashboard'],
    implementation: 'Implemented AES-128 encryption for stored user hashes. Designed an intuitive web portal served directly from the ESP32 for local network administration and badge registration.',
    testingResults: 'Achieved 42ms unlock latency and handled simulated network outage for 14 days without credential verification failure.',
    responsibilities: ['Complete hardware prototyping and PCB fabrication', 'C++ web server and WebSocket push controller implementation', 'Security auditing for credential store on SPI flash', 'Integration with magnetic door strikes and request-to-exit buttons']
  },
  {
    id: 'fuzzy-hvac-controller',
    title: 'Automated Climate Controller with Fuzzy Logic',
    subtitle: 'STM32 Environmental HVAC Optimization Controller',
    category: 'IoT & Embedded Systems',
    tags: ['STM32', 'Fuzzy Logic', 'SHT31', 'PID', 'Industrial HVAC', 'Modbus'],
    overview: 'An intelligent environmental control board that uses Fuzzy Sugeno inference to adjust fan speeds and cooling valves dynamically based on temperature and humidity rate of change.',
    problem: 'Standard ON/OFF or basic PID controllers lead to frequent compressor cycling and high energy spikes in cleanroom environments.',
    objective: 'Reduce temperature oscillations and lower energy consumption by 15% through multi-input Fuzzy logic control.',
    architecture: 'Industrial SHT31 Sensors -> STM32F103 -> Fuzzy Sugeno Engine -> 0-10V Analog Output / PWM Driver -> Variable Frequency Drives.',
    hardwareBOM: ['STM32F103C8T6 (Blue Pill) MCU', 'High-precision SHT31 Air Sensor Module', 'DAC7571 12-Bit I2C DAC for 0-10V control', '4-20mA Current Loop Transmitter Circuit', 'OLED 128x64 Local Status Display'],
    softwareStack: ['Embedded C', 'Custom Fuzzy Logic Library', 'STM32 LL Drivers', 'FreeRTOS'],
    implementation: 'Programmed membership functions for Temperature Error and Delta-Error into an embedded C lookup table, enabling ultra-fast inference on low-power microcontrollers.',
    testingResults: 'Reduced cleanroom temperature variation to within +/- 0.3 deg C and achieved an estimated 18.4% reduction in compressor duty cycles.',
    responsibilities: ['Fuzzy mathematical model formulation and tuning', 'Firmware implementation of Sugeno defuzzification algorithm', 'Analog circuit design for 0-10V industrial drive interface']
  },
  {
    id: 'custom-power-relay-pcb',
    title: 'Custom Isolated Dual-Channel Power Board',
    subtitle: 'High-Voltage Relay Module with Thermal Management',
    category: 'Hardware Development',
    tags: ['PCB Design', 'EasyEDA', 'SMD Assembly', 'High Voltage', 'Optocoupler', 'Surge Protection'],
    overview: 'A high-reliability dual-channel 250V AC relay controller board designed specifically for heavy inductive loads like industrial pumps and solenoids.',
    problem: 'Off-the-shelf relay modules frequently freeze microcontrollers due to inductive kickback voltage spikes and lack true creepage/clearance distance.',
    objective: 'Design a high-voltage PCB adhering to IPC-2221 standards with optocoupler isolation, snubber circuits, and onboard flyback diodes.',
    architecture: 'Microcontroller 3.3V Logic -> Optocoupler PC817 -> Transistor Driver -> High-Current 16A Relay -> RC Snubber -> AC Load.',
    hardwareBOM: ['Omron G5Q-14 12VDC Relays (16A 250VAC rated)', 'PC817 Optoisolators', 'MOV (Metal Oxide Varistor) Transient Suppressors', 'Custom Flame-Retardant FR4 2-Layer PCB (2oz Copper)'],
    softwareStack: ['EasyEDA Pro PCB Suite', 'KiCad PCB Viewer', 'Thermal Simulation Tools'],
    implementation: 'Designed PCB with milled air slots between high-voltage contacts and low-voltage MCU traces to guarantee 5mm creepage distance. Built and hand-soldered prototype batches using SMD reflow techniques.',
    testingResults: 'Tested up to 2000V AC isolation breakdown voltage. Operated continuous 12A inductive pump motor switching without triggering MCU reset.',
    responsibilities: ['IPC-compliant PCB layout, routing, and thermal relief modeling', 'SMD stencil preparation and solder paste reflow assembly', 'Bench test validation with high-voltage oscilloscope and isolation tester']
  },
  {
    id: 'plc-node-red-dashboard',
    title: 'Industrial Automation & Supervisory Node',
    subtitle: 'Siemens/Schneider PLC Integration via Node-RED',
    category: 'System Integration',
    tags: ['Siemens S7', 'Node-RED', 'Docker', 'Grafana', 'InfluxDB', 'OPC-UA'],
    overview: 'A centralized supervisory monitoring system that aggregates operational metrics from multiple PLC brands across a factory floor into unified real-time dashboards.',
    problem: 'Siloed industrial machinery from different vendors (Siemens S7, Schneider M221) made facility-wide throughput tracking nearly impossible.',
    objective: 'Consolidate industrial data protocols (S7 Communication, Modbus TCP, OPC-UA) into an edge server running automated anomaly alerts.',
    architecture: 'Industrial PLCs -> Industrial Ethernet Switch -> Edge Gateway (Node-RED on Industrial PC) -> InfluxDB Time-Series -> Grafana Dashboard.',
    hardwareBOM: ['Industrial Din-Rail PC (Intel N4500, Dual LAN)', 'Siemens S7-1200 PLC', 'Schneider Modicon M221 PLC', 'Managed Gigabit Industrial Ethernet Switch'],
    softwareStack: ['Node-RED', 'node-red-contrib-s7', 'OPC-UA Client', 'Grafana', 'Docker Compose', 'Linux Ubuntu Core'],
    implementation: 'Configured automated payload pipelines in Node-RED to normalize register mapping from various vendor PLCs into standard JSON schemas pushed into InfluxDB.',
    testingResults: 'Unified 450+ physical I/O tags across 4 plant zones into sub-second visual dashboards with automated Telegram alerting for critical fault conditions.',
    responsibilities: ['PLC communication driver configuration and tag mapping', 'Node-RED flow logic and error-recovery script authoring', 'Docker container deployment and system administration']
  }
];

const SKILLS_GROUPS_DEFAULT = [
  { category: 'Embedded Systems', skills: [
    ['ESP32 / ESP-IDF', 'Advanced', 'Dual-core processing, FreeRTOS, Wi-Fi/BT stacks, low power modes'],
    ['STM32 / Cortex-M', 'Advanced', 'STM32CubeMX, HAL drivers, DMA, timers, interrupts, Bare-metal'],
    ['Raspberry Pi / Linux', 'Intermediate', 'Single-board computers, GPIO control, systemd, Python scripting'],
    ['Arduino Platform', 'Expert', 'Rapid prototyping, custom library authoring, sensor interfacing'],
    ['Embedded C / C++', 'Expert', 'Pointers, memory management, bitwise operations, task scheduling'],
    ['FreeRTOS', 'Advanced', 'Mutexes, semaphores, queues, task priorities, real-time control'] ] },
  { category: 'Industrial Automation', skills: [
    ['Schneider PLC', 'Intermediate', 'SoMachine, Machine Expert Basic, ladder logic, hardware IO setup'],
    ['Siemens S7 PLC', 'Intermediate', 'TIA Portal, S7 communication, DB blocks, industrial ladder logic'],
    ['Omron PLC', 'Intermediate', 'CX-Programmer, Sysmac Studio, automated sequential controls'],
    ['Modbus RTU / TCP', 'Expert', 'RS485 differential signaling, function codes, custom master/slave stacks'],
    ['Industrial Sensors', 'Expert', '4-20mA current loops, 0-10V analog transducers, proximity, optical'],
    ['RS485 / Industrial Fieldbus', 'Expert', 'Termination resistors, surge suppression, differential noise isolation'] ] },
  { category: 'IoT & Communication', skills: [
    ['MQTT / MQTTS', 'Expert', 'QoS levels, dynamic topic hierarchies, TLS security, brokers (EMQX, Mosquitto)'],
    ['CAN Bus / J1939', 'Advanced', 'Automotive & marine telemetry, frame arbitration, DBC decoding'],
    ['UART / SPI / I2C', 'Expert', 'Hardware bus protocols, timing diagrams, logic analyzer debugging'],
    ['HTTP / REST APIs', 'Advanced', 'JSON web services, webhooks, cURL, async server integration'],
    ['Node-RED', 'Expert', 'Data flow wiring, dashboard creation, custom function nodes, MQTT flows'],
    ['TCP/IP Sockets', 'Advanced', 'Raw socket communication, packet inspection, cellular modem AT commands'] ] },
  { category: 'Hardware Development', skills: [
    ['PCB Design (EasyEDA / Altium)', 'Advanced', 'Schematics design, 2/4-layer routing, ground planes, DRC compliance'],
    ['SMD Prototyping & Soldering', 'Advanced', 'Hot air rework, 0805/0603 passive soldering, QFN packages'],
    ['Hardware Debugging', 'Expert', 'Oscilloscope measurements, logic analyzers, multimeter diagnostics'],
    ['Electrical Wiring', 'Expert', 'Control panel assembly, DIN-rail terminal layout, cable crimping'],
    ['Power Circuit Design', 'Advanced', 'LDO regulators, Buck converters, galvanic isolation, snubber circuits'],
    ['Rapid Prototyping', 'Expert', 'Breadboard to stripboard to custom PCB rapid iteration cycles'] ] },
  { category: 'Software & Integration', skills: [
    ['JavaScript / Node.js', 'Advanced', 'Backend services, serialport integration, express APIs'],
    ['Python', 'Advanced', 'Data parsing, automation scripts, Matplotlib telemetry plotting'],
    ['Linux / Embedded OS', 'Advanced', 'Bash scripting, systemd service management, SSH, Cron'],
    ['Git / Version Control', 'Advanced', 'Branching workflows, hardware release tags, release documentation'],
    ['Docker / Edge Deployments', 'Intermediate', 'Containerizing Node-RED, Mosquitto, and InfluxDB for edge PCs'] ] }
];

const SKILLS_DEFAULT = SKILLS_GROUPS_DEFAULT.flatMap((g, gi) =>
  g.skills.map(([name, level, desc], si) => ({ id: `sk-${gi}-${si}`, category: g.category, name, level, desc }))
);

const LAB_DEFAULT = [
  { id: 'lab-1', title: 'Custom Dual-Layer PCB Layout', category: 'PCB', image: '', description: 'EasyEDA Pro design for an isolated RS485 ESP32 edge gateway with copper fills and 3.3V/5V split ground planes.' },
  { id: 'lab-2', title: 'SMD Solder Reflow & Assembly Lab', category: 'Prototyping', image: '', description: 'Precision hot-air soldering station setup for fine-pitch QFN chips and 0603 SMD components testing.' },
  { id: 'lab-3', title: 'Industrial PLC Control Panel Assembly', category: 'Wiring', image: '', description: 'Structured DIN-rail mounting, ferrules crimping, and 24V DC power distribution for a factory automation rack.' },
  { id: 'lab-4', title: 'Oscilloscope Logic & SPI Bus Analysis', category: 'Testing', image: '', description: 'Analyzing SPI clock line integrity and frame jitter using Rigol Digital Storage Oscilloscope.' },
  { id: 'lab-5', title: 'Maritime Field Device Waterproofing & Testing', category: 'Field', image: '', description: 'IP67 enclosure assembly with waterproof PG cable glands undergoing thermal chamber and water submersion tests.' },
  { id: 'lab-6', title: 'Node-RED Edge Telemetry Supervisory Panel', category: 'Dashboard', image: '', description: 'Real-time telemetry interface showing live Modbus registers, MQTT packet rate, and node connection state.' }
];

const EXPERIENCE_DEFAULT = [
  {
    id: 'exp-1', title: 'IoT & Hardware Systems Engineer', company: 'Industrial Connectivity Solutions Ltd.', period: '2022 - Present', type: 'Full-time', location: 'Surabaya / Remote',
    responsibilities: [
      'Spearheaded the complete end-to-end development of custom ESP32 and STM32 industrial edge gateways.',
      'Designed over 15+ custom PCB schematics and layouts, supervising SMD prototyping and field reliability testing.',
      'Configured Modbus RTU, RS485, and CAN Bus interfaces for seamless communication with Schneider & Siemens PLCs.',
      'Implemented secure MQTT and HTTPS communication protocols pushing field sensor telemetry to AWS IoT and local dashboards.',
      'Reduced average hardware failure rate by 34% by implementing optoisolated inputs and MOV surge protection.'
    ],
    tech: ['ESP32', 'STM32', 'Modbus', 'RS485', 'PCB Design', 'MQTT', 'Node-RED', 'FreeRTOS']
  },
  {
    id: 'exp-2', title: 'Embedded Systems & Firmware Developer', company: 'Smart Automation Technologies', period: '2020 - 2022', type: 'Full-time', location: 'Bandung, Indonesia',
    responsibilities: [
      'Developed C/C++ firmware for wireless RFID access control systems and automated environmental monitoring.',
      'Integrated GSM/Cellular (SIM7080G) and GNSS modules for remote vessel tracking and fleet management.',
      'Created automated firmware testing scripts in Python to validate UART/SPI peripheral hardware responses.',
      'Collaborated with client engineering teams to integrate custom hardware nodes into existing enterprise databases.'
    ],
    tech: ['Embedded C++', 'STM32', 'RFID/NFC', 'Cellular IoT', 'Python', 'Arduino', 'SPI/I2C']
  },
  {
    id: 'exp-3', title: 'Hardware Development & Electronics Technician', company: 'Robotics & Microelectronics Lab', period: '2018 - 2020', type: 'Project-based', location: 'Indonesia',
    responsibilities: [
      'Assembled and tested custom micro-controller circuit boards for academic and industrial research prototypes.',
      'Maintained lab equipment, performed board troubleshooting, micro-soldering rework, and component sourcing.',
      'Designed basic 2-layer PCBs using EasyEDA and assisted in field wiring installations.'
    ],
    tech: ['PCB Fabrication', 'Oscilloscope', 'Soldering', 'Microcontrollers', 'Sensor Interfacing']
  }
];

const BADGE_COLORS = {
  'Blue - Cyan': 'from-blue-600 to-cyan-600',
  'Teal - Emerald': 'from-teal-600 to-emerald-600',
  'Cyan - Indigo': 'from-cyan-600 to-indigo-600',
  'Orange - Rose': 'from-orange-500 to-rose-600',
  'Violet - Fuchsia': 'from-violet-600 to-fuchsia-600'
};

const CERTS_DEFAULT = [
  { id: 'cert-1', title: 'Cisco Certified Network Associate (CCNA)', issuer: 'Cisco Networking Academy', date: '', credentialId: 'CCNA-8849201', description: 'Routing and switching protocols, IPv4/IPv6 subnetting, TCP/IP networking, VLANs, and network security foundations crucial for connected IoT gateways.', badgeColor: 'from-blue-600 to-cyan-600' },
  { id: 'cert-2', title: 'Fullstack Web Developer Certification', issuer: 'National Technology Academy', date: '', credentialId: 'FSWD-992811', description: 'Comprehensive Web Development stack including Node.js, Express, REST APIs, JavaScript (ES6+), WebSockets, and modern web user interfaces for IoT monitoring.', badgeColor: 'from-teal-600 to-emerald-600' },
  { id: 'cert-3', title: 'Access Network Planner (BNSP Certified)', issuer: 'National Professional Certification Agency (BNSP)', date: '', credentialId: 'BNSP-TEL-2022-0491', description: 'State-certified competency in telecommunications access planning, fiber optic network design, wireless transmission links, and field infrastructure.', badgeColor: 'from-cyan-600 to-indigo-600' }
];

const STORAGE_KEYS = {
  projects: 'tpn.projects.v1',
  skills: 'tpn.skills.v1',
  lab: 'tpn.lab.v1',
  experience: 'tpn.experience.v1',
  certs: 'tpn.certs.v1',
  siteContent: 'tpn.siteContent.v1'
};

const SITE_CONTENT_DEFAULT = {
  home: {
    roleLabel: 'IoT Engineer & Hardware Development Engineer',
    headlinePrefix: 'Engineering Connected Systems Through ',
    headlineHighlight: 'IoT & Innovation.',
    fullName: 'Trio Prawiro Negoro',
    intro: 'I specialize in bridging physical hardware and cloud software through robust embedded systems, industrial communication protocols, custom PCB design, and edge telemetry.',
    profileCategory: 'IoT & Embedded Systems',
    profileSubtitle: 'Engineer · Hardware Developer'
  },
  about: {
    eyebrow: 'Engineering Background & Philosophy',
    headline: 'Bridging Physical Signals to Cloud Systems',
    paragraphOneLead: 'I am an IoT Engineer and Hardware Developer',
    paragraphOneTail: ' with experience in engineering end-to-end connected systems. My work spans the entire development cycle—from breadboard prototypes and PCB schematic routing to C/C++ firmware development, RS485/Modbus field integration, and cloud MQTT telemetry dashboards.',
    paragraphTwoLead: 'Having deployed hardware in industrial manufacturing plants and maritime environments, I understand that real-world IoT is about ',
    paragraphTwoHighlight: 'field reliability, electrical isolation, and fault-tolerant firmware',
    paragraphTwoTail: '—not just flashing an LED on a bench.',
    primaryMcus: 'ESP32, STM32, PLC',
    protocols: 'Modbus, CAN Bus, MQTT',
    features: [
      { title: '1. Robust Hardware Design', description: 'Designing custom multi-layer PCBs with galvanic power isolation, MOV transient suppression, optocouplers, and IPC-standard trace separation for noisy electromagnetic environments.' },
      { title: '2. Non-Blocking Firmware', description: 'Writing efficient C/C++ firmware utilizing FreeRTOS task queues, state machines, and hardware interrupt handlers to prevent network lockups and data loss.' },
      { title: '3. System Integration & Edge Analytics', description: 'Deploying Node-RED flows, Docker edge containers, and real-time supervisory dashboards (Grafana) to aggregate telemetry across disparate industrial machinery brands.' }
    ]
  },
  contact: {
    eyebrow: 'Initiate Connectivity',
    headline: "Let's Build Something Connected.",
    description: 'Open to engineering opportunities, industrial IoT consulting, hardware prototyping, and custom embedded systems development.',
    email: 'prawironegorotrio@gmail.com',
    linkedinUrl: 'https://linkedin.com',
    linkedinText: 'https://www.linkedin.com/in/trio-prawiro-negoro-698704224',
    githubUrl: 'https://github.com',
    githubText: 'github.com/trioprawiro'
  }
};

// ================= HELPERS =================

function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Gagal menyimpan ke localStorage (mungkin penuh):', e);
    }
  }, [key, value]);
  return [value, setValue];
}

const uid = (p) => `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
const splitComma = (s) => (s || '').split(',').map((x) => x.trim()).filter(Boolean);
const splitLines = (s) => (s || '').split('\n').map((x) => x.trim()).filter(Boolean);

// resize gambar agar localStorage tidak cepat penuh
function fileToResizedDataUrl(file, maxSize = 1000, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}

const inputCls = 'w-full bg-[#0d1322] text-sm text-white px-3 py-2.5 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-600';

// ================= REUSABLE UI =================

function AddButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-xs font-semibold transition-all hover:scale-105 active:scale-95"
    >
      <Plus className="w-4 h-4" />
      {children}
    </button>
  );
}

function EditButton({ onClick, className = '', label = 'Edit' }) {
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      title={label}
      aria-label={label}
      className={`p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-500 hover:text-cyan-400 hover:border-cyan-500/50 transition-all ${className}`}
    >
      <Pencil className="w-3.5 h-3.5" />
    </button>
  );
}

function DeleteButton({ onClick, className = '' }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      title="Hapus"
      className={`p-1.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-500 hover:text-rose-400 hover:border-rose-500/50 transition-all ${className}`}
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );
}

// Modal form generik. fields: {name,label,type,options,required,placeholder,hint,showIf,datalist}
function FormModal({ title, fields, initialValues, onSubmit, onClose }) {
  const [values, setValues] = useState(() => {
    const v = { ...initialValues };
    fields.forEach((f) => { v[f.name] = initialValues?.[f.name] ?? f.default ?? (f.multiple ? [] : ''); });
    return v;
  });
  const [busy, setBusy] = useState(false);
  const set = (name, val) => setValues((prev) => ({ ...prev, [name]: val }));

  const handleFile = async (field, fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    for (const file of files) {
      const isPdf = file.type === 'application/pdf';
      const isImage = file.type.startsWith('image/');
      if (!isImage && !(field.acceptPdf && isPdf)) {
        alert('Pilih file gambar atau PDF.');
        return;
      }
      if (isPdf && file.size > field.maxSizeBytes) {
        alert('Ukuran PDF maksimal 1 MB.');
        return;
      }
    }

    setBusy(true);
    try {
      const dataUrls = await Promise.all(files.map((file) => (
        file.type.startsWith('image/') ? fileToResizedDataUrl(file) : fileToDataUrl(file)
      )));
      setValues((prev) => ({
        ...prev,
        [field.name]: field.multiple
          ? [...(Array.isArray(prev[field.name]) ? prev[field.name] : []), ...dataUrls]
          : dataUrls[0],
        ...(field.storeMetadata ? {
          [`${field.name}Type`]: files[0].type === 'application/pdf' ? 'application/pdf' : 'image/jpeg',
          [`${field.name}Name`]: files[0].type === 'application/pdf' ? files[0].name : files[0].name.replace(/\.[^.]+$/, '.jpg')
        } : {})
      }));
    } catch {
      alert('Gagal membaca file.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <form
        onSubmit={(e) => { e.preventDefault(); onSubmit(values); }}
        className="bg-[#0b0f19] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl"
      >
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {initialValues ? <Pencil className="w-5 h-5 text-cyan-400" /> : <Plus className="w-5 h-5 text-cyan-400" />} {title}
          </h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          {fields.map((f) => {
            if (f.showIf && !f.showIf(values)) return null;
            const label = (
              <label className="block text-[11px] font-mono text-slate-400 mb-1.5 uppercase">
                {f.label}{f.required && ' *'}
              </label>
            );
            let control;
            if (f.type === 'textarea') {
              control = (
                <textarea rows={f.rows || 3} required={f.required} value={values[f.name]} placeholder={f.placeholder}
                  onChange={(e) => set(f.name, e.target.value)} className={`${inputCls} resize-y`} />
              );
            } else if (f.type === 'select') {
              control = (
                <select required={f.required} value={values[f.name]} onChange={(e) => set(f.name, e.target.value)} className={inputCls}>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              );
            } else if (f.type === 'file') {
              const previews = f.multiple
                ? (Array.isArray(values[f.name]) ? values[f.name] : [])
                : values[f.name] ? [values[f.name]] : [];
              control = (
                <div className="space-y-2">
                  <label className="flex items-center justify-center gap-2 px-3 py-3 rounded-lg border border-dashed border-slate-600 hover:border-cyan-500 text-xs text-slate-400 hover:text-cyan-400 cursor-pointer transition-all">
                    <Upload className="w-4 h-4" /> {busy ? 'Memproses...' : f.buttonLabel || 'Pilih gambar dari komputer'}
                    <input type="file" accept={f.accept || 'image/*'} multiple={f.multiple} className="hidden" onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      e.target.value = '';
                      handleFile(f, files);
                    }} />
                  </label>
                  {previews.length > 0 && (
                    <div className={f.multiple ? 'grid grid-cols-2 sm:grid-cols-3 gap-2' : 'relative'}>
                      {previews.map((preview, index) => (
                        <div key={index} className="relative">
                          {values[`${f.name}Type`] === 'application/pdf' ? (
                            <div className="p-3 rounded-lg border border-slate-800 bg-slate-900 text-xs text-slate-300">
                              File PDF siap disimpan: {values[`${f.name}Name`]}
                            </div>
                          ) : (
                            <img src={preview} alt={`Pratinjau ${f.label} ${index + 1}`} className="w-full h-28 object-cover rounded-lg border border-slate-800" />
                          )}
                          <button type="button" onClick={() => setValues((prev) => ({
                            ...prev,
                            [f.name]: f.multiple ? prev[f.name].filter((_, i) => i !== index) : '',
                            ...(f.storeMetadata ? { [`${f.name}Type`]: '', [`${f.name}Name`]: '' } : {})
                          }))} aria-label={`Hapus foto ${index + 1}`} className="absolute top-2 right-2 p-1 rounded bg-black/70 text-white">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              const listId = f.datalist ? `dl-${f.name}` : undefined;
              control = (
                <>
                  <input type="text" required={f.required} value={values[f.name]} placeholder={f.placeholder} list={listId}
                    onChange={(e) => set(f.name, e.target.value)} className={inputCls} />
                  {f.datalist && (
                    <datalist id={listId}>
                      {f.datalist.map((o) => <option key={o} value={o} />)}
                    </datalist>
                  )}
                </>
              );
            }
            return (
              <div key={f.name}>
                {label}
                {control}
                {f.hint && <p className="text-[10px] text-slate-500 mt-1">{f.hint}</p>}
              </div>
            );
          })}
        </div>

        <div className="p-5 border-t border-slate-800 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200">
            Batal
          </button>
          <button type="submit" disabled={busy} className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 disabled:opacity-50">
            <Save className="w-4 h-4" /> Simpan
          </button>
        </div>
      </form>
    </div>
  );
}

// ================= MAIN APP =================

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('All');
  const [labFilter, setLabFilter] = useState('All');
  const [selectedLabImage, setSelectedLabImage] = useState(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [skillSearch, setSkillSearch] = useState('');
  const [addModal, setAddModal] = useState(null); // 'skill' | 'project' | 'lab' | 'experience' | 'cert'
  const [editTarget, setEditTarget] = useState(null);

  // Data (tersimpan di localStorage)
  const [projects, setProjects] = usePersisted(STORAGE_KEYS.projects, PROJECTS_DEFAULT);
  const [skills, setSkills] = usePersisted(STORAGE_KEYS.skills, SKILLS_DEFAULT);
  const [labItems, setLabItems] = usePersisted(STORAGE_KEYS.lab, LAB_DEFAULT);
  const [experience, setExperience] = usePersisted(STORAGE_KEYS.experience, EXPERIENCE_DEFAULT);
  const [certs, setCerts] = usePersisted(STORAGE_KEYS.certs, CERTS_DEFAULT);
  const [siteContent, setSiteContent] = usePersisted(STORAGE_KEYS.siteContent, SITE_CONTENT_DEFAULT);

  const canvasRef = useRef(null);

  const openAddModal = (type) => {
    setEditTarget(null);
    setAddModal(type);
  };
  const openEditModal = (type, item) => {
    setEditTarget({ type, item });
    setAddModal(type);
  };
  const closeFormModal = () => {
    setAddModal(null);
    setEditTarget(null);
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id], footer[id]');
    if (!('IntersectionObserver' in window)) {
      sections.forEach((section) => section.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    sections.forEach((section) => {
      section.classList.add('scroll-reveal');
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);
    const onResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', onResize);
    const nodes = Array.from({ length: 35 }, () => ({
      x: Math.random() * width, y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      radius: Math.random() * 2 + 1.5, pulse: Math.random() * Math.PI
    }));
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.25)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
      for (let y = 0; y < height; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }
      nodes.forEach((node, i) => {
        node.x += node.vx; node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
        node.pulse += 0.03;
        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + Math.sin(node.pulse) * 0.8, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < nodes.length; j++) {
          const o = nodes[j];
          const dx = o.x - node.x, dy = o.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.strokeStyle = `rgba(59, 130, 246, ${1 - dist / 130})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(node.x + dx / 2, node.y);
            ctx.lineTo(node.x + dx / 2, o.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(render);
    };
    render();
    return () => { window.removeEventListener('resize', onResize); cancelAnimationFrame(raf); };
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ---------- derived ----------
  const projectCategories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];
  const filteredProjects = projectCategoryFilter === 'All' ? projects : projects.filter((p) => p.category === projectCategoryFilter);
  const labCategories = ['All', ...Array.from(new Set(labItems.map((i) => i.category)))];
  const filteredLab = labFilter === 'All' ? labItems : labItems.filter((i) => i.category === labFilter);
  const skillCategories = Array.from(new Set(skills.map((s) => s.category)));

  const confirmDelete = (what, fn) => { if (window.confirm(`Hapus "${what}"?`)) fn(); };

  // ---------- add handlers ----------
  const addSkill = (v) => {
    const category = v.category === '__new__' ? v.newCategory.trim() : v.category;
    if (!category) return alert('Nama kategori wajib diisi.');
    setSkills((prev) => [...prev, { id: uid('sk'), category, name: v.name.trim(), level: v.level, desc: v.desc.trim() }]);
    closeFormModal();
  };
  const addProject = (v) => {
    setProjects((prev) => [...prev, {
      id: uid('proj'), title: v.title.trim(), subtitle: v.subtitle.trim(), category: v.category.trim(),
      tags: splitComma(v.tags), overview: v.overview.trim(), problem: v.problem.trim(), objective: v.objective.trim(),
      architecture: v.architecture.trim(), hardwareBOM: splitLines(v.hardwareBOM), softwareStack: splitComma(v.softwareStack),
      implementation: v.implementation.trim(), testingResults: v.testingResults.trim(), responsibilities: splitLines(v.responsibilities),
      images: v.images
    }]);
    closeFormModal();
  };
  const addLab = (v) => {
    setLabItems((prev) => [...prev, { id: uid('lab'), title: v.title.trim(), category: v.category.trim(), description: v.description.trim(), images: v.images }]);
    closeFormModal();
  };
  const addExperience = (v) => {
    setExperience((prev) => [{
      id: uid('exp'), title: v.title.trim(), company: v.company.trim(), period: v.period.trim(), type: v.type,
      location: v.location.trim(), responsibilities: splitLines(v.responsibilities), tech: splitComma(v.tech)
    }, ...prev]);
    closeFormModal();
  };
  const addCert = (v) => {
    setCerts((prev) => [...prev, {
      id: uid('cert'), title: v.title.trim(), issuer: v.issuer.trim(), date: v.date.trim(),
      credentialId: v.credentialId.trim(), description: v.description.trim(), badgeColor: v.badgeColor,
      certificateFile: v.certificateFile, certificateFileType: v.certificateFileType,
      certificateFileName: v.certificateFileName
    }]);
    closeFormModal();
  };

  const updateSkill = (item, v) => {
    const category = v.category === '__new__' ? v.newCategory.trim() : v.category;
    if (!category) return alert('Nama kategori wajib diisi.');
    setSkills((prev) => prev.map((skill) => skill.id === item.id
      ? { ...skill, category, name: v.name.trim(), level: v.level, desc: v.desc.trim() }
      : skill));
    closeFormModal();
  };
  const updateProject = (item, v) => {
    setProjects((prev) => prev.map((project) => project.id === item.id ? {
      ...project, title: v.title.trim(), subtitle: v.subtitle.trim(), category: v.category.trim(),
      tags: splitComma(v.tags), overview: v.overview.trim(), problem: v.problem.trim(), objective: v.objective.trim(),
      architecture: v.architecture.trim(), hardwareBOM: splitLines(v.hardwareBOM), softwareStack: splitComma(v.softwareStack),
      implementation: v.implementation.trim(), testingResults: v.testingResults.trim(),
      responsibilities: splitLines(v.responsibilities), images: v.images
    } : project));
    closeFormModal();
  };
  const updateLab = (item, v) => {
    setLabItems((prev) => prev.map((lab) => lab.id === item.id
      ? { ...lab, title: v.title.trim(), category: v.category.trim(), description: v.description.trim(), images: v.images }
      : lab));
    closeFormModal();
  };
  const updateExperience = (item, v) => {
    setExperience((prev) => prev.map((exp) => exp.id === item.id ? {
      ...exp, title: v.title.trim(), company: v.company.trim(), period: v.period.trim(), type: v.type,
      location: v.location.trim(), responsibilities: splitLines(v.responsibilities), tech: splitComma(v.tech)
    } : exp));
    closeFormModal();
  };
  const updateCert = (item, v) => {
    setCerts((prev) => prev.map((cert) => cert.id === item.id ? {
      ...cert, title: v.title.trim(), issuer: v.issuer.trim(), date: v.date.trim(),
      credentialId: v.credentialId.trim(), description: v.description.trim(), badgeColor: v.badgeColor,
      certificateFile: v.certificateFile, certificateFileType: v.certificateFileType,
      certificateFileName: v.certificateFileName
    } : cert));
    closeFormModal();
  };
  const updateSiteContent = (section, values) => {
    setSiteContent((prev) => ({ ...prev, [section]: { ...prev[section], ...values } }));
    closeFormModal();
  };

  // ---------- form definitions ----------
  const formDefs = {
    skill: {
      title: 'Add Skill',
      onSubmit: addSkill,
      onUpdate: updateSkill,
      toFormValues: (item) => ({ ...item, newCategory: '' }),
      fields: [
        { name: 'category', label: 'Kategori', type: 'select', required: true, default: skillCategories[0] || '__new__',
          options: [...skillCategories.map((c) => ({ value: c, label: c })), { value: '__new__', label: '+ Kategori baru...' }] },
        { name: 'newCategory', label: 'Nama kategori baru', type: 'text', placeholder: 'mis. Cloud & DevOps', showIf: (v) => v.category === '__new__' },
        { name: 'name', label: 'Nama skill', type: 'text', required: true, placeholder: 'mis. Teltonika FMC650' },
        { name: 'level', label: 'Level', type: 'select', default: 'Intermediate',
          options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'].map((l) => ({ value: l, label: l })) },
        { name: 'desc', label: 'Deskripsi singkat', type: 'textarea', rows: 2, placeholder: 'Apa yang dikuasai / pernah dikerjakan' }
      ]
    },
    project: {
      title: 'Add Project',
      onSubmit: addProject,
      onUpdate: updateProject,
      toFormValues: (item) => ({
        ...item, tags: (item.tags || []).join(', '), hardwareBOM: (item.hardwareBOM || []).join('\n'),
        softwareStack: (item.softwareStack || []).join(', '), responsibilities: (item.responsibilities || []).join('\n'),
        images: Array.isArray(item.images) ? item.images : item.image ? [item.image] : []
      }),
      fields: [
        { name: 'title', label: 'Judul project', type: 'text', required: true },
        { name: 'subtitle', label: 'Subjudul', type: 'text', placeholder: 'mis. ESP32 to Hikvision ACS Bridge' },
        { name: 'category', label: 'Kategori', type: 'text', required: true, datalist: projectCategories.filter((c) => c !== 'All'), hint: 'Pilih yang ada atau ketik kategori baru (otomatis jadi filter).' },
        { name: 'tags', label: 'Tags', type: 'text', placeholder: 'ESP32, MQTT, Modbus', hint: 'Pisahkan dengan koma.' },
        { name: 'overview', label: 'Overview', type: 'textarea', required: true },
        { name: 'problem', label: 'Problem statement', type: 'textarea' },
        { name: 'objective', label: 'Engineering objective', type: 'textarea' },
        { name: 'architecture', label: 'System architecture', type: 'textarea', rows: 2, placeholder: 'Sensor -> ESP32 -> MQTT -> Dashboard' },
        { name: 'hardwareBOM', label: 'Hardware BOM', type: 'textarea', rows: 4, hint: 'Satu item per baris.' },
        { name: 'softwareStack', label: 'Software stack', type: 'text', hint: 'Pisahkan dengan koma.' },
        { name: 'implementation', label: 'Implementation', type: 'textarea' },
        { name: 'testingResults', label: 'Testing results', type: 'textarea' },
        { name: 'responsibilities', label: 'Responsibilities', type: 'textarea', rows: 4, hint: 'Satu item per baris.' },
        { name: 'images', label: 'Dokumentasi foto project', type: 'file', multiple: true, default: [], buttonLabel: 'Pilih beberapa foto', hint: 'Pilih beberapa foto sekaligus atau tambahkan lagi. Foto otomatis diperkecil (maks 1000px).' }
      ]
    },
    lab: {
      title: 'Add Lab Artifact',
      onSubmit: addLab,
      onUpdate: updateLab,
      toFormValues: (item) => ({
        ...item, images: Array.isArray(item.images) ? item.images : item.image ? [item.image] : []
      }),
      fields: [
        { name: 'title', label: 'Judul', type: 'text', required: true },
        { name: 'category', label: 'Kategori', type: 'text', required: true, datalist: labCategories.filter((c) => c !== 'All'), hint: 'Pilih yang ada atau ketik baru.' },
        { name: 'description', label: 'Deskripsi', type: 'textarea', required: true },
        { name: 'images', label: 'Foto dokumentasi (opsional)', type: 'file', multiple: true, default: [], buttonLabel: 'Pilih beberapa foto', hint: 'Pilih beberapa foto sekaligus atau tambahkan lagi. Foto otomatis diperkecil (maks 1000px).' }
      ]
    },
    experience: {
      title: 'Add Experience',
      onSubmit: addExperience,
      onUpdate: updateExperience,
      toFormValues: (item) => ({
        ...item, responsibilities: (item.responsibilities || []).join('\n'), tech: (item.tech || []).join(', ')
      }),
      fields: [
        { name: 'title', label: 'Posisi', type: 'text', required: true },
        { name: 'company', label: 'Perusahaan', type: 'text', required: true },
        { name: 'period', label: 'Periode', type: 'text', required: true, placeholder: '2024 - Present' },
        { name: 'type', label: 'Tipe', type: 'select', default: 'Full-time',
          options: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Project-based', 'Internship'].map((t) => ({ value: t, label: t })) },
        { name: 'location', label: 'Lokasi', type: 'text' },
        { name: 'responsibilities', label: 'Tanggung jawab / pencapaian', type: 'textarea', rows: 5, hint: 'Satu poin per baris.' },
        { name: 'tech', label: 'Teknologi', type: 'text', hint: 'Pisahkan dengan koma.' }
      ]
    },
    cert: {
      title: 'Add Certification',
      onSubmit: addCert,
      onUpdate: updateCert,
      toFormValues: (item) => ({ ...item, certificateFile: item.certificateFile || '' }),
      fields: [
        { name: 'title', label: 'Nama sertifikasi', type: 'text', required: true },
        { name: 'issuer', label: 'Penerbit', type: 'text', required: true },
        { name: 'date', label: 'Tanggal / masa berlaku', type: 'text', placeholder: 'mis. Mar 2025' },
        { name: 'credentialId', label: 'Credential ID / No. sertifikat', type: 'text' },
        { name: 'description', label: 'Deskripsi', type: 'textarea' },
        { name: 'certificateFile', label: 'File sertifikat (opsional)', type: 'file', accept: 'image/*,application/pdf', acceptPdf: true, maxSizeBytes: 1024 * 1024, storeMetadata: true, buttonLabel: 'Pilih foto atau PDF', hint: 'Format: foto atau PDF (maksimal 1 MB untuk PDF). Foto akan diperkecil otomatis.' },
        { name: 'badgeColor', label: 'Warna badge', type: 'select', default: Object.values(BADGE_COLORS)[0],
          options: Object.entries(BADGE_COLORS).map(([label, value]) => ({ value, label })) }
      ]
    },
    homeContent: {
      title: 'Edit Home Content',
      onUpdate: (_, values) => updateSiteContent('home', values),
      toFormValues: (content) => content,
      fields: [
        { name: 'roleLabel', label: 'Label profesi', type: 'text', required: true },
        { name: 'headlinePrefix', label: 'Judul utama', type: 'text', required: true },
        { name: 'headlineHighlight', label: 'Teks highlight', type: 'text', required: true },
        { name: 'fullName', label: 'Nama', type: 'text', required: true },
        { name: 'intro', label: 'Deskripsi singkat', type: 'textarea', required: true, rows: 4 },
        { name: 'profileCategory', label: 'Kategori profil', type: 'text', required: true },
        { name: 'profileSubtitle', label: 'Subjudul profil', type: 'text', required: true }
      ]
    },
    aboutContent: {
      title: 'Edit About Content',
      onUpdate: (_, values) => updateSiteContent('about', {
        eyebrow: values.eyebrow, headline: values.headline, paragraphOneLead: values.paragraphOneLead,
        paragraphOneTail: values.paragraphOneTail, paragraphTwoLead: values.paragraphTwoLead,
        paragraphTwoHighlight: values.paragraphTwoHighlight, paragraphTwoTail: values.paragraphTwoTail,
        primaryMcus: values.primaryMcus, protocols: values.protocols,
        features: [1, 2, 3].map((number) => ({
          title: values[`feature${number}Title`], description: values[`feature${number}Description`]
        }))
      }),
      toFormValues: (content) => ({
        eyebrow: content.eyebrow, headline: content.headline, paragraphOneLead: content.paragraphOneLead,
        paragraphOneTail: content.paragraphOneTail, paragraphTwoLead: content.paragraphTwoLead,
        paragraphTwoHighlight: content.paragraphTwoHighlight, paragraphTwoTail: content.paragraphTwoTail,
        primaryMcus: content.primaryMcus, protocols: content.protocols,
        ...content.features.reduce((values, feature, index) => ({
          ...values, [`feature${index + 1}Title`]: feature.title,
          [`feature${index + 1}Description`]: feature.description
        }), {})
      }),
      fields: [
        { name: 'eyebrow', label: 'Label section', type: 'text', required: true },
        { name: 'headline', label: 'Judul', type: 'text', required: true },
        { name: 'paragraphOneLead', label: 'Paragraf pertama (teks tebal)', type: 'text', required: true },
        { name: 'paragraphOneTail', label: 'Paragraf pertama (lanjutan)', type: 'textarea', required: true, rows: 3 },
        { name: 'paragraphTwoLead', label: 'Paragraf kedua (awal)', type: 'textarea', required: true, rows: 2 },
        { name: 'paragraphTwoHighlight', label: 'Paragraf kedua (teks highlight)', type: 'text', required: true },
        { name: 'paragraphTwoTail', label: 'Paragraf kedua (akhir)', type: 'text', required: true },
        { name: 'primaryMcus', label: 'Primary MCUs', type: 'text', required: true },
        { name: 'protocols', label: 'Protocols', type: 'text', required: true },
        ...[1, 2, 3].flatMap((number) => [
          { name: `feature${number}Title`, label: `Judul poin ${number}`, type: 'text', required: true },
          { name: `feature${number}Description`, label: `Deskripsi poin ${number}`, type: 'textarea', required: true, rows: 3 }
        ])
      ]
    },
    contactContent: {
      title: 'Edit Contact Content',
      onUpdate: (_, values) => updateSiteContent('contact', values),
      toFormValues: (content) => content,
      fields: [
        { name: 'eyebrow', label: 'Label section', type: 'text', required: true },
        { name: 'headline', label: 'Judul', type: 'text', required: true },
        { name: 'description', label: 'Deskripsi', type: 'textarea', required: true, rows: 3 },
        { name: 'email', label: 'Email', type: 'text', required: true },
        { name: 'linkedinUrl', label: 'URL LinkedIn', type: 'text', required: true },
        { name: 'linkedinText', label: 'Teks LinkedIn', type: 'text', required: true },
        { name: 'githubUrl', label: 'URL GitHub', type: 'text', required: true },
        { name: 'githubText', label: 'Teks GitHub', type: 'text', required: true }
      ]
    }
  };

  // ---------- backup / restore ----------
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ projects, skills, labItems, experience, certs, siteContent }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const importData = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const d = JSON.parse(reader.result);
        if (d.projects) setProjects(d.projects);
        if (d.skills) setSkills(d.skills);
        if (d.labItems) setLabItems(d.labItems);
        if (d.experience) setExperience(d.experience);
        if (d.certs) setCerts(d.certs);
        if (d.siteContent) setSiteContent(d.siteContent);
        alert('Data berhasil diimpor.');
      } catch {
        alert('File backup tidak valid.');
      }
    };
    reader.readAsText(file);
  };
  const resetData = () => {
    if (!window.confirm('Kembalikan semua data ke contoh awal? Data yang kamu tambahkan akan hilang.')) return;
    setProjects(PROJECTS_DEFAULT);
    setSkills(SKILLS_DEFAULT);
    setLabItems(LAB_DEFAULT);
    setExperience(EXPERIENCE_DEFAULT);
    setCerts(CERTS_DEFAULT);
    setSiteContent(SITE_CONTENT_DEFAULT);
  };

  const navLinks = [
    { id: 'home', label: 'Home' }, { id: 'about', label: 'About' }, { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' }, { id: 'lab', label: 'Lab & Docs' }, { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' }, { id: 'contact', label: 'Contact' }
  ];

  const activeForm = addModal ? formDefs[addModal] : null;
  const isEditing = Boolean(activeForm && editTarget?.type === addModal);
  const formInitialValues = isEditing ? activeForm.toFormValues(editTarget.item) : undefined;
  const handleFormSubmit = isEditing
    ? (values) => activeForm.onUpdate(editTarget.item, values)
    : activeForm?.onSubmit;
  const formTitle = isEditing && activeForm.title.startsWith('Add ')
    ? activeForm.title.replace('Add ', 'Edit ')
    : activeForm?.title;

  const portfolio = { AddButton, DeleteButton, EditButton, activeSection, canvasRef, certs, confirmDelete, cvModalOpen, experience, exportData, filteredLab, filteredProjects, importData, inputCls, labCategories, labFilter, mobileMenuOpen, navLinks, openEditModal, projectCategories, projectCategoryFilter, projects, resetData, scrollToSection, selectedCert, selectedLabImage, selectedProject, setAddModal: openAddModal, setCerts, setCvModalOpen, setExperience, setLabFilter, setLabItems, setMobileMenuOpen, setProjectCategoryFilter, setProjects, setSelectedCert, setSelectedLabImage, setSelectedProject, setSiteContent, setSkillSearch, setSkills, siteContent, skillCategories, skillSearch, skills };

  return (
    <PortfolioContext.Provider value={portfolio}>
      <div className="bg-[#0b0f19] text-slate-100 min-h-screen font-sans selection:bg-cyan-500 selection:text-slate-900 relative">
        <Navbar />
        <SolderCursor />
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <LabSection />
        <ExperienceSection />
        <CertificationsSection />
        <ContactSection />
        <FooterSection />
        {activeForm && (
          <FormModal
            key={`${addModal}-${isEditing ? (editTarget.item.id || editTarget.type) : 'add'}`}
            title={formTitle}
            fields={activeForm.fields}
            initialValues={formInitialValues}
            onSubmit={handleFormSubmit}
            onClose={closeFormModal}
          />
        )}
      </div>
    </PortfolioContext.Provider>
  );
}
