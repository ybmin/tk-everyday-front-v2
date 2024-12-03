import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "./auth";
import { clearUser, saveUser } from "./user";

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();
  if (!accessToken || !refreshToken) {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${}`,
        ...(options.headers || {}),
      },
    }); // 서버에서 401 응답 시 로그인 페이지로 리디렉션
    if (response.status === 401) {
      clearTokens();
      window.location.href = "/login";
      throw new Error("Unauthorized");
    }
    return response;
  }
  if (!accessToken && refreshToken) {
    const response = await fetch("https://api.tk-everyday.site/token/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      setTokens(data.access_token, refreshToken);
      return apiRequest(endpoint, options);
    } else {
      clearTokens();
      window.location.href = "/login";
      throw new Error("다시 로그인해주세요.");
    }
  } else {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...(options.headers || {}),
      },
    });
    if (response.status === 401) {
      const response = await fetch(
        "https://api.tk-everyday.site/token/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTokens(data.access_token, refreshToken);
        return apiRequest(endpoint, options);
      } else {
        clearTokens();
        window.location.href = "/login";
        throw new Error("다시 로그인해주세요.");
      }
    }
  }
}

export async function apiUpdateUser() {
  const access_token = getAccessToken();
  const response = await fetch("https://api.tk-everyday.site/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    saveUser(data);
  } else {
    clearTokens();
    clearUser();
    window.location.href = "/login";
    throw new Error("다시 로그인해주세요.");
  }
}
