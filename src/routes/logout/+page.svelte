<script lang="ts">
    import { onMount } from 'svelte';
    import {getRefreshToken,clearTokens } from "$lib/utils/auth";
    import {clearUser} from "$lib/utils/user";
  import { apiRequest } from '$lib/utils/api';

    onMount(async () => {
        const refreshToken = getRefreshToken();
        const response = await apiRequest('https://api.tk-everyday.site/logout', {
            method: 'POST',
            body: JSON.stringify({
                refresh_token: refreshToken
            })
        });
        clearTokens();
        clearUser();
        setTimeout(() => {
            window.location.href = '/';
        }, 3000);
    });
</script>

<div>
    로그아웃 중입니다.
</div>