import { useEffect, useState } from "react";

const NotificationPanel = () => {
  const [notifications, setNotifications] =
    useState([]);

  useEffect(() => {
    const complaints =
      JSON.parse(
        localStorage.getItem(
          "complaints"
        )
      ) || [];

    const latest =
      complaints.slice(0, 5);

    const formatted =
      latest.map((item) => ({
        title: `Pengaduan baru dari ${item.lokasi}`,
        time: item.createdAt,
      }));

    setNotifications(formatted);
  }, []);

  return (
    <div className="bg-white/5 border border-cyan-500/20 rounded-[30px] p-6 backdrop-blur-xl">

      <div className="mb-5">

        <p className="text-cyan-400 uppercase text-sm tracking-[4px]">
          Real Time
        </p>

        <h2 className="text-2xl font-bold text-white">
          Live Notification
        </h2>
      </div>

      {notifications.length ===
      0 ? (
        <div className="text-slate-400 text-center py-10">
          Belum ada notifikasi
        </div>
      ) : (
        <div className="space-y-4">

          {notifications.map(
            (item, index) => (
              <div
                key={index}
                className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4 hover:bg-cyan-500/20 transition"
              >

                <div className="flex items-start gap-3">

                  <div className="w-3 h-3 bg-green-400 rounded-full mt-2 animate-pulse" />

                  <div>

                    <p className="text-white font-medium">
                      {item.title}
                    </p>

                    <span className="text-slate-400 text-sm">
                      {item.time}
                    </span>

                  </div>
                </div>
              </div>
            )
          )}

        </div>
      )}
    </div>
  );
};

export default NotificationPanel;