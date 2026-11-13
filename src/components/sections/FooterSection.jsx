import { Download, Upload, RotateCcw } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

export default function FooterSection() {
  const { exportData, importData, resetData } = usePortfolio();

  return (
    <>
{/* FOOTER */}
      <footer id="footer" className="py-8 bg-[#070a12] border-t border-slate-900 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 space-y-5">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-slate-600">Data tersimpan di browser ini:</span>
            <button onClick={exportData} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all">
              <Download className="w-3.5 h-3.5" /> Export Backup
            </button>
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all cursor-pointer">
              <Upload className="w-3.5 h-3.5" /> Import Backup
              <input type="file" accept="application/json" className="hidden" onChange={(e) => { importData(e.target.files?.[0]); e.target.value = ''; }} />
            </label>
            <button onClick={resetData} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-rose-500/50 text-slate-300 hover:text-rose-400 transition-all">
              <RotateCcw className="w-3.5 h-3.5" /> Reset ke Contoh
            </button>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>© {new Date().getFullYear()} Trio Prawiro Negoro. All rights reserved.</div>
            <div className="flex items-center gap-4 text-slate-400">
              <span>ESP32</span><span>•</span><span>STM32</span><span>•</span><span>Modbus</span><span>•</span><span>MQTT</span><span>•</span><span>PCB Design</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
