import { useRef } from 'react';
import { Layers, ChevronRight, X, CheckCircle, Code, AlertCircle, Check, HardDrive } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

function ProjectPhotoCarousel({ project }) {
  const scrollRef = useRef(null);
  const photos = Array.isArray(project.images) ? project.images : project.image ? [project.image] : [];

  const scroll = (direction) => {
    const gallery = scrollRef.current;
    if (gallery) gallery.scrollBy({ left: direction * gallery.clientWidth, behavior: 'smooth' });
  };

  return (
    <>
      {photos.length > 0 && (
        <div ref={scrollRef} aria-label={`Dokumentasi foto ${project.title}`} className="absolute inset-0 z-0 flex overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {photos.map((photo, index) => (
            <img key={index} src={photo} alt={`${project.title} - foto ${index + 1}`} className="w-full h-full shrink-0 object-cover snap-center" />
          ))}
        </div>
      )}
      {photos.length > 1 && (
        <>
          <button type="button" onClick={() => scroll(-1)} aria-label="Foto sebelumnya" className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-slate-950/80 p-2 text-white opacity-100 transition-opacity hover:bg-cyan-500 hover:text-slate-950 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Foto berikutnya" className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-slate-950/80 p-2 text-white opacity-100 transition-opacity hover:bg-cyan-500 hover:text-slate-950 md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100">
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="absolute bottom-3 right-3 z-20 rounded-full bg-slate-950/80 px-2 py-1 text-[10px] font-mono text-white">{photos.length} photos</span>
        </>
      )}
    </>
  );
}

export default function ProjectsSection() {
  const { AddButton, DeleteButton, confirmDelete, filteredProjects, projectCategories, projectCategoryFilter, selectedProject, setAddModal, setProjectCategoryFilter, setProjects, setSelectedProject } = usePortfolio();

  return (
    <>
{/* PROJECTS */}
      <section id="projects" className="py-20 bg-[#0d1322] border-t border-slate-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Engineering Case Studies</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-100 mb-4">Featured IoT & Hardware Projects</h3>
            <p className="text-slate-400 text-sm mb-5">Comprehensive breakdowns of real-world hardware developments, firmware architectures, and field-tested installations.</p>
            <AddButton onClick={() => setAddModal('project')}>Add Project</AddButton>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {projectCategories.map((cat) => (
              <button key={cat} onClick={() => setProjectCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${projectCategoryFilter === cat ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20' : 'bg-[#0b0f19] text-slate-400 hover:text-white border border-slate-800'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="bg-[#0b0f19] rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all flex flex-col group shadow-xl">
                <div className="h-48 bg-gradient-to-br from-slate-900 via-[#0f172a] to-blue-950 p-6 flex flex-col justify-between relative overflow-hidden border-b border-slate-800">
                  <ProjectPhotoCarousel project={project} />
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0b0f19]/90 via-slate-950/20 to-slate-950/40 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 z-[2] w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none"></div>
                  <div className="flex justify-between items-center z-10">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-cyan-400">{project.category}</span>
                    <DeleteButton onClick={() => confirmDelete(project.title, () => setProjects((p) => p.filter((x) => x.id !== project.id)))} />
                  </div>
                  <div className="z-10">
                    <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{project.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{project.subtitle}</p>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{project.overview}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {(project.tags || []).map((tag, i) => (
                      <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">{tag}</span>
                    ))}
                  </div>
                  <button onClick={() => setSelectedProject(project)}
                    className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-2 group/btn">
                    View System Case Study <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredProjects.length === 0 && <p className="text-center text-slate-500 text-sm py-10">Belum ada project di kategori ini.</p>}
        </div>
      </section>

      {/* PROJECT DETAIL MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b0f19] border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="sticky top-0 bg-[#0b0f19]/95 backdrop-blur-md p-6 border-b border-slate-800 flex items-center justify-between z-20">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{selectedProject.category} // Case Study</span>
                <h3 className="text-2xl font-bold text-white mt-1">{selectedProject.title}</h3>
              </div>
              <button onClick={() => setSelectedProject(null)} className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 md:p-8 space-y-8 text-slate-300 text-sm leading-relaxed">
              {(selectedProject.problem || selectedProject.objective) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedProject.problem && (
                    <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-mono text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Problem Statement</h4>
                      <p>{selectedProject.problem}</p>
                    </div>
                  )}
                  {selectedProject.objective && (
                    <div className="bg-slate-900/80 p-5 rounded-xl border border-slate-800">
                      <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><CheckCircle className="w-4 h-4" /> Engineering Objective</h4>
                      <p>{selectedProject.objective}</p>
                    </div>
                  )}
                </div>
              )}
              {selectedProject.architecture && (
                <div>
                  <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Layers className="w-4 h-4" /> System Architecture & Data Flow</h4>
                  <div className="bg-[#070a12] p-4 rounded-xl border border-slate-800 font-mono text-xs text-cyan-300 break-all leading-relaxed">{selectedProject.architecture}</div>
                </div>
              )}
              {(selectedProject.hardwareBOM?.length > 0 || selectedProject.softwareStack?.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedProject.hardwareBOM?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2"><HardDrive className="w-4 h-4 text-cyan-400" /> Hardware Bill of Materials (BOM)</h4>
                      <ul className="space-y-2 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                        {selectedProject.hardwareBOM.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300"><span className="text-cyan-400 font-bold">•</span>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {selectedProject.softwareStack?.length > 0 && (
                    <div>
                      <h4 className="text-xs font-mono text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2"><Code className="w-4 h-4 text-teal-400" /> Software & Protocol Stack</h4>
                      <div className="flex flex-wrap gap-2 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                        {selectedProject.softwareStack.map((sw, i) => (
                          <span key={i} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-700 text-xs font-mono text-teal-300">{sw}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div className="space-y-4">
                {selectedProject.implementation && (
                  <div>
                    <h4 className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">Implementation Breakdown</h4>
                    <p className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">{selectedProject.implementation}</p>
                  </div>
                )}
                {selectedProject.testingResults && (
                  <div>
                    <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">Field Validation & Testing Results</h4>
                    <p className="bg-slate-900/40 p-4 rounded-xl border border-slate-800">{selectedProject.testingResults}</p>
                  </div>
                )}
              </div>
              {selectedProject.responsibilities?.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">My Engineering Responsibilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedProject.responsibilities.map((r, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-200"><Check className="w-4 h-4 text-cyan-400 shrink-0" />{r}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-slate-800 bg-[#0b0f19] flex justify-end">
              <button onClick={() => setSelectedProject(null)} className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs">Close Case Study</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
