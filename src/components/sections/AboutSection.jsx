import { Cpu, Server, Code } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

export default function AboutSection() {
  const { EditButton, openEditModal, siteContent } = usePortfolio();
  const about = siteContent.about;
  const featureStyles = [
    { icon: Cpu, color: 'bg-blue-500/10 text-cyan-400 border-blue-500/20' },
    { icon: Code, color: 'bg-teal-500/10 text-teal-300 border-teal-500/20' },
    { icon: Server, color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' }
  ];

  return (
    <>
{/* ABOUT */}
      <section id="about" className="py-20 bg-[#0d1322] border-y border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">{about.eyebrow}</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100">{about.headline}</h3>
            <div className="mt-5">
              <EditButton label="Edit About" onClick={() => openEditModal('aboutContent', about)} />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6 space-y-6 text-slate-300 text-base leading-relaxed">
              <p className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
                <strong className="text-white">{about.paragraphOneLead}</strong>{about.paragraphOneTail}
              </p>
              <p>
                {about.paragraphTwoLead}<strong className="text-cyan-400 font-semibold">{about.paragraphTwoHighlight}</strong>{about.paragraphTwoTail}
              </p>
              <div className="pt-2 grid grid-cols-2 gap-4 text-sm font-mono">
                <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800"><span className="text-slate-500 block text-xs">PRIMARY MCUs</span><span className="text-white font-semibold">{about.primaryMcus}</span></div>
                <div className="bg-[#0b0f19] p-4 rounded-xl border border-slate-800"><span className="text-slate-500 block text-xs">PROTOCOLS</span><span className="text-cyan-400 font-semibold">{about.protocols}</span></div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-4">
              {about.features.map(({ title, description }, index) => {
                const { icon: Icon, color } = featureStyles[index];
                return (
                <div key={title} className="bg-[#0b0f19] p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all flex items-start gap-4">
                  <div className={`p-3 rounded-xl border shrink-0 ${color}`}><Icon className="w-6 h-6" /></div>
                  <div><h4 className="text-lg font-bold text-white mb-1">{title}</h4><p className="text-sm text-slate-400">{description}</p></div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
