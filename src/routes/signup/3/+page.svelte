<script lang="ts">
  import {onMount} from "svelte";
  import { apiRequest, apiUpdateUser } from "$lib/utils/api";
  import { setTokens } from "$lib/utils/auth";
  import { get } from "svelte/store";
  import { getUser } from "$lib/utils/user";
  import type { User } from "$lib/utils/user";

  let nickname = '';
  let email = '';
  let password = '';

  onMount(async () => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
      const url = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, url);
      await apiUpdateUser();
      const user:User|null = getUser();
      if (user && user.nickname) {
        window.location.href = '/signup/4';
      }
    }
  });
  async function handleSubmit() {
    const data = { nickname, email, password };
    if (!nickname || !email || !password) {
      alert('모든 정보를 입력해주세요.');
      return;
    }
    if (!/^[A-Za-z0-9]{2,12}$/.test(nickname)) {
      alert('닉네임은 2자이상 12자리 이하 영문과 숫자로 이루어져야 합니다.');
      return;
    } 
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password)) {
      alert('비밀번호는 영문, 숫자, 특수기호를 모두 하나 이상 포함한 8자 이상 16자 이내로 이루어져야 합니다.');
      return;
    }
    try {
      const response = await apiRequest('https://api.tk-everyday.site/auth/link/email', {
        method: 'POST', 
        body:
          JSON.stringify(data),
      });
      if (response?.ok && response?.status === 200) {
        window.location.href = '/signup/4';
      }
      else if (response?.status === 409){
        const responseData = await response.json();
        alert(responseData.msg);
      }
      else if (response?.status === 400){
        alert('회원정보 수정에서 정보를 수정해주세요.');
        window.location.href = '/';
      }
      else if (response?.status === 401){
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
      }
    } catch (error) {
      alert('로그인이 필요합니다.');
      window.location.href = '/login';
    }
  }
</script>

<ul class="steps mx-auto w-full mb-24 mt-10">
    <li class="step step-primary">회원가입</li>
    <li class="step step-primary">카카오 로그인</li>
    <li class="step step-primary">기본 정보 입력</li>
    <li class="step ">(선택) 철권 계정 연동</li>
    <li class="step">회원가입 완료</li>
  </ul>
<div class="w-full content-center mt-16 mb-28 xl:mb-72 xl:mt-52">
  <div role="alert" class="alert alert-info mx-20 mb-20">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="h-6 w-6 shrink-0 stroke-current">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>닉네임은 한번 결정하면 수정이 불가능합니다.</span>
  </div>
  <div class="w-full p-6 m-auto bg-base-200 rounded-md shadow-md flex flex-col prose justify-center items-center lg:max-w-lg">
      <h2 >기본 정보 입력</h2>

      <form on:submit|preventDefault={handleSubmit} class="form-control gap-8">
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" class="grow" placeholder="Nickname" on:change={(e)=>{
            nickname = (e.target as HTMLInputElement).value;
          }}
          value={nickname}
          />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="email" class="grow" placeholder="Email" on:change={(e)=>{
            email = (e.target as HTMLInputElement).value;
          }}
          value={email}
          />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd" />
          </svg>
          <input type="password" class="grow" placeholder="Password" on:change={(e)=>{
            password = (e.target as HTMLInputElement).value;
          }}
          value={password}
          />
        </label>
        <button type="submit" class="btn btn-primary">다음</button>
      </form>

  </div>
</div>