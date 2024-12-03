<script lang="ts">
  import { onMount } from 'svelte';
  import {apiUpdateUser, apiRequest} from '$lib/utils/api';
  import {getUser} from '$lib/utils/user';
  import type { User } from '$lib/utils/user';
  async function handleClick() {
    polaris_id = polaris_id.replace(/-/g, '');
    if (!/^[A-Za-z0-9]{12}$/.test(polaris_id)) {
      alert("Polaris ID must be 12 characters long and contain only letters and numbers.");
      return;
    }
    if (user && user.steam_id !== ""){
      const response = await apiRequest(`https://api.tk-everyday.site/auth/link/polaris?polaris_id=${polaris_id}`,{
        method: 'POST'
      });
      if (response?.ok) {
        alert("철권 계정 연동이 완료되었습니다.");
        window.location.href = '/signup/5';
      } else {
        alert("철권 계정 연동에 실패했습니다.");
      }
    }
  }
  let user: User|null = null;
  let polaris_id = '';
  onMount(async () => {
    await apiUpdateUser();
    user = getUser();
    if (!user || !user.steam_id) {
      alert("먼저 스팀 계정을 연동해주세요.");
      window.location.href = '/signup/3';
    }
  });
</script>

<ul class="steps mx-auto w-full mb-24 mt-10">
    <li class="step step-primary">회원가입</li>
    <li class="step step-primary">카카오 로그인</li>
    <li class="step step-primary">기본 정보 입력</li>
    <li class="step step-primary">(선택) 철권 계정 연동</li>
    <li class="step">회원가입 완료</li>
  </ul>
<div class="w-full content-center mt-16 mb-28 xl:mb-72 xl:mt-52">
    <div class="w-full p-6 m-auto bg-base-200 rounded-md shadow-md flex flex-col prose justify-center items-center lg:max-w-lg">
        <h2 >(선택) 철권 계정 연동</h2>
        {#if user && user.steam_id}
        <span class="text-base-content/70 py-4 font-light md:text-base">본인의 철권 Polaris ID를 입력해주세요</span>
        <input type="text" class="input input-bordered" placeholder="Polaris ID" value={polaris_id} on:change={(value)=>
        {
          polaris_id = (value.target as HTMLInputElement).value;
        }}/>
        <button class="btn btn-primary btn-lg mt-10" on:click={handleClick}>철권 계정 인증하기</button>
        {:else}
        <span class="loading loading-spinner loading-lg"></span>
        {/if}
    </div>
</div>