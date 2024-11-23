// src/lib/utils/api.ts
export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(endpoint, {
    ...options,
    credentials: "include", // 쿠키를 포함하여 요청
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  // 서버에서 401 응답 시 로그인 페이지로 리디렉션
  if (response.status === 401) {
    window.location.href = "/login";
    throw new Error("Unauthorized");
  }

  return response;
}
