import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ComplaintForm from "../components/ComplainForm";
import ComplaintHistory from "../components/ComplainHistory";

const AuditSosial = () => {
  const [complaints, setComplaints] = useState([]);

  // STATE NOTIFIKASI: Sekarang mendukung tipe 'success' (hijau) atau 'error' (merah)
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  
  // STATE MODAL: Kontrol modal konfirmasi hapus data
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  // Load data awal dari LocalStorage saat halaman dibuka
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("complaints")) || [];
    setComplaints(saved);
  }, []);

  // FUNGSI GLOBAL NOTIFIKASI: Mengatur teks pesan dan warna boks alert secara dinamis
  const triggerAlert = (message, type = "success") => {
    setToast({ show: true, message, type });
    
    // Toast otomatis menghilang dalam 4 detik biar gak menutupi UI
    setTimeout(() => {
      setToast({ show: false, message: "", type: "success" });
    }, 4000);
  };

  // Fungsi sinkronisasi data laporan baru ke state dan LocalStorage
  const addComplaint = (newComplaint) => {
    const updated = [newComplaint, ...complaints];
    setComplaints(updated);
    localStorage.setItem("complaints", JSON.stringify(updated));
  };

  // Membuka modal konfirmasi hapus
  const triggerDelete = (id) => {
    setDeleteModal({ show: true, id });
  };

  // Eksekusi hapus data via API Backend port 5000
  const handleConfirmDelete = async () => {
    const id = deleteModal.id;
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/reports/${id}`);
      
      if (response.data.success || response.status === 200) {
        const updated = complaints.filter((c) => c.id !== id);
        setComplaints(updated);
        localStorage.setItem("complaints", JSON.stringify(updated));
        triggerAlert("Laporan berhasil dihapus secara permanen!", "success");
      }
    } catch (error) {
      console.error("Gagal menghapus laporan dari database:", error);
      // Fallback lokal jika server mati
      const updated = complaints.filter((c) => c.id !== id);
      setComplaints(updated);
      localStorage.setItem("complaints", JSON.stringify(updated));
      triggerAlert("Koneksi server terputus, laporan terhapus lokal.", "error");
    } finally {
      setDeleteModal({ show: false, id: null });
    }
  };

  // Menghitung jumlah status dashboard (kebal huruf besar/kecil)
  const waiting = complaints.filter((c) => c.status?.toLowerCase() === "menunggu").length;
  const process = complaints.filter((c) => c.status?.toLowerCase() === "diproses").length;
  const done = complaints.filter((c) => c.status?.toLowerCase() === "selesai").length;

  return (
    <>
      {/* BOKS ALERT/TOAST DINAMIS: OTOMATIS BERUBAH WARNA BERDASARKAN STATUS TYPE */}
      {toast.show && (
        <div className={`fixed top-5 right-5 z-[9999] flex flex-col p-4 w-full max-w-md text-white backdrop-blur-xl border rounded-2xl shadow-lg transition-all duration-300 ${
          toast.type === "error" 
            ? "bg-slate-900/95 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)] animate-shake" 
            : "bg-slate-900/95 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-fade-in"
        }`}>
          <div className="flex items-center">
            {/* Lingkaran Ikon: Merah (Gagal) / Hijau (Sukses) */}
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl border ${
              toast.type === "error"
                ? "text-red-400 bg-red-500/10 border-red-500/20"
                : "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
            }`}>
              {toast.type === "error" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            {/* Area Teks Judul Notifikasi */}
            <div className="ml-3 text-sm font-medium pr-4">
              <span className={`font-bold block uppercase tracking-wide text-xs ${
                toast.type === "error" ? "text-red-400" : "text-emerald-400"
              }`}>
                {toast.type === "error" ? "✗ PERINGATAN SISTEM" : "✓ BERHASIL TERKIRIM"}
              </span>
              <span className="text-slate-300 text-xs block mt-0.5 break-words">{toast.message}</span>
            </div>

            {/* Tombol Close Silang */}
            <button 
              type="button"
              onClick={() => setToast({ ...toast, show: false })}
              className="ml-auto bg-transparent text-slate-400 hover:text-white rounded-lg text-xl font-bold p-1 outline-none transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS DATA LAPORAN */}
      {deleteModal.show && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#132033] border border-red-500/30 rounded-[24px] p-6 max-w-sm w-full text-center shadow-[0_0_30px_rgba(239,68,68,0.15)]">
            <div className="w-14 h-14 bg-red-500/10 text-red-500 border border-red-500/20 rounded-full flex items-center justify-center mx-auto text-xl mb-4">
              ⚠️
            </div>
            
            <h3 className="text-white font-bold text-lg mb-2">Hapus Laporan?</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Apakah anda yakin ingin menghapus permanen laporan pengaduan ini? Tindakan ini tidak dapat dibatalkan oleh sistem.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeleteModal({ show: false, id: null })}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-medium text-xs transition border border-slate-700"
              >
                Batal
              </button>
              
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="bg-red-500 hover:bg-red-400 text-black py-3 rounded-xl font-bold text-xs transition shadow-lg"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LAYOUT GRID UTAMA */}
      <div className="flex bg-[#07111F] min-h-screen">
        <Sidebar />

        <main className="flex-1 p-8">
          <Header />

          {/* HERO UTAMA */}
          <div className="mb-8">
            <p className="text-cyan-400 uppercase tracking-[5px] text-sm">
              MBG SOCIAL AUDIT
            </p>
            <h1 className="text-4xl font-black text-white">
              Cyber Complaint Center
            </h1>
            <p className="text-slate-400 mt-2">
              Sistem audit sosial transparansi MBG berbasis laporan masyarakat.
            </p>
          </div>

          {/* DASHBOARD COUNTER KARTU */}
          <div className="grid md:grid-cols-3 gap-5 mb-8">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-[28px] p-6">
              <p className="text-yellow-400 font-bold">MENUNGGU</p>
              <h2 className="text-4xl text-white font-black mt-2">{waiting}</h2>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-[28px] p-6">
              <p className="text-orange-400 font-bold">DIPROSES</p>
              <h2 className="text-4xl text-white font-black mt-2">{process}</h2>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-[28px] p-6">
              <p className="text-green-400 font-bold">SELESAI</p>
              <h2 className="text-4xl text-white font-black mt-2">{done}</h2>
            </div>
          </div>

          {/* GRID FORM INPUT DAN LIST RIWAYAT */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Mengoper fungsi kontrol alert ke komponen anak form */}
            <ComplaintForm 
              onAddComplaint={addComplaint} 
              triggerAlert={triggerAlert}
            />

            <ComplaintHistory
              complaints={complaints}
              setComplaints={setComplaints}
              onTriggerDelete={triggerDelete} 
              triggerAlert={triggerAlert}
            />
          </div>
        </main>
      </div>
    </>
  );
};

export default AuditSosial;