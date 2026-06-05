import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsCard from "../components/StatsCard";
import MBGChart from "../components/MBGChart";
import IndonesiaMap from "../components/IndonesiaMap";
import DistributionTable from "../components/DistributionTable";
import NotificationPanel from "../components/NotificationPanel";

import {
  FaUtensils,
  FaSchool,
  FaClipboardList,
  FaMapMarkedAlt,
} from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    diproses: 0,
    selesai: 0,
    menunggu: 0
  });

  useEffect(() => {
    // 1. Ambil data cadangan dari localStorage terlebih dahulu agar tampilan tidak kosong jika backend bermasalah
    const localComplaints = JSON.parse(localStorage.getItem("complaints")) || [];
    
    // Set data awal menggunakan data lokal supaya aman dan tidak kosongan
    const setInitialStats = (dataArray) => {
      const statsData = {
        total: dataArray.length,
        diproses: dataArray.filter((item) => item.status === "Diproses" || item.status === "Proses").length,
        selesai: dataArray.filter((item) => item.status === "Selesai").length,
        menunggu: dataArray.filter((item) => item.status === "Pending" || item.status === "Menunggu").length,
      };
      setStats(statsData);
    };

    // Jalankan data lokal dulu sebagai default
    setInitialStats(localComplaints);

    // 2. Coba ambil data asli dari MySQL Backend
    fetch("http://localhost:5000/api/reports") 
      .then((response) => {
        if (!response.ok) {
          // Jika rute /api/reports salah (404), coba tembak rute alternatif /api/report
          return fetch("http://localhost:5000/api/report").then(res => res.json());
        }
        return response.json();
      })
      .then((res) => {
        // Deteksi apakah data berbentuk array langsung atau dibungkus .data
        const daftarKeluhan = Array.isArray(res) ? res : (res.data || res.reports || null);
        
        if (daftarKeluhan && daftarKeluhan.length > 0) {
          console.log("🚀 Berhasil sinkron dengan MySQL:", daftarKeluhan);
          setInitialStats(daftarKeluhan);
        }
      })
      .catch((error) => {
        console.log("Backend belum merespons, menggunakan data cadangan localStorage.", error);
      });
  }, []);
  
  return (
    <div className="flex bg-[#07111F] min-h-screen">
      <Sidebar />

      <main className="flex-1 p-4 md:p-8">
        <Header />

        {/* STATS */}
        <div className="grid xl:grid-cols-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 mb-8">
          <StatsCard
            title="Distribusi"
            value="24K+"
            growth="+12%"
            icon={<FaUtensils />}
          />
          <StatsCard
            title="Sekolah"
            value="320"
            growth="+8%"
            icon={<FaSchool />}
          />
          <StatsCard
            title="Pengaduan"
            value={stats.total}
            growth="+0%"
            icon={<FaClipboardList />}
          />
          <StatsCard
            title="Audit Aktif"
            value={stats.diproses}
            growth="+0%"
            icon={<FaMapMarkedAlt />}
          />
          <StatsCard
            title="Audit Selesai"
            value={stats.selesai}
            growth="+0%"
            icon={<FaMapMarkedAlt />}
          />
          <StatsCard
            title="Menunggu Audit"
            value={stats.menunggu}
            growth="+0%"
            icon={<FaClipboardList />}
          />
        </div>

        {/* CHART + MAP */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* PERBAIKAN: Mengirimkan data state ke MBGChart lewat props stats */}
          <MBGChart stats={stats} />
          <IndonesiaMap />
        </div>

        {/* TABLE + NOTIF */}
        <div className="grid lg:grid-cols-2 gap-6">
          <DistributionTable />
          <NotificationPanel />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;