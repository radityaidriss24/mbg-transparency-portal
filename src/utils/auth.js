export const getRole = () => {
  return localStorage.getItem("role");
};

export const isAdmin = () => {
  return getRole() === "admin";
};

export const isPetugas = () => {
  return getRole() === "petugas";
};

export const isMasyarakat = () => {
  return getRole() === "masyarakat";
};