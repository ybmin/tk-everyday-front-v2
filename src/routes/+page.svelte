<script lang="ts">
    import KakaoLogo from "../assets/kakao_logo.svelte"; 
    import ContentED from "../assets/content_ed.webp";
    import  TekkenUser  from "$lib/components/TekkenUser.svelte";
    let spacing = 0;
    import { onMount } from 'svelte';
  import SteamLogo from "../assets/steam_logo.svelte";

    onMount(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = 500
            spacing = Math.min(scrollTop / docHeight, 1);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });
    onMount(()=>{
        const worldFirstObserver = new IntersectionObserver((entries)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        (entry.target as HTMLElement).style.opacity = "1";
                    }
                    else{
                        (entry.target as HTMLElement).style.opacity = "0.1";
                    }
                });
            }, {
                root: null,
                rootMargin: '0px 0px -50% 0px',
                threshold: 0
            });
        let h2 = document.querySelectorAll('h2');
        let h3 = document.querySelectorAll('h3');
        let tku = document.querySelectorAll('.tekkenuser-container');
        worldFirstObserver.observe(h2[0] as HTMLElement);
        worldFirstObserver.observe(h2[1] as HTMLElement);
        worldFirstObserver.observe(h2[2] as HTMLElement);
        worldFirstObserver.observe(h2[3] as HTMLElement);
        worldFirstObserver.observe(h2[4] as HTMLElement);
        worldFirstObserver.observe(h3[0] as HTMLElement);
        
        const buttonObserve = new IntersectionObserver((entries)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        (entry.target as HTMLElement).style.opacity = "1";
                        (entry.target as HTMLElement).style.transform = "translateX(30%) translateY(-100px)";
                    }
                    else{
                        (entry.target as HTMLElement).style.opacity = "0";
                        (entry.target as HTMLElement).style.transform = "translateX(0px) translateY(-100px)";
                    }
                });
            }, {
                root: null,
                rootMargin: '0px 0px -40% 0px',
                threshold: 0
            });
        
            const buttonObserve2 = new IntersectionObserver((entries)=>{
                entries.forEach((entry)=>{
                    if(entry.isIntersecting){
                        (entry.target as HTMLElement).style.opacity = "1";
                        (entry.target as HTMLElement).style.transform = "translateX(90%) translateY(50px)";
                    }
                    else{
                        (entry.target as HTMLElement).style.opacity = "0";
                        (entry.target as HTMLElement).style.transform = "translateX(130%) translateY(50px)";
                    }
                });
            }, {
                root: null,
                rootMargin: '0px 0px -50% 0px',
                threshold: 0
            });
        let button = document.querySelectorAll('button');
        buttonObserve.observe(button[0] as HTMLElement);
        buttonObserve2.observe(button[1] as HTMLElement);

        const gridObserve = new IntersectionObserver((entry)=>{
            entry.forEach((entry)=>{
            if(entry.isIntersecting){
                (entry.target as HTMLElement).style.opacity = "1";
                (entry.target as HTMLElement).style.transform = "translateY(0px)";
            }
            else{
                (entry.target as HTMLElement).style.opacity = "0";
                (entry.target as HTMLElement).style.transform = "translateY(100px)";
            }
        });
        }, {
            root: null,
            rootMargin: '0px 0px -50% 0px',
            threshold: 0
        });
        
        let grid = document.querySelector('.grid');
        gridObserve.observe(grid as HTMLElement);
    })
    
    const userTestimonials = [
    {
        name: "WarQueen",
        id: "3RHTmh8ThQ6j",
    },
    {
        name: "ybminm",
        id: "5m3qhrAgaHJr",
    },
    {
        name: "불바퀴",
        id: "3GfHyrtmJR6Q",
    },
    {
        name: "상회",
        id: "65Ed4E2aGiJG",
    },
    {
        name: "짜장면",
        id: "4hqeY4YbhfrB",
    },
    {
        name: "LARK",
        id: "4g6Jbq8HRajh",
    },
    {
        name: "꼬마유령",
        id: "3eDQhd5bBTyQ",
    },
    { name: "김노멀", id: "3hEbtB5qFm4J" },
    { name: "레이븐데뷔생", id: "3bGRbbTba8Ba" },
    { name: "KATASTRY", id: "2Qhqfdb9yMyQ" },
    { name: "춘식이", id: "5gMtFb4YDnTn" },
    { name: "여우", id: "3MNE44FaeGdn" },
    { name: "Ninesquare", id: "5Dr2JfNb7QMG" },
    { name: "GangKing", id: "5eb5in879ehh" },
    { name: "규", id: "4i7jYFEyhY24" },
    { name: "Voyy", id: "3yYmLBALt4fh" },
    { name: "주먹밥", id: "5m8YretfTgdy" },
    { name: "소림", id: "2JgJA5fL5qQy" },
    ];
</script>


<div class="text-center md:container md:mx-auto py-24">
    <h1 class="font-title relative z-[2] mx-auto my-10 text-[clamp(2rem,6vw,4.5rem)] font-black leading-none will-change-auto [transform:translate3d(0,0,0)] motion-reduce:!tracking-normal max-[1279px]:!tracking-normal"
    >
        <span class="mb-5 bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text will-change-auto [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] motion-reduce:!tracking-normal max-[1279px]:!tracking-normal [@supports(color:oklch(0%_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)]"
        style={`letter-spacing: ${0.5-spacing}rem;`}>
            Tekken EveryDay
        </span>
    </h1>
    <p class="font-title relative z-[2] mx-auto mb-5 text-[clamp(2rem,6vw,4.5rem)] font-black leading-none will-change-auto [transform:translate3d(0,0,0)] motion-reduce:!tracking-normal max-[1279px]:!tracking-normal"
    style={`letter-spacing: ${spacing}rem;`}>
    철권 8 클랜
    </p>
    <p class="text-base-content/70 font-title py-4 font-light md:text-2xl">철권 클랜 Everyday 입니다. 철권 시리즈를 즐기는 모든 분들을 위한 커뮤니티입니다.</p>
</div>

<div class="md:container md:mx-auto py-5 align-middle">
    <img src={ContentED} alt="ContentED" class="mx-5 justify-self-center w-full min-w-[300px] md:max-w-[1200px] h-auto mt-4 mb-72 rounded-lg shadow-[0px_0px_10px_1px_theme(colors.secondary)]">
</div>

<div class="relative flex flex-col items-center justify-center gap-10 px-4 md:px-10 xl:flex-row xl:gap-20 mt-96">
    <div class="md:container py-2 mb-10">
        <button class="bg-[#FFEB00] text-[#3C1E1E] btn btn-lg hover:bg-[#e6d700] " style="transition: 2s;">
            <KakaoLogo width={20}/> 카카오로 로그인</button>
        <button class="bg-black text-white btn btn-lg " style="transition: 2s;">
            <SteamLogo className={"w-6"}/> 스팀으로 연동</button>
    </div>
    <div class="md:container md:mx-auto py-2 text-left mb-24">
        <h2 class="font-title relative z-[2] mx-auto my-1 font-black leading-none will-change-auto text-5xl ">
            철권 역사 최초
        </h2>
        <h2 class="font-title relative z-[2] mx-auto my-1 font-black leading-none text-5xl bg-[linear-gradient(90deg,theme(colors.error)_0%,theme(colors.secondary)_9%,theme(colors.secondary)_42%,theme(colors.primary)_47%,theme(colors.accent)_100%)] bg-clip-text will-change-auto [-webkit-text-fill-color:transparent] [transform:translate3d(0,0,0)] motion-reduce:!tracking-normal max-[1279px]:!tracking-normal [@supports(color:oklch(0%_0_0))]:bg-[linear-gradient(90deg,oklch(var(--s))_4%,color-mix(in_oklch,oklch(var(--s)),oklch(var(--er)))_22%,oklch(var(--p))_45%,color-mix(in_oklch,oklch(var(--p)),oklch(var(--a)))_67%,oklch(var(--a))_100.2%)] ">
            1인 1계정
        </h2>
        <h2 class="font-title relative z-[2] mx-auto my-1 font-black leading-none will-change-auto text-5xl">
            &
        </h2>
        <h2 class="font-title relative z-[2] mx-auto my-1 font-black leading-none will-change-auto text-5xl">
            철권 ID 연동
        </h2>
        <h2 class="font-title relative z-[2] mx-auto my-1 font-black leading-none will-change-auto text-5xl">
            커뮤니티
        </h2>
        <p class="text-base-content/70 font-title py-4 font-light md:text-2xl">카카오 연동 로그인만을 지원하기에, 다중 계정 생성을 방지하고, <br/> 스팀 로그인을 통한 철권 계정 인증이 가능합니다. </p>
        <p class="text-base-content/70 font-title py-4 font-bold md:text-sm">(*철권 계정 연동은 tekken net과 같은 지원종료된 사이트 제외 기준)</p>
        <a class="btn btn-primary btn-lg mt-10" href="/signup">지금 가입하기 →</a>
    </div>
</div>
<div class="md:container md:mx-auto py-2 text-left mb-24 mt-96">
    <h3 class="font-title relative z-[2] mx-auto my-1 font-black leading-none will-change-auto text-5xl ">클랜원</h3>
    <p class="text-base-content/70 font-title py-4 font-light md:text-2xl">EveryDay 클랜원들을 소개합니다.</p>
    <div class="grid">
        {#each userTestimonials as { name, id }}
            <TekkenUser polarisId={id} name={name} />
        {/each}
        <!-- Add more members as needed -->
    </div>
</div>



<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-auto-flow: dense;
        gap: 1rem;
        margin-left: 1rem;
        margin-right: 1rem;
        transition: 2s;
    }
</style>    