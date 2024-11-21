<script lang="ts">
    import TekkenChar from "$lib/components/TekkenChar.svelte";
    import TekkenRank from "$lib/components/TekkenRank.svelte";

    export let name;
    export let polarisId;
    let data = {characters: [], nickname: '',tekken_power: ""};
    let Loading = true;
    let mainChar:{char_id: string; char_rank: string};

    import { onMount } from 'svelte';

    onMount(async () => {
        const res = await fetch(`https://api.tk-everyday.site/tekken_user/${polarisId}`);
        data = await res.json();
        if(res.status === 404){
            Loading = false;
        } 
        else{
            mainChar = data.characters
            .sort((a:{char_rank:number, char_played_games:number}, b:{char_rank:number, char_played_games:number},) => {
              if (b.char_rank === a.char_rank) {
                return b.char_played_games - a.char_played_games;
              }
              return b.char_rank - a.char_rank;
            })[0]
        }
    });
</script>


{#if data?.nickname}
<div class="tekkenuser-container" >
    <TekkenChar char={mainChar.char_id.toString()}/>
    <div class="tekkenuser-body1">
        <h3 style="margin:0;">{data?.nickname}</h3>
        <p class="text-left ms-5 ..." >{polarisId}</p>
        <div class="tekkenuser-body2">
            <TekkenRank rank={mainChar.char_rank.toString()}/>
            <p style="align-self:flex-start; text-align:start;">Tekken Power:{"\n"}{data?.tekken_power}</p>
        </div>
    </div>
</div>
{:else if Loading}
<div class="tekkenuser-container">
    <p>{name} Loading...</p>
</div>
{:else}
    {null}
{/if}

<style>
    .tekkenuser-container {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 1rem;
        width: 350px;
        max-width: 350px;
        flex-direction: row;
        margin-bottom: 1rem;
        background-color: #2B2A33;
        padding: 1rem;
        color: white;
        
    }
    .tekkenuser-container:hover{
        background-color: #3266CB;
        box-shadow: 0px 0px 10px 1px #3266CB44;
    }
    .tekkenuser-body1{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        margin-left: 1rem;
    }
    .tekkenuser-body2{
        display: flex;
        flex-direction: row; 
        justify-content:flex-start; 
        align-items:center;
        align-self: flex-start;
        gap: 1rem;
    }
</style>