import { Cpu, Server, Code } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

export default function AboutSection() {
  const {  } = usePortfolio();

  return (
    <>
{/* ABOUT */}
      <section id="about" className="py-20 bg-[#0d1322] border-y border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Engineering Background & Philosophy</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">Bridging Physical Signals to Cloud Systems</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-slate-300 text-base leading-relaxed">
              <p className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                I am an <strong className="text-white">IoT Engineer and Hardware Developer</strong> with experience in engineering end-to-end connected systems. My work spans the entire development cycle—from breadboard prototypes and PCB schematic routing to C/C++ firmware development, RS485/Modbus field integration, and cloud MQTT telemetry dashboards.
              </p>
              <p>
                Having deployed hardware in industrial manufacturing plants and maritime environments, I understand that real-world IoT is about <strong className="text-cyan-400 font-semibold">field reliability, electrical isolation, and fault-tolerant firmware</strong>—not just flashing an LED on a bench.
              </p>
              <div className="pt-2 grid grid-cols-2 gap-4 text-sm font-mono">
                <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800"><span className="text-slate-500 block text-xs">PRIMARY MCUs</span><span className="text-white font-semibold">ESP32, STM32, PLC</span></div>
                <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800"><span className="text-slate-500 block text-xs">PROTOCOLS</span><span className="text-cyan-400 font-semibold">Modbus, CAN Bus, MQTT</span></div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              {[
                { icon: Cpu, color: 'bg-blue-500/10 text-cyan-400 border-blue-500/20', t: '1. Robust Hardware Design', d: 'Designing custom multi-layer PCBs with galvanic power isolation, MOV transient suppression, optocouplers, and IPC-standard trace separation for noisy electromagnetic environments.' },
                { icon: Code, color: 'bg-teal-500/10 text-teal-300 border-teal-500/20', t: '2. Non-Blocking Firmware', d: 'Writing efficient C/C++ firmware utilizing FreeRTOS task queues, state machines, and hardware interrupt handlers to prevent network lockups and data loss.' },
                { icon: Server, color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20', t: '3. System Integration & Edge Analytics', d: 'Deploying Node-RED flows, Docker edge containers, and real-time supervisory dashboards (Grafana) to aggregate telemetry across disparate industrial machinery brands.' }
              ].map(({ icon: Icon, color, t, d }) => (
                <div key={t} className="bg-[#0b0f19] p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex items-start gap-4">
                  <div className={`p-3 rounded-xl border shrink-0 ${color}`}><Icon className="w-6 h-6" /></div>
                  <div><h4 className="text-lg font-bold text-white mb-1">{t}</h4><p className="text-sm text-slate-400">{d}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
