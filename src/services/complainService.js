const STORAGE_KEY = "mbg_reports";

export const getReports = () => {
  return (
    JSON.parse(
      localStorage.getItem(STORAGE_KEY)
    ) || []
  );
};

export const saveReport = (report) => {
  const reports = getReports();

  reports.push({
    id: Date.now(),
    createdAt: new Date(),
    status: "Menunggu",
    ...report,
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(reports)
  );
};