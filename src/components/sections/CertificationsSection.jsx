import { FileText, Download, X, ShieldCheck, Award } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

export default function CertificationsSection() {
  const { AddButton, DeleteButton, certs, confirmDelete, cvModalOpen, selectedCert, setAddModal, setCerts, setCvModalOpen, setSelectedCert } = usePortfolio();

  return (
    <>
{/* CERTIFICATIONS */}
      <section id="certifications" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Qualifications & Credentials</h2>
            <h3 className="text-3xl font-extrabold text-slate-100 mb-5">Professional Certifications</h3>
            <AddButton onClick={() => setAddModal('cert')}>Add Certification</AddButton>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certs.map((cert) => (
              <div key={cert.id} className="bg-[#0d1322] rounded-2xl p-6 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-lg">
                <div>
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${cert.badgeColor} p-0.5 shadow-lg`}>
                      <div className="w-full h-full bg-[#0d1322] rounded-[10px] flex items-center justify-center"><Award className="w-6 h-6 text-white" /></div>
                    </div>
                    <DeleteButton onClick={() => confirmDelete(cert.title, () => setCerts((p) => p.filter((x) => x.id !== cert.id)))} />
                  </div>
                  <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">{cert.title}</h4>
                  <span className="text-xs font-mono text-slate-400 block mt-1">{cert.issuer}{cert.date && ` · ${cert.date}`}</span>
                  {cert.description && <p className="text-xs text-slate-300 mt-3 leading-relaxed">{cert.description}</p>}
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" />{cert.credentialId || '—'}</span>
                  <button onClick={() => setSelectedCert(cert)} className="text-xs font-medium text-cyan-400 hover:underline">Details</button>
                </div>
              </div>
            ))}
          </div>
          {certs.length === 0 && <p className="text-center text-slate-500 text-sm py-10">Belum ada sertifikasi. Klik "Add Certification".</p>}
        </div>
      </section>

      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-slate-700 rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-4 relative shadow-2xl">
            <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs"><ShieldCheck className="w-4 h-4" /> Credential Details</div>
            <h3 className="text-lg font-bold text-white pr-10">{selectedCert.title}</h3>
            <p className="text-xs font-mono text-slate-400">Issuer: {selectedCert.issuer}</p>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-1">
              <div className="text-slate-500">CREDENTIAL ID:</div>
              <div className="text-cyan-300 font-bold">{selectedCert.credentialId || '—'}</div>
              {selectedCert.date && (<><div className="text-slate-500 pt-2">DATE:</div><div className="text-slate-200">{selectedCert.date}</div></>)}
            </div>
            {selectedCert.certificateFile && (
              <div className="space-y-3">
                <div className="text-xs font-mono text-slate-400">CERTIFICATE</div>
                {selectedCert.certificateFileType === 'application/pdf' ? (
                  <iframe
                    src={selectedCert.certificateFile}
                    title={`${selectedCert.title} certificate`}
                    className="w-full h-[65vh] rounded-xl border border-slate-800 bg-white"
                  />
                ) : (
                  <img
                    src={selectedCert.certificateFile}
                    alt={`Sertifikat ${selectedCert.title}`}
                    className="w-full max-h-[65vh] object-contain rounded-xl border border-slate-800 bg-black"
                  />
                )}
                <a
                  href={selectedCert.certificateFile}
                  download={selectedCert.certificateFileName || 'certificate'}
                  className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 hover:underline"
                >
                  <Download className="w-4 h-4" /> Download sertifikat
                </a>
              </div>
            )}
            <button onClick={() => setSelectedCert(null)} className="w-full py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs">Close</button>
          </div>
        </div>
      )}

      {/* CV MODAL */}
      {cvModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0d1322] border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-6 relative shadow-2xl">
            <button onClick={() => setCvModalOpen(false)} className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs"><FileText className="w-4 h-4" /> Curriculum Vitae Preview</div>
            <div>
              <h3 className="text-xl font-bold text-white">Trio Prawiro Negoro</h3>
              <p className="text-xs text-slate-400 font-mono">IoT & Hardware Development Engineer</p>
            </div>
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-white">Resume Contents Highlight:</p>
              <ul className="space-y-1 list-disc list-inside text-slate-400">
                <li>ESP32 / STM32 / FreeRTOS / Modbus RTU & TCP / CAN Bus</li>
                <li>{projects.length} projects · {skills.length} skills · {certs.length} certifications</li>
              </ul>
            </div>
            <a href="/cv/CV_Trio.pdf" download="CV_Trio.pdf" onClick={() => setCvModalOpen(false)}
              className="py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
              <Download className="w-4 h-4" /> Download PDF Resume
            </a>
          </div>
        </div>
      )}
    </>
  );
}
