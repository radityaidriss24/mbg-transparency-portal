import { useState } from "react";
import { isAdmin, isPetugas } from "../utils/auth";

const STORAGE_KEY = "complaints";

const statusColor = (status) => {
  if (status === "Menunggu")
    return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.1)]";
  if (status === "Diproses")
    return "bg-orange-500/10 text-orange-400 border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.1)]";
  return "bg-green-500/10 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]";
};

const ComplaintHistory = ({ complaints, setComplaints }) => {
  const admin = isAdmin();
  const petugas = isPetugas();

  const [inputKomentar, setInputKomentar] = useState({});
  const [bukaKomentar, setBukaKomentar] = useState({});
  const [toastAlert, setToastAlert] = useState({ show: false, message: "", pendingIndex: null });

  const syncData = (newData) => {
    setComplaints(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  const updateStatus = (id, newStatus) => {
    const updated = complaints.map(c => c.id === id ? { ...c, status: newStatus } : c);
    syncData(updated);
  };

  const toggleLaciKomentar = (id) => {
    setBukaKomentar(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleKirimKomentar = (id) => {
    const teksKomentar = inputKomentar[id];
    if (!teksKomentar?.trim()) {
      setToastAlert({ show: true, message: "Komentar tidak boleh kosong!", pendingIndex: null });
      return;
    }

    const komentarBaru = {
      pengirim: admin ? "Admin" : "Petugas",
      pesan: teksKomentar,
      waktu: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    const updated = complaints.map(c => {
      if (c.id === id) {
        // Menggunakan array untuk menyimpan banyak komentar
        const listKomentar = c.komentars ? [...c.komentars, komentarBaru] : [komentarBaru];
        return { ...c, komentars: listKomentar };
      }
      return c;
    });

    syncData(updated);
    setInputKomentar(prev => ({ ...prev, [id]: "" }));
  };

  const executeDelete = () => {
    const id = toastAlert.pendingIndex;
    const updated = complaints.filter(c => c.id !== id);
    syncData(updated);
    setToastAlert({ show: false, message: "", pendingIndex: null });
  };

  return (
    <>
      {/* TOAST ALERT */}
      {toastAlert.show && (
        <div className="fixed top-5 right-5 z-[9999] flex flex-col p-4 w-full max-w-md text-white bg-slate-900/90 border border-red-500/50 rounded-2xl backdrop-blur-xl">
          <div className="flex items-center">
            <span className="text-red-400 font-bold">✗ PERINGATAN SISTEM</span>
            <button className="ml-auto" onClick={() => setToastAlert({ show: false, message: "", pendingIndex: null })}>×</button>
          </div>
          <p className="text-xs text-slate-300 mt-2">{toastAlert.message}</p>
          {toastAlert.pendingIndex !== null && (
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setToastAlert({ show: false, message: "", pendingIndex: null })} className="px-3 py-1 bg-slate-800 rounded-lg text-xs">Batal</button>
              <button onClick={executeDelete} className="px-3 py-1 bg-red-500 rounded-lg text-xs font-bold text-black">Ya, Hapus</button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white/5 border border-cyan-500/20 rounded-[30px] p-6 backdrop-blur-xl h-full flex flex-col">
        <h2 className="text-2xl font-bold text-white mb-5">📋 Riwayat Pengaduan</h2>

        <div className="space-y-5 overflow-y-auto flex-1 pr-1">
          {complaints.map((item) => (
            <div key={item.id} className="bg-slate-950/40 border border-cyan-500/20 rounded-2xl p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1 uppercase">
                  ⚠️ {item.kategori || "Pengaduan Umum"}
                </span>
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase ${statusColor(item.status)}`}>
                  ● {item.status || "Menunggu"}
                </span>
              </div>

              <h4 className="text-white font-bold text-base uppercase">{item.lokasi}</h4>
              <p className="text-xs text-slate-400 mb-3">Pelapor: {item.pelapor}</p>
              
              <div className="text-slate-300 text-sm bg-black/30 p-3 rounded-xl italic mb-4">
                "{item.deskripsi}"
              </div>

              {item.foto && (
                <div className="mb-4 overflow-hidden rounded-xl border border-white/10 max-h-44">
                  <img src={item.foto} alt="Bukti" className="w-full object-cover" />
                </div>
              )}

              <button onClick={() => toggleLaciKomentar(item.id)} className="text-xs text-cyan-400 font-bold mb-2">
                💬 Komentar ({item.komentars ? item.komentars.length : 0}) {bukaKomentar[item.id] ? "▲" : "▼"}
              </button>

              {bukaKomentar[item.id] && (
                <div className="p-3 bg-slate-900/50 rounded-xl mb-4 space-y-2">
                  {item.komentars && item.komentars.length > 0 ? (
                    item.komentars.map((k, idx) => (
                      <div key={idx} className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
                        <p className="text-xs text-emerald-400 font-bold">🛡️ {k.pengirim}</p>
                        <p className="text-xs text-slate-200 mt-1">{k.pesan}</p>
                        <p className="text-[9px] text-slate-500 mt-1">{k.waktu}</p>
                      </div>
                    ))
                  ) : <p className="text-[10px] text-slate-500 italic">Belum ada tanggapan.</p>}

                  {(admin || petugas) && item.status === "Diproses" && (
                    <div className="flex gap-2 mt-3">
                      <input 
                        value={inputKomentar[item.id] || ""} 
                        onChange={(e) => setInputKomentar({...inputKomentar, [item.id]: e.target.value})} 
                        className="flex-1 bg-black/40 text-white text-xs p-2 rounded-lg border border-orange-500/20" 
                        placeholder="Tulis tanggapan..."
                      />
                      <button onClick={() => handleKirimKomentar(item.id)} className="bg-orange-500 text-xs px-3 rounded-lg font-bold">Kirim</button>
                    </div>
                  )}
                </div>
              )}

              {(admin || petugas) && (
                <div className="flex gap-2 flex-wrap pt-3 border-t border-white/5">
                  {item.status === "Menunggu" && <button onClick={() => updateStatus(item.id, "Diproses")} className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-lg text-xs font-bold border border-yellow-500/30">Proses</button>}
                  {item.status === "Diproses" && <button onClick={() => updateStatus(item.id, "Selesai")} className="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-xs font-bold border border-green-500/30">Selesaikan</button>}
                  {admin && <button onClick={() => setToastAlert({ show: true, message: "Hapus permanen?", pendingIndex: item.id })} className="bg-red-500/20 text-red-400 px-3 py-1 rounded-lg text-xs font-bold border border-red-500/30">Hapus</button>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ComplaintHistory;