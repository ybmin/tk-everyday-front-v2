<script lang="ts">
  import TekkenChar from "$lib/components/TekkenChar.svelte";
  import TekkenRank from "$lib/components/TekkenRank.svelte";
  import { Role } from "$lib/types/role";

    export let data:{meta:any, content:any};
</script>



<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
    <meta property="og:description" content={data.meta.description} />
</svelte:head>

<article  class="flex flex-col items-start prose prose-2xl mx-auto my-24 overflow-scroll">
    <button class="btn btn-ghost mb-6" onclick={()=>{window.history.back()}}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
      </svg>
      뒤로가기</button>

  <div class="space-x-4">
    {#each data.meta.categories as category}
      <span class="badge badge-outline badge-lg"
        >{category}</span
      >
    {/each}
  </div>
    <h1 class="mt-2 text-6xl">
        {data.meta.title}
    </h1>
    <div class="flex flex-row w-max gap-4 items-center">
        <div class="flex flex-col w-max">
            <div class="flex flex-row justify-start gap-2 items-center w-max mb-2">
                <a class="text-2xl font-bold" href={`/user/${data.meta.user.id}`}>
                    {data.meta.user.name}
                </a>
                {#if data.meta.user.role < 2}
                <div class={`tooltip ${data.meta.user.role === 0?"fill-secondary":"fill-accent"}`} data-tip="{Role[data.meta.user.role as keyof typeof Role]} 계정입니다.">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-6">
                        <path d="M13.92 3.845a19.362 19.362 0 0 1-6.3 1.98C6.765 5.942 5.89 6 5 6a4 4 0 0 0-.504 7.969 15.97 15.97 0 0 0 1.271 3.34c.397.771 1.342 1 2.05.59l.867-.5c.726-.419.94-1.32.588-2.02-.166-.331-.315-.666-.448-1.004 1.8.357 3.511.963 5.096 1.78A17.964 17.964 0 0 0 15 10c0-2.162-.381-4.235-1.08-6.155ZM15.243 3.097A19.456 19.456 0 0 1 16.5 10c0 2.43-.445 4.758-1.257 6.904l-.03.077a.75.75 0 0 0 1.401.537 20.903 20.903 0 0 0 1.312-5.745 2 2 0 0 0 0-3.546 20.902 20.902 0 0 0-1.312-5.745.75.75 0 0 0-1.4.537l.029.078Z" />
                        </svg>                  
                </div>
                {/if} 
                <div class="tooltip fill-primary" data-tip="해당 유저는 스팀 계정 연동을 통한{"\n"}철권 계정 인증이 완료된 유저입니다.">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-6">
                        <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <a class="btn ml-auto" href={`/user/${data.meta.user.id}`}>
                    프로필 메뉴
                </a>
            </div>
            <span class="font-bold text-sm">{new Date(data.meta.date).toLocaleString()}</span>
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
    <svelte:component this={data.content} />
    <a class="stats shadow w-full mt-8 mb-4" href={`/tekkenUser/player/${data.meta.user.polaris_id}`} style="text-decoration: none;">
        <div class="stat">
            <div class="stat-figure text-secondary">
                <div class="flex flex-col lg:flex-row gap-2 items-center">
                    <TekkenChar char={data.meta.user.char} />
                    <TekkenRank width={"100px"} rank={data.meta.user.rank}/>
                </div>
            </div>
            <div class="stat-value text-pretty">{data.meta.user.name}</div>
            <div class="stat-desc">{data.meta.user.polaris_id}</div>
            <div class="stat-desc text-secondary">랭크 기준: {new Date(data.meta.date).toLocaleString("ko-KR")}</div>
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
        <div class="flex flex-col w-full">
            <div class="flex flex-row justify-start gap-2 items-center w-full mb-2">
                <a class="text-2xl font-bold" href={`/user/${data.meta.user.id}`}>{data.meta.user.name}
                </a>
                {#if data.meta.user.role < 2}
                <div class={`tooltip ${data.meta.user.role === 0?"fill-secondary":"fill-accent"}`} data-tip="{Role[data.meta.user.role as keyof typeof Role]} 계정입니다.">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-8">
                        <path d="M13.92 3.845a19.362 19.362 0 0 1-6.3 1.98C6.765 5.942 5.89 6 5 6a4 4 0 0 0-.504 7.969 15.97 15.97 0 0 0 1.271 3.34c.397.771 1.342 1 2.05.59l.867-.5c.726-.419.94-1.32.588-2.02-.166-.331-.315-.666-.448-1.004 1.8.357 3.511.963 5.096 1.78A17.964 17.964 0 0 0 15 10c0-2.162-.381-4.235-1.08-6.155ZM15.243 3.097A19.456 19.456 0 0 1 16.5 10c0 2.43-.445 4.758-1.257 6.904l-.03.077a.75.75 0 0 0 1.401.537 20.903 20.903 0 0 0 1.312-5.745 2 2 0 0 0 0-3.546 20.902 20.902 0 0 0-1.312-5.745.75.75 0 0 0-1.4.537l.029.078Z" />
                        </svg>                  
                </div>
                {/if} 
                <div class="tooltip fill-primary" data-tip="해당 유저는 스팀 계정 연동을 통한{"\n"}철권 계정 인증이 완료된 유저입니다.">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-8">
                        <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                    </svg>
                </div>
                <a class="btn ml-auto" href={`/user/${data.meta.user.id}`}>
                    프로필 메뉴
                </a>
            </div>
            <span class="font-bold text-sm">{new Date(data.meta.date).toLocaleString()}</span>
        </div>
    </div>
    <div class="divider divider-start">
        <h5 class="font-bold">Comment</h5>
    </div>
</article>