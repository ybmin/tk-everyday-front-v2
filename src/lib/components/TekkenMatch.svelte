<script lang="ts">
    import TekkenChar from "$lib/components/TekkenChar.svelte";
    import TekkenRank from "$lib/components/TekkenRank.svelte";

    export let matchId: string;
    let data:{
    battle_at: string,
    battle_id: string,
    game_version: Number,
    p1_chara_id: Number,
    p1_name: string,
    p1_polaris_id: string,
    p1_power: Number,
    p1_rank: Number,
    p1_rounds: Number,
    p1_user_id: Number,
    p2_chara_id: Number,
    p2_name: string,
    p2_polaris_id: string,
    p2_power: Number,
    p2_rank: Number,
    p2_rounds: Number,
    p2_user_id: Number,
    stage_id: Number,
    winner: Number,};
    let Loading = true;
    let isMobile = false;

    import { onMount } from 'svelte';

    onMount(async () => {
        const res = await fetch(`https://api.tk-everyday.site/battles/${matchId}`);
        data = await res.json();
        if(res.status === 404){
            Loading = false;
        }
    });

    onMount(() => {
        const checkMobile = () => {
            isMobile = window.innerWidth < 600;
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    });
</script>


{#if data?.game_version}
<div
    class="tekkenMatch-container"
    style="display: flex; flex-direction: row; align-items: center; "
    >
    <button
        style={!isMobile?"height: 100;maxWidth: 270px; display:flex; flex-direction:row; margin-right: auto;":"height: 100;maxWidth: 150px; display:flex; flex-direction:column; margin-right: auto;align-items:flex-start;"}
        onclick={() => {
        window.open(
            `https://wank.wavu.wiki/player/${data.p1_polaris_id}`
        );
        }}
    >
        <TekkenChar char={data.p1_chara_id.toString()} />
        <div
        style={`display:flex; flex-direction:column; width:${isMobile?"100":"150"}px; gap:1rem; align-content:center; align-items:center;`}>
        <p
            placeholder="p1 User"
            style={`padding:0;margin:0; max-lines:1;width:${isMobile?"100":"150"}px;max-height:60px;`} 
        >
            {data.p1_name}
    </p>
        <TekkenRank rank={data.p1_rank.toString()} width="100px" />
        </div>
    </button>
    <div
        style=
        "display: flex; flex-direction: column; height: 100; align-content: center; justify-items: flex-start;"
    >
        <p class="text-center ">
        {new Date(parseInt(data.battle_at) * 1000).toLocaleString("ko-KR")}
        </p>
        <h3
        class="mb-4 text-center text-overflow-ellipsis margin-bottom:0"
        >
            <p
                color={data.winner === 1 ? "#0B874A" : "#AD1B1B"}
            >
                {data.p1_rounds}
            </p>
            <p>:</p>
            <p
            color={data.winner === 2 ? "#0B874A" : "#AD1B1B"}
            >
                {data.p2_rounds}
            </p>
        </h3>
        <p class="text-center ">
        v.{data.game_version.toString().replaceAll("0", ".")}
        </p>
    </div>
    <button
    style={!isMobile?"height: 100;maxWidth: 270px; display:flex; flex-direction:row-reverse; margin-left: auto;":"height: 100;maxWidth: 100px; display:flex; flex-direction:column; margin-left: auto; align-items:flex-end;"}
        onclick={() => {
        window.open(
            `https://wank.wavu.wiki/player/${data.p2_polaris_id}`
        );
        }}
    >
    <TekkenChar char={data.p2_chara_id.toString()} />
        <div
        style={`display:flex; flex-direction:column; width:${isMobile?"100":"150"}px; gap:1rem; align-content:center; align-items:center;`}
        ><p
        placeholder="p2 User"
        style={`padding:0;margin:0; max-lines:1;width:${isMobile?"100":"150"}px;max-height:60px;`} 
    >
            {data.p2_name}
    </p>
        <TekkenRank rank={data.p2_rank.toString()} width="100px"/>
        </div>
    </button>
</div>
{:else if Loading}
<div class="tekkenMatch-container">
    <h3  class="mb-4 text-center"> Loading...</h3>
</div>
{:else}
<div class="tekkenMatch-container">
    <h3 class="mb-4 text-center"> No Match Found </h3>
</div>
{/if}
