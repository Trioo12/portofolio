import { Zap, Search } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

export default function SkillsSection() {
  const { AddButton, DeleteButton, confirmDelete, setAddModal, setSkillSearch, setSkills, skillCategories, skillSearch, skills } = usePortfolio();

  return (
    <>
{/* SKILLS */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2"> Technical Competencies</h2>
              <h3 className="text-3xl font-extrabold text-slate-100">Hardware, Firmware & Communication Stack</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:items-center">
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input type="text" placeholder="Search skill, MCU, or protocol..." value={skillSearch} onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full bg-[#0d1322] text-sm text-white pl-10 pr-4 py-2.5 rounded-xl border border-slate-800 focus:outline-none focus:border-cyan-500 transition-all placeholder:text-slate-500" />
              </div>
              <AddButton onClick={() => setAddModal('skill')}>Add Skill</AddButton>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat) => {
              const q = skillSearch.toLowerCase();
              const items = skills.filter((s) => s.category === cat && (!q || s.name.toLowerCase().includes(q) || (s.desc || '').toLowerCase().includes(q)));
              if (items.length === 0 && skillSearch) return null;
              return (
                <div key={cat} className="bg-[#0d1322] rounded-2xl p-6 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
                      <Zap className="w-4 h-4 text-cyan-400" />
                      <h4 className="font-bold text-white text-base tracking-wide">{cat}</h4>
                    </div>
                    <div className="space-y-4">
                      {items.map((skill) => (
                        <div key={skill.id} className="group/skill">
                          <div className="flex items-center justify-between gap-2 text-sm font-medium mb-1">
                            <span className="text-slate-200 group-hover/skill:text-cyan-400 transition-colors">{skill.name}</span>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">{skill.level}</span>
                              <DeleteButton onClick={() => confirmDelete(skill.name, () => setSkills((p) => p.filter((x) => x.id !== skill.id)))}
                                className="opacity-0 group-hover/skill:opacity-100" />
                            </div>
                          </div>
                          {skill.desc && <p className="text-xs text-slate-400 leading-snug">{skill.desc}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                    <span>{items.length} Tech Items</span>
                    <span className="text-cyan-500">Verified Field Usage</span>
                  </div>
                </div>
              );
            })}
          </div>
          {skills.length === 0 && <p className="text-center text-slate-500 text-sm py-10">Belum ada skill. Klik "Add Skill".</p>}
        </div>
      </section>
    </>
  );
}
