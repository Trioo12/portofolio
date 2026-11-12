import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

export default function ContactSection() {
  const { inputCls } = usePortfolio();

  return (
    <>
{/* CONTACT */}
      <section id="contact" className="py-20 bg-[#0d1322] border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Initiate Connectivity</h2>
              <h3 className="text-3xl font-extrabold text-slate-100">Let's Build Something Connected.</h3>
              <p className="text-slate-300 text-sm leading-relaxed">Open to engineering opportunities, industrial IoT consulting, hardware prototyping, and custom embedded systems development.</p>
              <div className="space-y-4 pt-4">
                {[
                  { href: 'mailto:prawironegorotrio@gmail.com', icon: Mail, label: 'DIRECT EMAIL', text: 'prawironegorotrio@gmail.com', color: 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500' },
                  { href: 'https://linkedin.com', icon: Linkedin, label: 'LINKEDIN PROFILE', text: 'https://www.linkedin.com/in/trio-prawiro-negoro-698704224', color: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500' },
                  { href: 'https://github.com', icon: Github, label: 'GITHUB REPOSITORIES', text: 'github.com/trioprawiro', color: 'bg-teal-500/10 text-teal-400 group-hover:bg-teal-500' }
                ].map(({ href, icon: Icon, label, text, color }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#0b0f19] border border-slate-800 hover:border-cyan-500/40 transition-all text-slate-200 group">
                    <div className={`p-3 rounded-lg transition-colors group-hover:text-slate-950 ${color}`}><Icon className="w-5 h-5" /></div>
                    <div><span className="text-[10px] font-mono text-slate-500 block">{label}</span><span className="text-sm font-semibold">{text}</span></div>
                  </a>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <form onSubmit={(e) => { e.preventDefault(); alert('Form ini masih simulasi (belum terhubung ke backend/email).'); }}
                className="bg-[#0b0f19] p-6 md:p-8 rounded-2xl border border-slate-800 space-y-5 shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div><label className="block text-xs font-mono text-slate-400 mb-2">YOUR NAME *</label><input type="text" required placeholder="e.g. Alex Mercer" className={inputCls} /></div>
                  <div><label className="block text-xs font-mono text-slate-400 mb-2">EMAIL ADDRESS *</label><input type="email" required placeholder="alex@company.com" className={inputCls} /></div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">PROJECT TOPIC / SUBJECT</label>
                  <select className={inputCls}>
                    <option>IoT Hardware Project Consultation</option>
                    <option>Full-time Engineering Opportunity</option>
                    <option>PCB Design & Prototyping</option>
                    <option>Industrial Automation & Modbus Integration</option>
                    <option>General Collaboration Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">MESSAGE / PROJECT SPECS *</label>
                  <textarea rows={5} required placeholder="Describe your hardware requirements, microcontrollers involved, target timeline..." className={`${inputCls} resize-none`}></textarea>
                </div>
                <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:opacity-95 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Transmission Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
