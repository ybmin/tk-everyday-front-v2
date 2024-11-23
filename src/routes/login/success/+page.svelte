<script lang="ts">
    import { onMount } from 'svelte';
    import {currentUser, fetchCurrentUser} from '$lib/stores/auth';

    onMount(async () => {
        await fetchCurrentUser();
        if ($currentUser) {
            setTimeout(() => {
                window.location.href = '/';
            }, 3000);
        }
    });
</script>

<div class="container align-middle my-28 lg:my-72">
    <div class="card shadow-2xl">
        <div class="card-body">
            <h2 class="text-2xl">카카오 로그인 성공</h2>
            <p>카카오 로그인이 성공적으로 완료되었습니다.</p>
            <p>잠시 후 메인 페이지로 이동합니다.</p>
        </div>
    </div>
</div>