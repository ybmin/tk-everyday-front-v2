<script lang="ts">
    import WideLogo from "../../assets/tk_ed_logo_wide.svelte";
    import {getUser
    } from "$lib/utils/user";
    import type {User} from "$lib/utils/user";
    import {onMount} from "svelte";

    let user: User | null = null;
    onMount(async () => {
      user = getUser();
    });
   
</script>

<div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden px-3 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow">
          <li><a href="/info">정보</a></li>
          <li><a href="/tekkenUser/search">유저 검색</a></li>
          <li>
            <details>
              <summary>블로그</summary>
              <ul class="p-2">
                <li><a href="/blogs">조회하기</a></li>
                <li><a href="/blogs/write">작성하기</a></li>
              </ul>
            </details>
          </li>
          <summary>테마</summary>
          <li class="join join-vertical">
            <input
            type="radio"
            name="theme-buttons"
            class="btn theme-controller join-item"
            aria-label="Dark"
            value="dark" />
            <input
            type="radio"
            name="theme-buttons"
            class="btn theme-controller join-item"
            aria-label="Sunset"
            value="sunset" />
        </li>
        </ul>
      </div>
      <a class="btn btn-ghost w-48 h-16 px-0" href="/">
        <WideLogo className="w-48 h-16"/>
      </a>
    </div>
    <div class="navbar-center hidden lg:flex px-0 z-50">
      <ul class="menu menu-horizontal px-1 ">
        <li><a href="/info">정보</a></li>
        <li>
          <details>
            <summary>블로그</summary>
            <ul class="p-2 z-50">
              <li><a href="/blogs">보기</a></li>
              <li><a href="/blogs/write">작성</a></li>
            </ul>
          </details>
        </li>
        <li><a href="/tekkenUser/search">유저 검색</a></li>
        <!-- <li><a>Item 3</a></li> -->
      </ul>
    </div>
    <div class="navbar-end">
      {#if user && user.nickname}
        <a class="btn btn-active btn-secondary" href="/profile">{user?.nickname}</a>
      {:else}
      <a class="btn btn-active btn-primary" href="/login">로그인</a>
      {/if}
        <div class="dropdown dropdown-end hidden lg:flex">
            <div tabindex="0" role="button" class="btn m-1">
            테마
            <svg
                width="12px"
                height="12px"
                class="inline-block h-2 w-2 fill-current opacity-60"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048">
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
            </div>
        <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
            <ul tabindex="0" class="dropdown-content bg-base-300 rounded-box z-50 w-52 p-2 overflow-y-auto shadow-2xl">
                <!-- <li>
                <input
                    type="radio"
                    name="theme-dropdown"
                    class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Light"
                    value="light" />
                </li> -->
                <li>
                <input
                    type="radio"
                    name="theme-dropdown"
                    class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Dark"
                    value="dark" />
                </li>
                <!-- <li>
                <input
                    type="radio"
                    name="theme-dropdown"
                    class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Retro"
                    value="retro" />
                </li> -->
                <li>
                <input
                    type="radio"
                    name="theme-dropdown"
                    class="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                    aria-label="Sunset"
                    value="sunset" />
                </li>
            </ul>
        </div>
    </div>
</div>
