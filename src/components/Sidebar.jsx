import {
  FaChartPie,
  FaMapMarkedAlt,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  Link,
  useLocation,
} from "react-router-dom";

const Sidebar = () => {
  const location =
    useLocation();

  const role =
    localStorage.getItem(
      "role"
    );

  const menus = [
    {
      name: "Dashboard",
      icon: <FaChartPie />,
      path: "/dashboard",
      roles: ["admin"],
    },

    {
      name: "Audit Sosial",
      icon: (
        <FaClipboardList />
      ),
      path: "/audit-sosial",
      roles: [
        "admin",
        "petugas",
        "masyarakat",
      ],
    },

    {
      name: "Peta Distribusi",
      icon: (
        <FaMapMarkedAlt />
      ),
      path: "/peta-distribusi",
      roles: [
        "admin",
        "petugas",
        "masyarakat",
      ],
    },

    {
      name: "Laporan Warga",
      icon: <FaUsers />,
      path: "/laporan-warga",
      roles: [
        "admin",
        "masyarakat",
      ],
    },
  ];

  const logout = () => {
    localStorage.removeItem(
      "role"
    );

    window.location.href =
      "/";
  };

  return (
    <aside className="w-[300px] min-h-screen bg-[#07111F] border-r border-cyan-500/20 p-6 flex flex-col justify-between shadow-[0_0_40px_rgba(0,255,255,0.08)]">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-10">

          <h1 className="text-3xl font-black text-white leading-tight">
            MBG
            <span className="text-cyan-400">
              {" "}
              SYSTEM
            </span>
          </h1>

          <p className="text-slate-400 text-sm mt-2">
            Transparency &
            Monitoring Platform
          </p>

          <div className="mt-5 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">

            <p className="text-slate-400 text-xs">
              ACCESS ROLE
            </p>

            <h2 className="text-cyan-400 font-bold capitalize text-lg">
              {role}
            </h2>

          </div>

        </div>

        {/* MENU */}
        <nav className="space-y-3">

          {menus
            .filter((menu) =>
              menu.roles.includes(
                role
              )
            )
            .map((menu) => {

              const active =
                location.pathname ===
                menu.path;

              return (
                <Link
                  key={
                    menu.name
                  }
                  to={
                    menu.path
                  }
                  className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 border

                  ${
                    active
                      ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.25)]"
                      : "bg-white/5 border-slate-800 hover:border-cyan-400/30 hover:bg-cyan-500/10"
                  }
                  `}
                >

                  <span
                    className={`text-xl

                    ${
                      active
                        ? "text-cyan-400"
                        : "text-slate-400"
                    }
                    `}
                  >
                    {menu.icon}
                  </span>

                  <span
                    className={`font-medium

                    ${
                      active
                        ? "text-white"
                        : "text-slate-300"
                    }
                    `}
                  >
                    {menu.name}
                  </span>

                </Link>
              );
            })}

        </nav>

      </div>

      {/* BOTTOM */}
      <div>

        {/* LIVE STATUS */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-4 mb-5">

          <div className="flex items-center gap-2 mb-2">

            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />

            <span className="text-green-400 text-sm font-semibold">
              LIVE SYSTEM
            </span>

          </div>

          <p className="text-slate-400 text-sm">
            Monitoring aktif &
            transparansi berjalan.
          </p>

        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 py-4 rounded-2xl hover:bg-red-500/20 transition"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;