import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

const locations = [
  {
    sekolah:
      "SD Negeri Lowokwaru 3",
    posisi: [-7.9525, 112.6148],
    penerima: 430,
    tanggal: "20 Mei 2026",
    menu:
      "Ayam, Sayur, Susu",
    audit:
      "Sekolah pertama MBG Kota Malang",
    status: "Aktif",
  },

  {
    sekolah:
      "SD Negeri Ciptomulyo 1",
    posisi: [-8.0231, 112.6312],
    penerima: 450-500,
    tanggal: "20 Mei 2026",
    menu:
      "Telur, Sayur, Buah",
    audit:
      "Distribusi berjalan",
    status: "Aktif",
  },

  {
    sekolah:
      "SD Negeri Ciptomulyo 2",
    posisi: [-8.0223, 112.6328],
    penerima: 394,
    tanggal: "20 Mei 2026",
    menu:
      "Ikan, Sayur, Susu",
    audit:
      "Audit lapangan",
    status: "Diproses",
  },

  {
    sekolah:
      "SD Negeri Kasin",
    posisi: [-7.9822, 112.6254],
    penerima: 497,
    tanggal: "19 Mei 2026",
    menu:
      "Ayam, Sayur",
    audit:
      "Terverifikasi",
    status: "Aktif",
  },

  {
    sekolah:
      "SD Negeri Rampal Celaket 1",
    posisi: [-7.9685, 112.6364],
    penerima: 225,
    tanggal: "19 Mei 2026",
    menu:
      "Daging, Sayur",
    audit:
      "Monitoring aktif",
    status: "Diproses",
  },

  {
    sekolah:
      "MIN 2 Kota Malang",
    posisi: [-7.9447, 112.6261],
    penerima: 1200,
    tanggal: "18 Mei 2026",
    menu:
      "Prasmanan MBG",
    audit:
      "Inovasi sistem prasmanan",
    status: "Aktif",
  },

  {
    sekolah:
      "MI Attaraqie Putra",
    posisi: [-7.9571, 112.6132],
    penerima: 1100,
    tanggal: "18 Mei 2026",
    menu:
      "Ayam, Sayur",
    audit:
      "Distribusi aktif",
    status: "Aktif",
  },

  {
    sekolah:
      "MI Attaraqie Putri",
    posisi: [-7.9588, 112.6141],
    penerima: 1100,
    tanggal: "18 Mei 2026",
    menu:
      "Ikan, Sayur",
    audit:
      "Distribusi aktif",
    status: "Aktif",
  },

  {
    sekolah:
      "SDK YBPK Ngaglik",
    posisi: [-7.9659, 112.6227],
    penerima: 150,
    tanggal: "17 Mei 2026",
    menu:
      "Telur, Buah",
    audit:
      "Audit selesai",
    status: "Selesai",
  },
];

const getColor = (
  status
) => {
  if (status === "Aktif")
    return "#22c55e";

  if (
    status === "Diproses"
  )
    return "#eab308";

  return "#ef4444";
};

const IndonesiaMap = () => {
  return (
    <div className="bg-white/5 border border-cyan-500/20 rounded-[30px] overflow-hidden backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,255,0.08)]">

      <div className="p-6 border-b border-cyan-500/10">

        <p className="text-cyan-400 uppercase tracking-[4px] text-sm">
          Live National Map
        </p>

        <h2 className="text-2xl font-bold text-white">
          Monitoring Distribusi
        </h2>
      </div>

      <MapContainer
        center={[-7.9666, 112.6326]}
        zoom={13}
        style={{
          height: "600px",
          width: "100%",
          background:
            "#07111F",
        }}
      >

        <TileLayer
          attribution="OpenStreetMap"
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {locations.map(
          (item, index) => (
            <CircleMarker
              key={index}
              center={
                item.posisi
              }
              radius={15}
              pathOptions={{
                color: getColor(
                  item.status
                ),
                fillColor:
                  getColor(
                    item.status
                  ),
                fillOpacity: 0.8,
              }}
            >

              <Popup>

                <div className="w-64 space-y-3">

                  <h2 className="text-lg font-bold">
                    📍 {item.kota}
                  </h2>

                  <div>
                    <strong>
                      Sekolah:
                    </strong>

                    <br />

                    {
                      item.sekolah
                    }
                  </div>

                  <div>
                    <strong>
                      Penerima:
                    </strong>

                    <br />

                    {
                      item.penerima
                    }{" "}
                    siswa
                  </div>

                  <div>
                    <strong>
                      Distribusi:
                    </strong>

                    <br />

                    {
                      item.tanggal
                    }
                  </div>

                  <div>
                    <strong>
                      Menu:
                    </strong>

                    <br />

                    {item.menu}
                  </div>

                  <div>
                    <strong>
                      Audit:
                    </strong>

                    <br />

                    {
                      item.audit
                    }
                  </div>

                  <div
                    style={{
                      marginTop:
                        "10px",
                    }}
                  >
                    <span
                      style={{
                        background:
                          getColor(
                            item.status
                          ),
                        color:
                          "white",
                        padding:
                          "6px 14px",
                        borderRadius:
                          "999px",
                        fontSize:
                          "12px",
                      }}
                    >
                      {
                        item.status
                      }
                    </span>
                  </div>

                </div>
              </Popup>

            </CircleMarker>
          )
        )}

      </MapContainer>
    </div>
  );
};

export default IndonesiaMap;