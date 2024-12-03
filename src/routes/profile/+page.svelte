<script lang="ts">
    import { onMount } from "svelte";
    import { apiUpdateUser } from "$lib/utils/api";
    import { getUser } from "$lib/utils/user";
    import {Role} from "$lib/types/role";
    import type { User } from "$lib/utils/user";
    
    let user: User | null = null;
    onMount(async () => {
        // await apiUpdateUser();
        // user = getUser();
        user = {"id":1,"nickname":"ybminm","email":"ybminm@kaist.ac.kr","kakao_id":"3703331366","steam_id":"asd","role":0,"is_active":true,"tekken_users":[],"block_histories":[]};
    });
</script>

<div class="w-full my-72 content-center justify-center ">
{#if user !== null}
    {#if !user.is_active}
    <div role="alert" class="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>해당 유저는 현재 접근이 차단된 {Role[user.role]}입니다.</span>
      </div>
    {/if}
    <div class="stats shadow w-full">
        <div class="stat">
          <div class="stat-title">계정 정보</div>
          <div class={`stat-value flex flex-row gap-2 my-4 items-center ${user.is_active ? "text-current" : "text-error"} fill-primary`} >{user.nickname}
            {#if user.role < 2}
            <div class={`tooltip ${user.role === 0?"fill-secondary":"fill-accent"}`} data-tip="{Role[user.role]} 계정입니다.">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-10">
                    <path d="M13.92 3.845a19.362 19.362 0 0 1-6.3 1.98C6.765 5.942 5.89 6 5 6a4 4 0 0 0-.504 7.969 15.97 15.97 0 0 0 1.271 3.34c.397.771 1.342 1 2.05.59l.867-.5c.726-.419.94-1.32.588-2.02-.166-.331-.315-.666-.448-1.004 1.8.357 3.511.963 5.096 1.78A17.964 17.964 0 0 0 15 10c0-2.162-.381-4.235-1.08-6.155ZM15.243 3.097A19.456 19.456 0 0 1 16.5 10c0 2.43-.445 4.758-1.257 6.904l-.03.077a.75.75 0 0 0 1.401.537 20.903 20.903 0 0 0 1.312-5.745 2 2 0 0 0 0-3.546 20.902 20.902 0 0 0-1.312-5.745.75.75 0 0 0-1.4.537l.029.078Z" />
                  </svg>                  
            </div>
            {/if}
            {#if user.steam_id !== ""} 
            <div class="tooltip" data-tip="해당 유저는 스팀 계정 연동을 통한 인증이 완료된 유저입니다.">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-10">
                    <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                </svg>
            </div>
            {/if}
          </div>
          <div class="stat-desc">
            {#if user.is_active}
              <span>활성화됨</span>
            {:else}
              <span>비활성화됨</span>
            {/if}
          </div>
        </div>
      </div>
{/if}
</div>