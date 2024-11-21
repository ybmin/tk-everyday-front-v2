<script lang="ts">
    import {page} from "$app/stores";
    import {charData} from "$lib/components/TekkenChar";
    import {rankData} from "$lib/components/TekkenRank";
    import { onMount } from 'svelte';
    import {json} from "./test";
  import TekkenChar from "$lib/components/TekkenChar.svelte";
  import TekkenRank from "$lib/components/TekkenRank.svelte";

    let polarisId:string = $page.params.id;
    
    let data: {characters: any[], nickname: string,tekken_power: number, polaris_id: string, highest_rank: number, last_seen_at: number, nickname_history: any[], parent_user_id: string|null};
    let Loading = true;
    let mainChar:{char_id: string; char_rank: string, char_played_games: number, char_games_won: number, last_seen_at: number};
    type Battle={
        battle_at: number,
    battle_id: string,
    game_version: number,
    p1_chara_id: number,
    p1_name: string,
    p1_polaris_id: string,
    p1_power: number,
    p1_rank: number,
    p1_rounds: number,
    p1_user_id: number,
    p2_chara_id: number,
    p2_name: string,
    p2_polaris_id: string,
    p2_power: number,
    p2_rank: number,
    p2_rounds: number,
    p2_user_id: number,
    stage_id: number,
    winner: number,
    };
    // let battles: Battle[] = json;

    let totalGames=0;
    let totalWins=0;

    onMount(async () => {
        const res = await fetch(`https://api.tk-everyday.site/tekken_user/${polarisId}`);
        data = await res.json();
        if(res.status === 200){
            mainChar = data.characters
            .sort((a:{char_rank:number, char_played_games:number}, b:{char_rank:number, char_played_games:number},) => {
              if (b.char_rank === a.char_rank) {
                  return b.char_played_games - a.char_played_games;
              }
              return b.char_rank - a.char_rank;
            })[0]
            data.characters.forEach((char)=>{
                totalGames+=char.char_played_games;
                totalWins+=char.char_games_won;
            })
        }
        Loading = false;
        // const res = await fetch(`https://api.tk-everyday.site/tekken_user/${polarisId}/battles?limit=50&skip=0`);
        // battles = await res.json();
    });
</script>


{#if Loading}
    <p>Loading...</p>
{:else}
<div class="tekken-user-profile-default-container">
    <div>
    </div>
</div>
<div class="md:container md:mx-auto py-2 text-left mb-24 mt-10 flex items-center align-middle justify-center lg:flex-row flex-col-reverse">
<div class="stats shadow ">
    <div class="stat">
      <div class="stat-figure text-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block h-8 w-8 stroke-current">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
        </svg>
      </div>
      <div class="stat-title">최고 계급</div>
      <div class="stat-value text-primary">{rankData[mainChar.char_rank].name}</div>
      <div class="stat-desc">과거 최고 계급: {rankData[data.highest_rank].name}</div>
    </div>
</div>
<div class="stats shadow ">
    <div class="stat">
      <div class="stat-figure text-secondary">
        <div class="radial-progress text-primary" style="--value:{(totalWins/totalGames*100).toFixed(0)};" role="progressbar">{(totalWins/totalGames*100).toFixed(1)}%</div>
      </div>
      <div class="stat-title">승수 / 전적</div>
      <div class="stat-value text-secondary">{totalWins} / {totalGames}</div>
      <div class="stat-desc">승률 {(totalWins/totalGames*100).toFixed(2)}%</div>
    </div>
</div>

<div class="stats shadow">
    <div class="stat">
      <div class="stat-figure text-secondary">
        <div class="avatar online">
            <TekkenChar char={mainChar.char_id} />
        </div>
      </div>
      <div class="stat-value">{(mainChar.char_games_won/mainChar.char_played_games*100).toFixed(2)}%</div>
      <div class="stat-title">{charData[mainChar.char_id].name} 승률</div>
      <div class="stat-desc text-secondary">{mainChar.char_games_won}승</div>
    </div>
</div>
<div class="stats shadow ">
    <div class="stat">
        <div class="stat-figure text-secondary">
            <TekkenRank rank={mainChar.char_rank}/>
        </div>
        <div class="stat-value">{data.nickname}</div>
        <div class="stat-title">{data.polaris_id}</div>
        <div class="stat-desc text-secondary">마지막 접속: {new Date(data.last_seen_at*1000).toLocaleString("ko-KR")}</div>
      </div>
  </div>    
</div>

<div role="tablist" class="tabs tabs-lifted tabs-lg w-auto">
    <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="캐릭터" checked style="width:100px;"/>
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 ">
      {#each data.characters as character}
        <div class="stats shadow">
            <div class="stat">
            <div class="stat-figure text-secondary">
                <div class="avatar online">
                    <TekkenChar char={character.char_id} />
                </div>
            </div>
            <div class="stat-value">
                <TekkenRank rank={character.char_rank}/>
            </div>
            <div class="stat-title">승률 {(character.char_games_won/character.char_played_games*100).toFixed(2)}%</div>
            <div class="stat-desc text-secondary">{character.char_games_won}승</div>
            </div>
        </div>
      {/each}
    </div>
  
    <input
      type="radio"
      name="my_tabs_2"
      role="tab"
      class="tab"
      aria-label="닉네임" style="width:100px;"/>
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
      {#each data.nickname_history as nickname}
      
        <div class="stats shadow">
            <div class="stat">
            <div class="stat-value">{nickname.nickname}
            </div>
            <div class="stat-title">마지막 접속: {new Date(nickname.last_seen_at*1000).toLocaleString("ko-KR")}</div>
            </div>
        </div>
      {/each}
    </div>
  
    <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="전적" style="width:100px;"/>
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6">
      구현 중
    </div>
  </div>

<!-- {#if data.parent_user_id}
    <div class="tekken-user-profile-nickname-container">
        <h5 >ED User ID: <p onclick={()=>{
            //TODO: USER ID LINK
        }}>{data.parent_user_id}</p></h5>
    </div>
    {/if} -->
<!-- 
<Tabs tabStyle="underline" 
contentClass="p-4 bg-transparent rounded-lg mt-4"
activeClasses="bg-primary-500 text-white"
>
    <TabItem open title="닉네임 이력">

<div class="tekken-user-profile-nickname-container">
    {#each data.nickname_history as nickname}
    <div>
        <h5 tag="h6">{nickname.nickname}</h5>
        <p>마지막 접속: {new Date(nickname.last_seen_at*1000).toLocaleString("ko-KR")}</p>
    </div>
    {/each}
</div>
    </TabItem>
    <TabItem title="캐릭터 정보">
<div class="tekken-user-profile-character-container">
    {#each data.characters as character}
    <div>
        <h5 tag="h6">{charData[character.char_id].name}</h5>
        <p>랭크: {rankData[character.char_rank].name}</p>
        <p>최고랭크: {rankData[character.char_highest_rank].name}</p>
        <p>승리/총 게임: {character.char_games_won} / {character.char_played_games} = {(character.char_games_won * 100 / character.char_played_games).toPrecision(4)}%</p>
        <p>마지막 접속: {new Date(character.last_seen_at*1000).toLocaleString("ko-KR")}</p>
    </div>
    {/each}
</div>
    </TabItem>
    <TabItem title="랭크 게임">       
        <Table hoverable={true}>
            <TableHead>
            <TableHeadCell >일시</TableHeadCell>
            <TableHeadCell >나의 캐릭터</TableHeadCell>
            <TableHeadCell >나의 랭크</TableHeadCell>
            <TableHeadCell >라운드</TableHeadCell>
            <TableHeadCell >상대 닉네임</TableHeadCell>
            <TableHeadCell >상대 캐릭터</TableHeadCell>
            <TableHeadCell >상대 랭크</TableHeadCell>
            <TableHeadCell >게임 버전</TableHeadCell>
            </TableHead>
            <TableBody tableBodyClass="divide-y">
                {#each battles as item}
            <TableBodyRow>
                <TableBodyCell>{new Date(item.battle_at*1000).toLocaleString("ko-KR")}</TableBodyCell>
                <TableBodyCell>{(polarisId === item.p1_polaris_id)? charData[item.p1_chara_id].name :charData[item.p2_chara_id].name}</TableBodyCell>
                <TableBodyCell>{(polarisId === item.p1_polaris_id)? rankData[item.p1_rank].name :rankData[item.p2_rank].name}</TableBodyCell>
                <TableBodyCell>{(polarisId === item.p1_polaris_id)? item.p1_rounds +" : "+item.p2_rounds:item.p2_rounds +" : "+item.p1_rounds}</TableBodyCell>
                <TableBodyCell>{(polarisId === item.p2_polaris_id)? item.p1_name :item.p2_name}</TableBodyCell>
                <TableBodyCell>{(polarisId === item.p2_polaris_id)? charData[item.p1_chara_id].name :charData[item.p2_chara_id].name}</TableBodyCell>
                <TableBodyCell>{(polarisId === item.p2_polaris_id)? rankData[item.p1_rank].name :rankData[item.p2_rank].name}</TableBodyCell>
                <TableBodyCell>
                    v.{item.game_version.toString().replaceAll("0", ".")}</TableBodyCell>
            </TableBodyRow>
            {/each}
            </TableBody>
        </Table>
    </TabItem>
</Tabs> -->
{/if} 
<!-- 5m3qhrAgaHJr -->


<style>
    .tekken-user-profile-default-container{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        gap: 1rem;
    }
    .tekken-user-profile-nickname-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
    /* .tekken-user-profile-character-container{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    } */
</style>