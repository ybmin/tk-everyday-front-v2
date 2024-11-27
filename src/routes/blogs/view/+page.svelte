<script>

  import EditorViewer from "$lib/components/editorViewer.svelte";
import TekkenChar from "$lib/components/TekkenChar.svelte";
  import TekkenRank from "$lib/components/TekkenRank.svelte";
  import { onMount } from "svelte";

  onMount(async () => {
    
  });

</script>

<svelte:head>
    <title>블로그 작성하기</title> 
</svelte:head>

<article  class="flex flex-col items-start prose prose-2xl mx-auto my-24">
    <div class="badge badge-outline">카테고리</div>
    <h1 class="mt-2 text-6xl">
        제목
    </h1>
    <div class="flex flex-row w-full gap-4 items-center">
        <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content w-24 rounded-full">
              <span class="text-3xl">닉</span>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start gap-2 items-center w-full mb-2">
                <a class="text-2xl font-bold">
                    닉네임
                </a>
                <div class="text-primary">
                <svg width="18" height="18" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_352_2265)">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M6.9744 0.406891C6.35673 -0.13563 5.43238 -0.135631 4.81469 0.406891L4.02216 1.10298C3.79791 1.29994 3.52407 1.43181 3.23027 1.48433L2.1919 1.66996C1.38262 1.81463 0.806313 2.5373 0.845351 3.35848L0.895435 4.41212C0.909606 4.71025 0.841975 5.00657 0.699856 5.26901L0.197572 6.19658C-0.193897 6.91953 0.0117842 7.82067 0.678153 8.30215L1.53315 8.91993C1.77506 9.09469 1.96457 9.33235 2.08115 9.60709L2.49318 10.5781C2.81431 11.3349 3.64709 11.7359 4.43901 11.5151L5.45509 11.2319C5.7426 11.1517 6.04653 11.1517 6.33404 11.2319L7.35011 11.5151C8.142 11.7359 8.9748 11.3349 9.29591 10.5781L9.70794 9.60709C9.82451 9.33235 10.0141 9.09469 10.256 8.91993L11.111 8.30215C11.7773 7.82067 11.983 6.91953 11.5915 6.19658L11.0893 5.26901C10.9471 5.00657 10.8795 4.71025 10.8937 4.41212L10.9437 3.35849C10.9828 2.5373 10.4065 1.81463 9.59722 1.66996L8.55884 1.48433C8.265 1.43181 7.99118 1.29994 7.76695 1.10298L6.9744 0.406891ZM8.38871 4.63162C8.53462 4.45914 8.51313 4.20101 8.34065 4.05507C8.16818 3.90914 7.91002 3.93065 7.76411 4.10313L5.32579 6.98487C5.26082 7.06167 5.13792 7.04411 5.09708 6.95215L4.35819 5.28935C4.26644 5.08289 4.02469 4.98988 3.81822 5.08163C3.61175 5.17338 3.51875 5.41513 3.6105 5.62162L4.34939 7.28444C4.63529 7.9278 5.49562 8.05085 5.95036 7.51336L8.38871 4.63162Z"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_352_2265">
                    <rect width="12" height="12" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                </div>
                <div class="btn ml-auto">
                    프로필 메뉴
                </div>
            </div>
            <span class="font-bold text-sm">2024년 11월 22일 오후 01시 40분</span>
        </div>
    </div>
    <div class="w-full">
        <div class="divider"> </div>
        <div class="flex flex-row gap-2">
            <div class="btn btn-ghost"> 좋아요</div>
            <div class="btn btn-ghost">댓글</div>
            <div class="btn btn-ghost ml-auto">공유</div> 
        </div>
        <div class="divider"> </div>
    </div>
    <div class="w-full">
        <EditorViewer />
    </div>
    <a class="stats shadow w-full mt-8 mb-4" href="/tekkenUser/player">
        <div class="stat">
            <div class="stat-figure text-secondary">
                <div class="flex flex-col lg:flex-row gap-2 items-center">
                    <TekkenChar char={"3"} />
                    <TekkenRank width={"100px"} rank={"24"}/>
                </div>
            </div>
            <div class="stat-value text-pretty">닉네임</div>
            <div class="stat-title">뭐시깽뭐시깽</div>
            <div class="stat-desc text-secondary">마지막 접속: {new Date(1732393680*1000).toLocaleString("ko-KR")}</div>
        </div>
    </a>    
    <div class="w-full">
        <div class="divider"> </div>
        <div class="flex flex-row gap-2">
            <div class="btn btn-ghost"> 좋아요</div>
            <div class="btn btn-ghost">댓글</div>
            <div class="btn btn-ghost ml-auto">공유</div> 
        </div>
        <div class="divider"> </div>
    </div>
    <div class="flex flex-row w-full gap-4 items-center my-4">
        <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content w-24 rounded-full">
              <span class="text-3xl">닉</span>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start gap-2 items-center w-full mb-2">
                <a class="text-2xl font-bold">닉네임
                </a>
                <div class="text-primary">
                <svg width="18" height="18" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_352_2265)">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M6.9744 0.406891C6.35673 -0.13563 5.43238 -0.135631 4.81469 0.406891L4.02216 1.10298C3.79791 1.29994 3.52407 1.43181 3.23027 1.48433L2.1919 1.66996C1.38262 1.81463 0.806313 2.5373 0.845351 3.35848L0.895435 4.41212C0.909606 4.71025 0.841975 5.00657 0.699856 5.26901L0.197572 6.19658C-0.193897 6.91953 0.0117842 7.82067 0.678153 8.30215L1.53315 8.91993C1.77506 9.09469 1.96457 9.33235 2.08115 9.60709L2.49318 10.5781C2.81431 11.3349 3.64709 11.7359 4.43901 11.5151L5.45509 11.2319C5.7426 11.1517 6.04653 11.1517 6.33404 11.2319L7.35011 11.5151C8.142 11.7359 8.9748 11.3349 9.29591 10.5781L9.70794 9.60709C9.82451 9.33235 10.0141 9.09469 10.256 8.91993L11.111 8.30215C11.7773 7.82067 11.983 6.91953 11.5915 6.19658L11.0893 5.26901C10.9471 5.00657 10.8795 4.71025 10.8937 4.41212L10.9437 3.35849C10.9828 2.5373 10.4065 1.81463 9.59722 1.66996L8.55884 1.48433C8.265 1.43181 7.99118 1.29994 7.76695 1.10298L6.9744 0.406891ZM8.38871 4.63162C8.53462 4.45914 8.51313 4.20101 8.34065 4.05507C8.16818 3.90914 7.91002 3.93065 7.76411 4.10313L5.32579 6.98487C5.26082 7.06167 5.13792 7.04411 5.09708 6.95215L4.35819 5.28935C4.26644 5.08289 4.02469 4.98988 3.81822 5.08163C3.61175 5.17338 3.51875 5.41513 3.6105 5.62162L4.34939 7.28444C4.63529 7.9278 5.49562 8.05085 5.95036 7.51336L8.38871 4.63162Z"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_352_2265">
                    <rect width="12" height="12" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                </div>
                <div class="btn ml-auto">
                    프로필 메뉴
                </div>
            </div>
            <span class="font-bold text-sm">2024년 11월 22일 오후 01시 40분</span>
        </div>
    </div>
    <div class="divider divider-start">
        <h5 class="font-bold">Comment</h5>
    </div>
</article>