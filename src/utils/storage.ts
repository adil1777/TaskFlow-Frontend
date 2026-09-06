export const storage = {
  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  },

  setAccessToken(token: string) {
    localStorage.setItem("accessToken", token);
  },

  removeAccessToken() {
    localStorage.removeItem("accessToken");
  },

  clear() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },
};
