import { useState } from 'react';
import { Cpu, Activity, Mail, Github, Linkedin, ChevronRight } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

export default function HomeSection() {
  const [profileImageAvailable, setProfileImageAvailable] = useState(true);
  const { canvasRef, certs, EditButton, openEditModal, projects, scrollToSection, siteContent, skills } = usePortfolio();

  return (
    <>
{/* HERO */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0 opacity-60"><canvas ref={canvasRef} /></div>
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-xs font-mono text-cyan-300 backdrop-blur-sm">
                  <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span>{siteContent.home.roleLabel}</span>
                </div>
                <EditButton label="Edit Home" onClick={() => openEditModal('homeContent', siteContent.home)} />
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                {siteContent.home.headlinePrefix}<span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-300 bg-clip-text text-transparent">{siteContent.home.headlineHighlight}</span>
              </h1>
              <p className="text-slate-300 text-lg md:text-xl font-normal leading-relaxed max-w-2xl">
                Hi, I'm <strong className="text-white font-semibold">{siteContent.home.fullName}</strong>. {siteContent.home.intro}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button onClick={() => scrollToSection('projects')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all hover:-translate-y-0.5 flex items-center gap-2">
                  View My Projects <ChevronRight className="w-4 h-4" />
                </button>
                <button onClick={() => scrollToSection('lab')}
                  className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" /> Explore Engineering Lab
                </button>
                <div className="flex items-center gap-3 pl-2">
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all text-slate-400" title="GitHub Profile"><Github className="w-5 h-5" /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all text-slate-400" title="LinkedIn Profile"><Linkedin className="w-5 h-5" /></a>
                  <a href="mailto:prawironegorotrio@gmail.com" className="p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:text-cyan-400 transition-all text-slate-400" title="Send Email"><Mail className="w-5 h-5" /></a>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-xl">
                <div><div className="text-2xl font-mono font-bold text-white">{projects.length}</div><div className="text-xs text-slate-400">Projects</div></div>
                <div><div className="text-2xl font-mono font-bold text-cyan-400">{skills.length}</div><div className="text-xs text-slate-400">Skills</div></div>
                <div><div className="text-2xl font-mono font-bold text-teal-300">{certs.length}</div><div className="text-xs text-slate-400">Certifications</div></div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="mx-auto w-full max-w-[390px]">
                <div className="relative aspect-[4/5]">
                  {profileImageAvailable ? (
                    <img
                      src="/images/profile-transparent.png"
                      alt={siteContent.home.fullName}
                      className="profile-image-blend absolute inset-0 h-full w-full object-contain object-center drop-shadow-[0_16px_30px_rgba(0,0,0,0.55)]"
                      onError={() => setProfileImageAvailable(false)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-[2rem] border border-slate-700/80 bg-gradient-to-br from-slate-800 via-[#0d1322] to-cyan-950/60 p-8 text-center">
                      <div className="flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/30 bg-slate-950/50 text-4xl font-semibold text-cyan-300">
                        TP
                      </div>
                      <p className="max-w-xs text-sm text-slate-300">
                        Tambahkan foto ke <code className="break-all text-cyan-300">public\images\profile-transparent.png</code>
                      </p>
                    </div>
                  )}
                </div>
                <div className="mt-4 rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-800/90 via-[#0d1322] to-cyan-950/40 p-5 shadow-xl shadow-cyan-950/20">
                  <p className="mb-2 text-xs font-mono uppercase tracking-[0.2em] text-cyan-300">{siteContent.home.profileCategory}</p>
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">{siteContent.home.fullName}</h2>
                  <p className="mt-2 text-sm text-slate-300">{siteContent.home.profileSubtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
