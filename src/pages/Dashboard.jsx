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
  const [complaints, setComplaints] =
    useState([]);

  useEffect(() => {
    const data =
      JSON.parse(
        localStorage.getItem(
          "complaints"
        )
      ) || [];

    setComplaints(data);
  }, []);

  const totalComplaints =
    complaints.length;

  const auditAktif =
    complaints.filter(
      (item) =>
        item.status ===
        "Diproses"
    ).length;

  const auditSelesai =
    complaints.filter(
      (item) =>
        item.status ===
        "Selesai"
    ).length;

  const pendingAudit =
    complaints.filter(
      (item) =>
        item.status ===
        "Menunggu"
    ).length;

  return (
    <div className="flex bg-[#07111F] min-h-screen">

      <Sidebar />

      <main className="flex-1 p-4 md:p-8">

        <Header />

        {/* STATS */}
        <div
          className="
          grid
          xl:grid-cols-6
          lg:grid-cols-3
          md:grid-cols-2
          sm:grid-cols-2
          grid-cols-1
          gap-6
          mb-8
        "
        >

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
            value={totalComplaints}
            growth="+0%"
            icon={
              <FaClipboardList />
            }
          />

          <StatsCard
            title="Audit Aktif"
            value={auditAktif}
            growth="+0%"
            icon={
              <FaMapMarkedAlt />
            }
          />

          <StatsCard
            title="Audit Selesai"
            value={auditSelesai}
            growth="+0%"
            icon={
              <FaMapMarkedAlt />
            }
          />

          <StatsCard
            title="Menunggu Audit"
            value={pendingAudit}
            growth="+0%"
            icon={
              <FaClipboardList />
            }
          />

        </div>

        {/* CHART + MAP */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">

          <MBGChart />

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