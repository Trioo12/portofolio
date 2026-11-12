import { useRef, useState } from 'react';
import { Activity, ChevronRight, X, Maximize2 } from 'lucide-react';
import { usePortfolio } from '../../PortfolioContext.jsx';

function LabPhotoGallery({ item, imageClassName }) {
  const touchStartX = useRef(null);
  const [activePhoto, setActivePhoto] = useState(0);
  const photos = Array.isArray(item.images) ? item.images : item.image ? [item.image] : [];

  const changePhoto = (direction, event) => {
    event.stopPropagation();
    setActivePhoto((current) => (current + direction + photos.length) % photos.length);
  };

  return (
    <div
      aria-label={`Foto dokumentasi ${item.title}`}
      className="absolute inset-0 overflow-hidden"
      onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(distance) > 40) setActivePhoto((current) => (current + (distance < 0 ? 1 : -1) + photos.length) % photos.length);
        touchStartX.current = null;
      }}
    >
      {photos.length > 0 && (
        <img
          src={photos[activePhoto]}
          alt={`${item.title} - foto ${activePhoto + 1}`}
          className={`${imageClassName} absolute inset-0 w-full h-full`}
        />
      )}
      {photos.length > 1 && (
        <>
          <button type="button" onClick={(event) => changePhoto(-1, event)} aria-label="Foto sebelumnya" className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/85 p-2 text-white opacity-100 transition-opacity hover:bg-cyan-500 hover:text-slate-950 md:opacity-0 md:group-hover/gallery:opacity-100 md:focus-visible:opacity-100">
            <ChevronRight className="w-4 h-4 rotate-180" />
          </button>
          <button type="button" onClick={(event) => changePhoto(1, event)} aria-label="Foto berikutnya" className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-slate-950/85 p-2 text-white opacity-100 transition-opacity hover:bg-cyan-500 hover:text-slate-950 md:opacity-0 md:group-hover/gallery:opacity-100 md:focus-visible:opacity-100">
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="absolute bottom-3 right-3 z-10 rounded-full bg-slate-950/85 px-2 py-1 text-[10px] font-mono text-white">{activePhoto + 1} / {photos.length}</span>
        </>
      )}
    </div>
  );
}

export default function LabSection() {
  const { AddButton, DeleteButton, confirmDelete, filteredLab, labCategories, labFilter, selectedLabImage, setAddModal, setLabFilter, setLabItems, setSelectedLabImage } = usePortfolio();

  return (
    <>
{/* LAB */}
      <section id="lab" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Engineering Documentation</h2>
              <h3 className="text-3xl font-extrabold text-slate-100">Documentation Projects</h3>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <AddButton onClick={() => setAddModal('lab')}>Add Artifact</AddButton>
              <div className="flex items-center flex-wrap gap-2">
                {labCategories.map((cat) => (
                  <button key={cat} onClick={() => setLabFilter(cat)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${labFilter === cat ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-[#0d1322] text-slate-400 hover:text-white border border-slate-800'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLab.map((item) => (
              <div key={item.id} onClick={() => setSelectedLabImage(item)}
                className="bg-[#0d1322] rounded-2xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer group shadow-lg">
                <div className="h-52 bg-slate-900 relative overflow-hidden group/gallery">
                  {(item.images?.length > 0 || item.image) ? (
                    <LabPhotoGallery item={item} imageClassName="object-cover group-hover/gallery:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover/gallery:scale-105 transition-transform duration-500">
                      <Activity className="w-24 h-24 text-cyan-500" />
                    </div>
                  )}
                </div>
                <div className="p-4 bg-[#0d1322]">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-cyan-400">{item.category}</span>
                    <DeleteButton onClick={() => confirmDelete(item.title, () => setLabItems((p) => p.filter((x) => x.id !== item.id)))} />
                  </div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <h4 className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">{item.title}</h4>
                    <Maximize2 className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 shrink-0" />
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          {filteredLab.length === 0 && <p className="text-center text-slate-500 text-sm py-10">Belum ada artifact di kategori ini.</p>}
        </div>
      </section>

      {selectedLabImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0d1322] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 space-y-4 relative shadow-2xl">
            <button onClick={() => setSelectedLabImage(null)} className="absolute top-4 right-4 p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Lab Artifact // {selectedLabImage.category}</span>
            <h3 className="text-xl font-bold text-white pr-10">{selectedLabImage.title}</h3>
            {(selectedLabImage.images?.length > 0 || selectedLabImage.image) ? (
              <div className="h-[50vh] max-h-[500px] relative overflow-hidden rounded-xl border border-slate-800 bg-black group/gallery">
                <LabPhotoGallery item={selectedLabImage} imageClassName="object-contain" />
              </div>
            ) : (
              <div className="h-64 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 font-mono text-xs">[ Belum ada gambar untuk artifact ini ]</div>
            )}
            <p className="text-sm text-slate-300">{selectedLabImage.description}</p>
            <div className="pt-2 flex justify-end">
              <button onClick={() => setSelectedLabImage(null)} className="px-4 py-2 rounded-lg bg-slate-800 text-xs font-semibold text-slate-200">Close Preview</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
