<script lang="ts">
    import { onMount } from 'svelte';
    import {getRefreshToken,clearTokens } from "$lib/utils/auth";
    import {clearUser} from "$lib/utils/user";
  import { apiRequest } from '$lib/utils/api';

    onMount(async () => {
        const refreshToken = getRefreshToken();
        const response = await apiRequest(`https://api.tk-everyday.site/logout?refresh_token=${refreshToken}`, {
            method: 'POST'
        });
        if(response?.ok){
            console.log('로그아웃 성공');
        }
        clearTokens();
        clearUser();
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    });
</script>

<div class="w-full my-56 align-middle items-center justify-center">
    <div class="loading-spinner loading-lg"></div>
    <h2>로그아웃 중입니다.</h2>
</div>