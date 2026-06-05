const StatusBadge = ({ status }) => {
  const color = {
    Menunggu: "bg-yellow-500",
    Diproses: "bg-blue-500",
    Selesai: "bg-green-500",
  };

  return (
    <span className={`${color[status]} text-white px-3 py-1 rounded-full text-sm`}>
      {status}
    </span>
  );
};

export default StatusBadge;