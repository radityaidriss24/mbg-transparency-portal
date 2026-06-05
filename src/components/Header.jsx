import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import { useState } from "react";

const Header = () => {
  const role =
    localStorage.getItem("role");

  const [showNotif, setShowNotif] =
    useState(false);

  const complaints =
    JSON.parse(
      localStorage.getItem(
        "complaints"
      )
    ) || [];

  const pendingCount =
    complaints.filter(
      (item) =>
        item.status ===
        "Menunggu"
    ).length;

  return (
    <header className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-8">

      {/* LEFT */}
      <div>

        <p className="text-cyan-400 uppercase tracking-[4px] text-sm">
          MBG MONITORING
        </p>

        <h1 className="text-4xl font-black text-white">
          Dashboard
        </h1>

      </div>

      {/* RIGHT */}
      <div className="flex flex-wrap items-center gap-4">

        {/* SEARCH */}
        <div className="flex items-center gap-3 bg-white/5 border border-cyan-500/20 rounded-2xl px-5 py-3 w-full lg:w-[320px]">

          <FaSearch className="text-cyan-400" />

          <input
            type="text"
            placeholder="Cari data..."
            className="bg-transparent outline-none text-white w-full placeholder:text-slate-500"
          />

        </div>

        {/* NOTIFICATION */}
        <div className="relative">

          <button
            onClick={() =>
              setShowNotif(
                !showNotif
              )
            }
            className="relative bg-white/5 border border-cyan-500/20 w-14 h-14 rounded-2xl flex items-center justify-center hover:bg-cyan-500/10 transition"
          >

            <FaBell className="text-cyan-400 text-xl" />

            {pendingCount >
              0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                {
                  pendingCount
                }
              </span>
            )}

          </button>

          {/* DROPDOWN */}
          {showNotif && (
            <div className="absolute top-16 right-0 w-[320px] max-w-[90vw] bg-[#0B1727] border border-cyan-500/20 rounded-3xl p-5 shadow-[0_0_40px_rgba(0,255,255,0.15)] z-50 backdrop-blur-xl">

              <div className="flex justify-between items-center mb-5">

                <h2 className="text-white font-bold text-lg">
                  Notifikasi
                </h2>

                <span className="text-cyan-400 text-sm">
                  {pendingCount} Baru
                </span>

              </div>

              {pendingCount ===
              0 ? (

                <div className="text-center py-6">

                  <div className="text-4xl mb-3">
                    🔔
                  </div>

                  <p className="text-slate-400">
                    Tidak ada notifikasi baru
                  </p>

                </div>

              ) : (

                <div className="space-y-3">

                  {complaints
                    .filter(
                      (item) =>
                        item.status ===
                        "Menunggu"
                    )
                    .slice(
                      0,
                      5
                    )
                    .map(
                      (
                        item,
                        index
                      ) => (

                        <div
                          key={
                            index
                          }
                          className="bg-white/5 border border-cyan-500/10 p-4 rounded-2xl hover:bg-cyan-500/10 transition"
                        >

                          <p className="text-white text-sm font-medium">
                            Pengaduan dari{" "}
                            {
                              item.pelapor
                            }
                          </p>

                          <p className="text-slate-400 text-xs mt-1">
                            {
                              item.lokasi
                            }
                          </p>

                          <span className="text-yellow-400 text-xs">
                            Menunggu Audit
                          </span>

                        </div>

                      )
                    )}

                </div>

              )}

            </div>
          )}

        </div>

        {/* PROFILE */}
        <div className="flex items-center gap-3 bg-white/5 border border-cyan-500/20 rounded-2xl px-4 py-3">

          <FaUserCircle className="text-cyan-400 text-3xl" />

          <div>

            <p className="text-white font-semibold capitalize">
              {role}
            </p>

            <p className="text-slate-400 text-sm">
              Active Session
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;