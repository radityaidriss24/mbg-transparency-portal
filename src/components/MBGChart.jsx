import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const MBGChart = () => {

  const complaints =
    JSON.parse(
      localStorage.getItem(
        "complaints"
      )
    ) || [];

  const pending =
    complaints.filter(
      (item) =>
        item.status ===
        "Menunggu"
    ).length;

  const processing =
    complaints.filter(
      (item) =>
        item.status ===
        "Diproses"
    ).length;

  const completed =
    complaints.filter(
      (item) =>
        item.status ===
        "Selesai"
    ).length;

  const data = [
    {
      name: "Menunggu",
      value: pending,
    },

    {
      name: "Diproses",
      value: processing,
    },

    {
      name: "Selesai",
      value: completed,
    },
  ];

  const COLORS = [
    "#FACC15",
    "#FB923C",
    "#22C55E",
  ];

  return (
    <div className="bg-white/5 border border-cyan-500/20 rounded-[30px] p-6 backdrop-blur-xl">

      <div className="mb-6">

        <p className="text-cyan-400 uppercase tracking-[4px] text-sm">
          LIVE MONITORING
        </p>

        <h2 className="text-3xl font-bold text-white mt-2">
          Audit Sosial MBG
        </h2>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >

            {data.map(
              (
                entry,
                index
              ) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index
                    ]
                  }
                />
              )
            )}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

      <div className="grid grid-cols-3 gap-4 mt-6">

        <div className="bg-yellow-500/10 rounded-2xl p-4 text-center">

          <h3 className="text-yellow-400 text-2xl font-bold">
            {pending}
          </h3>

          <p className="text-slate-400 text-sm">
            Menunggu
          </p>

        </div>

        <div className="bg-orange-500/10 rounded-2xl p-4 text-center">

          <h3 className="text-orange-400 text-2xl font-bold">
            {processing}
          </h3>

          <p className="text-slate-400 text-sm">
            Diproses
          </p>

        </div>

        <div className="bg-green-500/10 rounded-2xl p-4 text-center">

          <h3 className="text-green-400 text-2xl font-bold">
            {completed}
          </h3>

          <p className="text-slate-400 text-sm">
            Selesai
          </p>

        </div>

      </div>

    </div>
  );
};

export default MBGChart;