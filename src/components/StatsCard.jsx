import { motion } from "framer-motion";

const StatsCard = ({
  title,
  value,
  icon,
  growth,
}) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.04,
      }}
      className="bg-white/5 border border-cyan-500/20 rounded-[28px] p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(0,255,255,0.08)]"
    >

      <div className="flex justify-between items-center">

        <div>
          <p className="text-slate-400 text-sm uppercase tracking-[3px]">
            {title}
          </p>

          <h2 className="text-4xl font-black text-white mt-3">
            {value}
          </h2>

          <p className="text-green-400 text-sm mt-3">
            ▲ {growth}
          </p>
        </div>

        <div className="text-5xl text-cyan-400">
          {icon}
        </div>

      </div>
    </motion.div>
  );
};

export default StatsCard;