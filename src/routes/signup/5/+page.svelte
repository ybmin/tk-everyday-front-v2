<script lang="ts">
  import {onMount} from "svelte";
  import { apiUpdateUser } from "$lib/utils/api";
  import { getUser } from "$lib/utils/user";
  import type { User } from "$lib/utils/user";

  let user:User|null = null;
  onMount(()=>{
      apiUpdateUser();
      user = getUser();
      if (!user) {
        alert("로그인이 필요합니다.");
        window.location.href = '/login';
      }
  });
</script>

<ul class="steps mx-auto w-full mb-24 mt-10">
    <li class="step step-primary">회원가입</li>
    <li class="step step-primary">카카오 로그인</li>
    <li class="step step-primary">기본 정보 입력</li>
    <li class="step step-primary">(선택) 철권 계정 연동</li>
    <li class="step step-primary">회원가입 완료</li>
  </ul>
<div class="w-full content-center mt-16 mb-28 xl:mb-72 xl:mt-52">
    {#if user && user.nickname !== ""}
    <div class="w-full p-6 m-auto bg-base-200 rounded-md shadow-md flex flex-col prose justify-center items-center lg:max-w-lg">
        <h2 >회원가입 완료</h2>
        <h4>{user.nickname}님!{#if user.polaris_id !== ""}
            <div class="tooltip" data-tip="스팀 계정 연동을 통한 인증이 완료된 유저입니다.">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-10">
                  <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
              </svg>
            </div>
            {/if}
          회원가입이 완료되었습니다. <br>이제부터 TK Everyday를 이용하실 수 있습니다.</h4>
        <a class="btn btn-primary btn-lg mt-10" href="/">지금 바로 시작하기 →</a>
    </div>
    {:else}
    <span class="loading loading-spinner loading-lg"></span>
    {/if}
</div>