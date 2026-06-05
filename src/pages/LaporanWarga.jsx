import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const statusColor = (
  status
) => {
  if (status === "Menunggu")
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/20";

  if (status === "Diproses")
    return "bg-orange-500/20 text-orange-400 border-orange-500/20";

  return "bg-green-500/20 text-green-400 border-green-500/20";
};

const LaporanWarga = () => {
  const [reports, setReports] =
    useState([]);

  const [filter, setFilter] =
    useState("Semua");

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem(
          "complaints"
        )
      ) || [];

    setReports(data);
  }, []);

  const filteredReports =
    filter === "Semua"
      ? reports
      : reports.filter(
          (item) =>
            item.status ===
            filter
        );

  return (
    <div className="flex bg-[#07111F] min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <Header />

        {/* HERO */}
        <div className="mb-8">

          <p className="text-cyan-400 uppercase tracking-[5px] text-sm">
            PUBLIC TRANSPARENCY
          </p>

          <h1 className="text-4xl font-black text-white">
            Laporan Warga
          </h1>

          <p className="text-slate-400 mt-2">
            Monitoring laporan
            masyarakat terkait
            distribusi MBG
            nasional.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex gap-4 mb-8 flex-wrap">

          {[
            "Semua",
            "Menunggu",
            "Diproses",
            "Selesai",
          ].map((item) => (
            <button
              key={item}
              onClick={() =>
                setFilter(item)
              }
              className={`px-5 py-3 rounded-2xl border transition

              ${
                filter === item
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                  : "bg-white/5 border-slate-700 text-slate-300"
              }
              `}
            >
              {item}
            </button>
          ))}

        </div>

        {/* REPORT LIST */}
        {filteredReports.length ===
        0 ? (
          <div className="bg-white/5 border border-cyan-500/20 rounded-[30px] p-12 text-center text-slate-400">
            Belum ada laporan
            masyarakat.
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">

            {filteredReports.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className="bg-white/5 border border-cyan-500/20 rounded-[30px] overflow-hidden backdrop-blur-xl hover:scale-[1.01] transition"
                >

                  {/* IMAGE */}
                  {item.foto && (
                    <img
                      src={
                        item.foto
                      }
                      alt=""
                      className="h-60 w-full object-cover"
                    />
                  )}

                  <div className="p-6">

                    {/* TOP */}
                    <div className="flex justify-between items-start mb-5">

                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {
                            item.pelapor
                          }
                        </h2>

                        <p className="text-slate-400">
                          {
                            item.lokasi
                          }
                        </p>
                      </div>

                      <span
                        className={`px-4 py-2 rounded-full border text-sm ${statusColor(
                          item.status
                        )}`}
                      >
                        {
                          item.status
                        }
                      </span>

                    </div>

                    {/* CATEGORY */}
                    <div className="mb-4">

                      <p className="text-cyan-400 text-sm uppercase tracking-[3px]">
                        Kategori
                      </p>

                      <p className="text-white mt-1">
                        {
                          item.kategori
                        }
                      </p>
                    </div>

                    {/* DESC */}
                    <div className="mb-6">

                      <p className="text-cyan-400 text-sm uppercase tracking-[3px]">
                        Deskripsi
                      </p>

                      <p className="text-slate-300 mt-1">
                        {
                          item.deskripsi
                        }
                      </p>
                    </div>

                    {/* TIMELINE */}
                    <div className="bg-cyan-500/5 border border-cyan-500/10 rounded-2xl p-4">

                      <p className="text-cyan-400 text-sm uppercase tracking-[3px] mb-4">
                        Audit Timeline
                      </p>

                      <div className="space-y-4">

                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-cyan-400" />

                          <p className="text-slate-300 text-sm">
                            Laporan
                            dikirim
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />

                          <p className="text-slate-300 text-sm">
                            Verifikasi
                            laporan
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-green-400" />

                          <p className="text-slate-300 text-sm">
                            Audit
                            lapangan
                          </p>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              )
            )}

          </div>
        )}

      </main>
    </div>
  );
};

export default LaporanWarga;