import { Download, Menu, X } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

export default function Navbar() {
  const { activeSection, mobileMenuOpen, navLinks, scrollToSection, setCvModalOpen, setMobileMenuOpen } = usePortfolio();

  return (
    <>
{/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0b0f19]/85 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div onClick={() => scrollToSection('home')} className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 via-cyan-500 to-teal-400 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0d1322] rounded-[7px] flex items-center justify-center font-mono text-cyan-400 font-extrabold text-lg">TPN</div>
            </div>
            <div>
              <span className="font-bold text-slate-100 text-lg tracking-tight group-hover:text-cyan-400 transition-colors">TRIO PRAWIRO NEGORO</span>
              <span className="block text-xs font-mono text-slate-400">IoT & Hardware Dev</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)}
                className={`text-sm font-medium transition-colors hover:text-cyan-400 ${activeSection === link.id ? 'text-cyan-400 border-b-2 border-cyan-400 py-1' : 'text-slate-300'}`}>
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1.5 px-2 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="2xl:hidden">Available</span>
              <span className="hidden 2xl:inline">Available for Opportunities</span>
            </div>
            <button onClick={() => setCvModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-all hover:scale-105 active:scale-95">
              <Download className="w-3.5 h-3.5" /> Download CV
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0d1322] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            {navLinks.map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-2 px-3 text-sm font-medium rounded-md text-slate-200 hover:bg-slate-800 hover:text-cyan-400">
                {link.label}
              </button>
            ))}
            <button onClick={() => { setMobileMenuOpen(false); setCvModalOpen(true); }}
              className="flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 w-full">
              <Download className="w-3.5 h-3.5" /> Download CV Resume
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
