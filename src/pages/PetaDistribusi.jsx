import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import IndonesiaMap from "../components/IndonesiaMap";

const PetaDistribusi = () => {
  return (
    <div className="flex bg-[#07111F] min-h-screen">

      <Sidebar />

      <main className="flex-1 p-8">

        <Header />

        {/* HERO */}
        <div className="mb-8">

          <p className="text-cyan-400 uppercase tracking-[5px] text-sm">
            MBG NATIONAL MAP
          </p>

          <h1 className="text-4xl font-black text-white">
            Peta Distribusi 2.0
          </h1>

          <p className="text-slate-400 mt-2">
            Live monitoring
            distribusi Makan
            Bergizi Gratis
            nasional berbasis
            digital.
          </p>
        </div>

        {/* STATUS CARD */}
        <div className="grid md:grid-cols-3 gap-5 mb-8">

          <div className="bg-green-500/10 border border-green-500/20 rounded-[28px] p-6">

            <p className="text-green-400">
              DISTRIBUSI AKTIF
            </p>

            <h2 className="text-4xl text-white font-black mt-2">
              152
            </h2>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-[28px] p-6">

            <p className="text-yellow-400">
              DIPROSES
            </p>

            <h2 className="text-4xl text-white font-black mt-2">
              32
            </h2>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-[28px] p-6">

            <p className="text-red-400">
              KENDALA
            </p>

            <h2 className="text-4xl text-white font-black mt-2">
              12
            </h2>
          </div>

        </div>

        {/* MAP */}
        <IndonesiaMap />

      </main>
    </div>
  );
};

export default PetaDistribusi;