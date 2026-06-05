import { useState } from "react";
import axios from "axios";
import { isAdmin } from "../utils/auth"; 

const ComplaintForm = ({ onAddComplaint }) => {
  const [fileSelected, setFileSelected] = useState(null); 
  const [preview, setPreview] = useState(null); 
  const [loading, setLoading] = useState(false);
  
  const admin = isAdmin();
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showModernToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: "", message: "" });
    }, 4000);
  };

  const handleFile = (e) => {
    if (admin) return;
    const file = e.target.files[0];
    if (file) {
      setFileSelected(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (admin) {
      showModernToast("Eror", "Role Admin hanya bertugas memonitor & memvalidasi laporan!");
      return;
    }

    const form = e.target;
    const kategoriPilihan = form.kategori.value;

    if (!kategoriPilihan) {
      showModernToast("Eror", "Silakan pilih kategori pengaduan terlebih dahulu!");
      return;
    }

    setLoading(true);

    // MENGIRIM DATA SESUAI STRUKTUR MODEL REPORT DI SERVER.JS
    const dataLaporan = {
      schoolName: form.lokasi.value,    
      issueType: kategoriPilihan, 
      description: form.deskripsi.value, 
    };

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/reports", dataLaporan);

      // MODIFIKASI DI SINI: Membaca respons baik berupa data langsung atau bungkus .data
      const dataDariMysql = response.data.data || response.data;
      
      if (dataDariMysql) {
        const formatLokal = {
          id: dataDariMysql.id,
          pelapor: form.nama.value, 
          lokasi: dataDariMysql.schoolName, 
          kategori: dataDariMysql.issueType, 
          deskripsi: dataDariMysql.description, 
          foto: preview, 
          status: dataDariMysql.status || "Pending", 
          createdAt: new Date().toLocaleString('id-ID')
        };
        
        if (typeof onAddComplaint === "function") {
          onAddComplaint(formatLokal);
        }

        showModernToast("Sukses", "Laporan berhasil dikirim!");
        form.reset();
        setPreview(null);
        setFileSelected(null);
      }
    } catch (error) {
      console.error("Gagal mengirim laporan:", error);
      showModernToast("Eror", error.response?.data?.message || "Gagal simpan ke Database");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast.show && (
        <div className="fixed top-5 right-5 z-50 flex items-center p-4 w-full max-w-md text-white bg-slate-900/90 border border-emerald-500/50 rounded-2xl shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-xl">
          <div className="ml-3 text-sm font-medium">
            <span className="text-emerald-400 font-bold block">{toast.type === "Sukses" ? "✓ BERHASIL" : "✗ EROR"}</span>
            <span className="text-slate-300 text-xs">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="bg-white/5 border border-cyan-500/20 rounded-[30px] p-7 backdrop-blur-xl">
        <h2 className="text-2xl font-bold text-white mb-5">Form Pengaduan</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="nama" placeholder="Nama Pelapor" required disabled={admin} className="w-full bg-white/5 border border-cyan-500/20 rounded-2xl p-4 text-white text-sm" />
          <input name="lokasi" placeholder="Lokasi / Nama Sekolah" required disabled={admin} className="w-full bg-white/5 border border-cyan-500/20 rounded-2xl p-4 text-white text-sm" />
          
          <select name="kategori" required disabled={admin} className="w-full bg-[#132033] border border-cyan-500/20 rounded-2xl p-4 text-white text-sm">
            <option value="">-- Pilih Kategori Pengaduan --</option>
            <option value="Makanan Tidak Layak">Makanan Tidak Layak</option>
            <option value="Keterlambatan Distribusi">Keterlambatan Distribusi</option>
            <option value="Dapur Fiktif">Dapur Fiktif</option>
          </select>

          <input type="file" onChange={handleFile} disabled={admin} className="text-slate-300 text-sm" accept="image/*" />
          {preview && <img src={preview} alt="preview" className="rounded-2xl max-h-48 w-full object-cover border border-cyan-500/20" />}
          
          <textarea rows="5" name="deskripsi" placeholder="Deskripsi masalah..." required disabled={admin} className="w-full bg-white/5 border border-cyan-500/20 rounded-2xl p-4 text-white text-sm" />
          <button disabled={loading || admin} className="w-full bg-cyan-500 hover:bg-cyan-400 py-4 rounded-2xl font-bold text-black text-sm">
            {loading ? "Sedang Mengirim..." : "Kirim Pengaduan"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ComplaintForm;