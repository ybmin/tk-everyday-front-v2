// src/lib/stores/auth.ts
import { writable } from "svelte/store";
import { apiRequest } from "$lib/utils/api";
import { navigate } from "svelte-routing";

interface User {
  id: number;
  email: string;
  name: string;
  role: number;
}

// 인증된 사용자 정보를 저장하는 스토어
export const currentUser = writable<User | null>(null);

// 사용자 정보를 서버에서 가져오는 함수
export async function fetchCurrentUser() {
  try {
    const response = await apiRequest("https://api.tk-everyday.site/users/me");
    if (response.ok) {
      const user: User = await response.json();
      currentUser.set(user);
    } else {
      currentUser.set(null);
      navigate("/login");
    }
  } catch (error) {
    currentUser.set(null);
    navigate("/login");
  }
}

// 애플리케이션 시작 시 사용자 정보 로드
fetchCurrentUser();
