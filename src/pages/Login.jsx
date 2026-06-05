import {
  useState,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaUserTie,
  FaUsers,
} from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
  useState("");

const [password, setPassword] =
  useState("");

const [selectedRole, setSelectedRole] =
  useState("admin");

useEffect(() => {

  const role =
    localStorage.getItem(
      "role"
    );

  if (role === "admin") {
    navigate("/dashboard");
  }

  else if (
    role === "petugas"
  ) {
    navigate(
      "/peta-distribusi"
    );
  }

  else if (
    role ===
    "masyarakat"
  ) {
    navigate("/audit-sosial");
  }

}, [navigate]);

const handleLogin = (e) => {

  e.preventDefault();

  // ADMIN
  if (
    selectedRole ===
      "admin" &&
    email ===
      "admin@mbg.id" &&
    password ===
      "admin123"
  ) {

    localStorage.setItem(
      "role",
      "admin"
    );

    navigate(
      "/dashboard"
    );
  }

  // PETUGAS
  else if (
    selectedRole ===
      "petugas" &&
    email ===
      "petugas@mbg.id" &&
    password ===
      "petugas123"
  ) {

    localStorage.setItem(
      "role",
      "petugas"
    );

    navigate(
      "/peta-distribusi"
    );
  }

  // MASYARAKAT
  else if (
    selectedRole ===
      "masyarakat" &&
    email ===
      "masyarakat@mbg.id" &&
    password ===
      "masyarakat123"
  ) {

    localStorage.setItem(
      "role",
      "masyarakat"
    );

    navigate(
      "/laporan-warga"
    );
  }

  else {

    alert(
      "Email, password, atau role tidak sesuai."
    );

  }
};

  return (
    <div className="relative min-h-screen bg-[#07111F] overflow-hidden flex items-center justify-center">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-cyan-500/20 blur-[180px] rounded-full top-[-150px] left-[-100px]" />

      <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[160px] rounded-full bottom-[-120px] right-[-100px]" />

      {/* FLOATING PARTICLES */}
      <div className="absolute inset-0 overflow-hidden">

        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cyan-400 opacity-20 animate-pulse"
            style={{
              width:
                Math.random() * 5 + 2,
              height:
                Math.random() * 5 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* CONTAINER */}
      <div className="relative z-10 grid lg:grid-cols-2 w-[95%] max-w-7xl rounded-[40px] overflow-hidden border border-cyan-400/20 shadow-[0_0_80px_rgba(0,255,255,0.15)] bg-white/5 backdrop-blur-xl">

        {/* LEFT */}
        <div className="hidden lg:flex flex-col justify-between p-14 border-r border-cyan-400/10">

          <div>
            <p className="text-cyan-400 tracking-[6px] text-sm mb-5">
              LIVE MBG MONITOR
            </p>

            <h1 className="text-6xl font-black text-white leading-tight">
              PORTAL
              <span className="text-cyan-400">
                {" "}
                TRANSPARANSI
              </span>
              <br />
              MBG
            </h1>

            <p className="text-slate-400 text-lg mt-8 max-w-xl">
              Sistem monitoring
              distribusi Makan
              Bergizi Gratis,
              audit sosial, dan
              transparansi publik
              berbasis digital.
            </p>
          </div>

          {/* LIVE STATS */}
          <div className="grid grid-cols-2 gap-5 mt-12">

            <div className="bg-white/5 border border-cyan-400/20 rounded-3xl p-6 hover:scale-105 transition">

              <h2 className="text-cyan-400 text-sm mb-2">
                DISTRIBUSI
              </h2>

              <h1 className="text-4xl font-bold text-white">
                24K+
              </h1>

              <p className="text-slate-400">
                Penerima Aktif
              </p>
            </div>

            <div className="bg-white/5 border border-green-400/20 rounded-3xl p-6 hover:scale-105 transition">

              <h2 className="text-green-400 text-sm mb-2">
                DAPUR MBG
              </h2>

              <h1 className="text-4xl font-bold text-white">
                152
              </h1>

              <p className="text-slate-400">
                Operasional
              </p>
            </div>

            <div className="bg-white/5 border border-cyan-400/20 rounded-3xl p-6 hover:scale-105 transition">

              <h2 className="text-cyan-400 text-sm mb-2">
                SEKOLAH
              </h2>

              <h1 className="text-4xl font-bold text-white">
                320
              </h1>

              <p className="text-slate-400">
                Terhubung
              </p>
            </div>

            <div className="bg-white/5 border border-green-400/20 rounded-3xl p-6 hover:scale-105 transition">

              <h2 className="text-green-400 text-sm mb-2">
                AUDIT
              </h2>

              <h1 className="text-4xl font-bold text-white">
                98%
              </h1>

              <p className="text-slate-400">
                Transparansi
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT LOGIN */}
        <div className="p-10 md:p-16 flex flex-col justify-center">

          <div className="mb-8">

            <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-3">
              Secure Access
            </p>

            <h2 className="text-5xl font-black text-white">
              ACCESS SYSTEM
            </h2>

            <p className="text-slate-400 mt-3">
              Login untuk
              mengakses sistem
              transparansi MBG.
            </p>
          </div>

          {/* ROLE */}
          <div className="grid grid-cols-3 gap-4 mb-8">

            <button
              onClick={() =>
                setSelectedRole(
                  "admin"
                )
              }
              className={`p-4 rounded-2xl border transition ${
                selectedRole ===
                "admin"
                  ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                  : "bg-white/5 border-slate-700"
              }`}
            >
              <FaUserShield className="mx-auto text-3xl text-cyan-400 mb-2" />

              <p className="text-white text-sm">
                Admin
              </p>
            </button>

            <button
              onClick={() =>
                setSelectedRole(
                  "petugas"
                )
              }
              className={`p-4 rounded-2xl border transition ${
                selectedRole ===
                "petugas"
                  ? "bg-green-500/20 border-green-400 shadow-[0_0_20px_rgba(0,255,0,0.4)]"
                  : "bg-white/5 border-slate-700"
              }`}
            >
              <FaUserTie className="mx-auto text-3xl text-green-400 mb-2" />

              <p className="text-white text-sm">
                Petugas
              </p>
            </button>
            
            <button
              onClick={() =>
                setSelectedRole(
                  "masyarakat"
                )
              }
              className={`p-4 rounded-2xl border transition ${
                selectedRole ===
                "masyarakat"
                  ? "bg-orange-500/20 border-orange-400 shadow-[0_0_20px_rgba(255,165,0,0.4)]"
                  : "bg-white/5 border-slate-700"
              }`}
            >
              <FaUsers className="mx-auto text-3xl text-orange-400 mb-2" />

              <p className="text-white text-sm">
                Masyarakat
              </p>
            </button>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <input
              type="email"
              placeholder="Email"
              className="w-full bg-white/5 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-cyan-400"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full bg-white/5 border border-slate-700 rounded-2xl p-4 text-white outline-none focus:border-cyan-400"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-green-500 text-white font-bold text-lg hover:scale-[1.02] transition shadow-[0_0_30px_rgba(0,255,255,0.4)]">
              ACCESS SYSTEM
            </button>
          </form>

          {/* DEMO ACCOUNT */}
          <div className="mt-8 bg-white/5 border border-cyan-400/10 rounded-2xl p-5 text-sm text-slate-300">
            <p className="text-cyan-400 font-bold mb-2">
              Demo Access
            </p>

            <p>
              Admin →
              admin@mbg.id /
              admin123
            </p>

            <p>
              Petugas →
              petugas@mbg.id /
              petugas123
            </p>

            <p>
              Masyarakat →
              masyarakat@mbg.id /
              masyarakat123
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};


export default Login;