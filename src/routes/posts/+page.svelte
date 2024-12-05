<script lang="ts">
    import type { Post } from "$lib/types/posts";
  import { Role } from "$lib/types/role";

    export let data:{posts:Post[]};

</script>

<svelte:head>
    <title>공지 및 정보</title>
    <meta property="og:title" content="공지 및 정보">
    <meta property="og:description" content="공지 및 정보 게시판입니다.">
</svelte:head>

<div class="flex flex-col justify-start items-center mb-24">
    <h1 class="text-4xl font-bold mb-10"> 게시글 </h1>
    <ul>
        {#each data.posts as post, i}
                <a class="card card-bordered bg-base-100 w-fit shadow-xl lg:w-[650px]" href={`posts/${post.slug}`}>
                    <div class="card-body">
                    <h2 class="card-title">
                        {post.title}
                        {#if i < 3}
                        <div class="badge badge-secondary">NEW</div>
                        {/if}
                    </h2>
                    <p>{post.description}</p>
                    <div class="card-actions justify-end items-start flex-col lg:flex-row lg:items-center">
                        <div class=" flex text-sm items-center gap-2">{new Date(post.date).toLocaleString()} • {post.user.name}
                            {#if post.user.role < 2}
                            <div class={`tooltip ${post.user.role === 0?"fill-secondary":"fill-accent"}`} data-tip="{Role[post.user.role as keyof typeof Role]} 계정입니다.">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-4">
                                    <path d="M13.92 3.845a19.362 19.362 0 0 1-6.3 1.98C6.765 5.942 5.89 6 5 6a4 4 0 0 0-.504 7.969 15.97 15.97 0 0 0 1.271 3.34c.397.771 1.342 1 2.05.59l.867-.5c.726-.419.94-1.32.588-2.02-.166-.331-.315-.666-.448-1.004 1.8.357 3.511.963 5.096 1.78A17.964 17.964 0 0 0 15 10c0-2.162-.381-4.235-1.08-6.155ZM15.243 3.097A19.456 19.456 0 0 1 16.5 10c0 2.43-.445 4.758-1.257 6.904l-.03.077a.75.75 0 0 0 1.401.537 20.903 20.903 0 0 0 1.312-5.745 2 2 0 0 0 0-3.546 20.902 20.902 0 0 0-1.312-5.745.75.75 0 0 0-1.4.537l.029.078Z" />
                                    </svg>                  
                            </div>
                            {/if} 
                            <div class="tooltip fill-primary" data-tip="해당 유저는 스팀 계정 연동을 통한{"\n"}철권 계정 인증이 완료된 유저입니다.">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-4">
                                    <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div class="flex-row">
                            {#each post.categories as category}
                            <div class="badge badge-outline mr-2">{category}</div>
                            {/each}
                        </div>
                    </div>
                    </div>
                </a>
        {/each}
    </ul>
</div>