export function isAuthenticated() {
    // Periksa token atau status login pengguna
    return !!localStorage.getItem("user"); // atau gunakan state/context
  }