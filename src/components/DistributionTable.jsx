import React, { useEffect, useState } from "react";
import axios from "axios";

const statusColor = (status) => {
  if (status === "Diterima") return "bg-green-500/20 text-green-400";
  if (status === "Pengiriman") return "bg-yellow-500/20 text-yellow-400";
  return "bg-cyan-500/20 text-cyan-400"; // Untuk status 'Persiapan'
};

const DistributionTable = () => {
  const [distributions, setDistributions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDistributions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/distributions");
        console.log("Respon dari backend:", response.data);
        
        if (response.data && response.data.success) {
          setDistributions(response.data.data);
        }
      } catch (error) {
        console.error("Gagal mengambil data distribusi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributions();
  }, []);

  return (
    <div className="bg-white/5 border border-cyan-500/20 rounded-[30px] p-6 overflow-hidden">
      <div className="mb-5">
        <p className="text-cyan-400 uppercase text-sm tracking-[4px]">
          Latest Data
        </p>
        <h2 className="text-2xl font-bold text-white">
          Distribusi Terbaru
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-400 border-b border-slate-700">
              <th className="pb-4">Sekolah</th>
              <th className="pb-4">Menu Variasi</th>
              <th className="pb-4">Penerima</th>
              <th className="pb-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="py-5 text-center text-slate-400 animate-pulse">
                  Memuat data distribusi dari database...
                </td>
              </tr>
            ) : distributions.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-5 text-center text-slate-500">
                  Tidak ada data distribusi di database.
                </td>
              </tr>
            ) : (
              distributions.map((item, index) => (
                <tr key={item.id || index} className="border-b border-slate-800">
                  {/* Diubah agar membaca field objek asli database kamu */}
                  <td className="text-slate-300 text-sm">{item.kota}</td>
                  <td className="py-5 text-white font-medium">{item.schoolName}</td>
                  <td className="text-slate-300 text-sm">{item.menuVaried}</td>
                  <td className="text-cyan-400 font-semibold">{item.totalPortions} Porsi</td>
                  <td>
                    <span
                      className={`px-4 py-2 rounded-full text-xs font-bold ${statusColor(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DistributionTable;