import { Calendar, MapPin } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

export default function ExperienceSection() {
  const { AddButton, DeleteButton, EditButton, confirmDelete, experience, openEditModal, setAddModal, setExperience } = usePortfolio();

  return (
    <>
{/* EXPERIENCE */}
      <section id="experience" className="py-20 bg-[#0d1322] border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Career Track</h2>
            <h3 className="text-3xl font-extrabold text-slate-100 mb-5">Professional Engineering Experience</h3>
            <AddButton onClick={() => setAddModal('experience')}>Add Experience</AddButton>
          </div>
          <div className="max-w-4xl mx-auto space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="bg-[#0b0f19] rounded-2xl p-6 md:p-8 border border-slate-800 hover:border-slate-700 transition-all relative overflow-hidden group shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <div>
                    <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{exp.title}</h4>
                    <span className="text-sm text-cyan-400 font-medium">{exp.company}</span>
                    {exp.type && <span className="ml-2 text-[10px] font-mono text-slate-500">· {exp.type}</span>}
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-500" />{exp.period}</span>
                    {exp.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-500" />{exp.location}</span>}
                    <EditButton label={`Edit ${exp.title}`} onClick={() => openEditModal('experience', exp)} />
                    <DeleteButton onClick={() => confirmDelete(exp.title, () => setExperience((p) => p.filter((x) => x.id !== exp.id)))} />
                  </div>
                </div>
                <ul className="mt-4 space-y-2.5">
                  {(exp.responsibilities || []).map((task, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed"><span className="text-cyan-400 font-bold shrink-0">›</span>{task}</li>
                  ))}
                </ul>
                {exp.tech?.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                    {exp.tech.map((t, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {experience.length === 0 && <p className="text-center text-slate-500 text-sm py-10">Belum ada pengalaman. Klik "Add Experience".</p>}
        </div>
      </section>
    </>
  );
}
