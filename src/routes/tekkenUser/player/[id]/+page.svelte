<script lang="ts">
    import {page} from "$app/stores";
    import {charData} from "$lib/components/TekkenChar";
    import {rankData} from "$lib/components/TekkenRank";
    import { onMount } from 'svelte';
  import TekkenChar from "$lib/components/TekkenChar.svelte";
  import TekkenRank from "$lib/components/TekkenRank.svelte";

    let polarisId = $page.params.id;
    
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
    let battles: Battle[] = [];

    let currentPage = 0;
    let loadedPage = 0;
    let maxPage = Infinity;
    let currentBattles: Battle[];
    let loadMatch = true;

    let totalGames=0;
    let totalWins=0;

    onMount(async () => {
            Loading = true;
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
                    totalGames += char.char_played_games;
                    totalWins += char.char_games_won;
                })
            }
            Loading = false;
        });

    onMount(async()=>{
        await  fetchMatchData();
    })
    const fetchMatchData = async()=>{
        loadMatch  =true;
        const res = await fetch(`https://api.tk-everyday.site/tekken_user/${polarisId}/battles?limit=50&skip=${currentPage*50}`);
        if( res.status !== 200){
            currentPage--;
            maxPage = currentPage;
            loadMatch = false;
            return;
        }
        currentBattles = await res.json();
        battles = [...battles, ...currentBattles];
        loadedPage = currentPage;
        maxPage = Infinity;
        loadMatch = false;
    }

</script>


{#if Loading}
<div class="flex w-full flex-col gap-4 mx-10 my-20">
    <div class="flex items-center gap-4">
      <div class="skeleton h-48 w-48 shrink-0 rounded-full"></div>
      <div class="flex flex-col gap-10">
        <div class="skeleton h-10 w-full"></div>
        <div class="skeleton h-10 w-full"></div>
        <div class="skeleton h-10 w-full"></div>
        <div class="skeleton h-10 w-full"></div>
      </div>
    </div>
    <div class="skeleton h-32 w-full"></div>
  </div>
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
        <div class="radial-progress text-secondary" style="--value:{(totalWins/totalGames*100).toFixed(0)};" role="progressbar">{(totalWins/totalGames*100).toFixed(1)}%</div>
      </div>
      <div class="stat-title">승수 / 전적</div>
      <div class="stat-value text-secondary">{totalWins} / {totalGames}</div>
      <div class="stat-desc">승률 {(totalWins/totalGames*100).toFixed(2)}%</div>
    </div>
</div>

<div class="stats shadow">
    <div class="stat">
      <div class="stat-figure text-primary">
        <div class="avatar online">
            <TekkenChar char={mainChar.char_id} />
        </div>
      </div>
      <div class="stat-value">{(mainChar.char_games_won/mainChar.char_played_games*100).toFixed(2)}%</div>
      <div class="stat-title">{charData[mainChar.char_id].name} 승률</div>
      <div class="stat-desc text-primary">{mainChar.char_games_won}승</div>
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
                <div class="avatar">
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
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto">
        {#if loadMatch}
            <div class="flex w-full flex-col gap-4 mx-10 my-10">                
                <div class="skeleton h-6 w-full"></div>
                <div class="skeleton h-6 w-full"></div>
                <div class="skeleton h-6 w-full"></div>
                <div class="skeleton h-6 w-full"></div>
                <div class="skeleton h-6 w-full"></div>
                <div class="skeleton h-6 w-full"></div>
            </div>
        {:else}
        <div class="overflow-x-auto mb-4">
            <table class="table">
              <!-- head -->
              <thead>
                <tr>
                  <th>본인</th>
                  <th>결과</th>
                  <th>상대</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {#each currentBattles as battle}
                {#if battle.p1_polaris_id === data.polaris_id}
                <tr>
                    <td>
                        <div class="flex items-center gap-3">
                            <div class="avatar">
                                <div class="mask mask-squircle h-12 w-12">
                                    <TekkenChar char={battle.p1_chara_id.toString()} size="60" />
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">{battle.p1_name}</div>
                                <div class="text-sm">
                                    <TekkenRank rank={battle.p1_rank.toString()} width="40px"/>
                                </div>
                            </div>
                        </div>
                    </td>
                    <td >
                        <span class="{battle.winner === 1 ? "text-green-600":"text-red-600"} font-bold">{battle.p1_rounds}</span> : <span class="{battle.winner === 2 ? "text-green-600":"text-red-600"} font-bold">{battle.p2_rounds}</span>
                        <br />
                        <span class="badge badge-ghost badge-sm font-light">{new Date(battle.battle_at*1000).toLocaleString("ko-KR")}</span>
                    </td>
                    <td>
                        <a class="flex items-center gap-3" rel="external" href="/tekkenUser/player/{battle.p2_polaris_id}">
                            <div class="avatar">
                                <div class="mask mask-squircle h-12 w-12">
                                    <TekkenChar char={battle.p2_chara_id.toString()} size="60"/>
                                </div>
                            </div>
                            <div>
                                <div class="font-bold">{battle.p2_name}</div>
                                <div class="text-sm">
                                    <TekkenRank rank={battle.p2_rank.toString()} width="40px"/>
                                </div>
                            </div>
                        </a>
                    </td>
                        <th>
                            <div class="badge badge-outline ">
                                v.{battle.game_version.toString().replaceAll("0", ".")}</div>
                            <!-- <button class="btn btn-ghost btn-xs">details</button> -->
                            </th>
                        </tr>
                    {:else}
                    <tr>
                        <td>
                            <div class="flex items-center gap-3">
                                <div class="avatar">
                                    <div class="mask mask-squircle h-12 w-12">
                                        <TekkenChar char={battle.p2_chara_id.toString()} size="60" />
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">{battle.p2_name}</div>
                                    <div class="text-sm">
                                        <TekkenRank rank={battle.p2_rank.toString()} width="40px"/>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="font-bold">
                            <span class="{battle.winner === 2 ? "text-green-600":"text-red-600"}">{battle.p2_rounds}</span> : <span class="{battle.winner === 1 ? "text-green-600":"text-red-600"}">{battle.p1_rounds}</span>
                            <br />
                            <span class="badge badge-ghost badge-sm font-light">{new Date(battle.battle_at*1000).toLocaleString("ko-KR")}</span>
                        </td>
                        <td>
                            <a class="flex items-center gap-3" rel="external" href="/tekkenUser/player/{battle.p1_polaris_id}">
                                <div class="avatar">
                                    <div class="mask mask-squircle h-12 w-12">
                                        <TekkenChar char={battle.p1_chara_id.toString()} size="60"/>
                                    </div>
                                </div>
                                <div>
                                    <div class="font-bold">{battle.p1_name}</div>
                                    <div class="text-sm">
                                        <TekkenRank rank={battle.p1_rank.toString()} width="40px"/>
                                    </div>
                                </div>
                            </a>
                        </td>
                            <th>
                                <div class="badge badge-outline ">
                                    v.{battle.game_version.toString().replaceAll("0", ".")}</div>
                                <!-- <button class="btn btn-ghost btn-xs">details</button> -->
                                </th>
                            </tr>
                        {/if}
                {/each}
            </tbody>
            <!-- foot -->
        </table>
    </div>
    {/if}
        <div class="join grid grid-cols-2 mx-10">
            <button class="join-item btn btn-outline" disabled={currentPage === 0} on:click={()=>{
                currentPage--;
                currentBattles = battles.slice(currentPage*50, currentPage*50+50);
            }}>이전</button>
            <button class="join-item btn btn-outline" on:click={()=>{
                currentPage++;
                if(currentPage>loadedPage){
                    fetchMatchData();
                }else{
                    currentBattles = battles.slice(currentPage*50, currentPage*50+50);
                }
            }}
            disabled={currentPage === maxPage}
            >다음</button>
          </div>
    </div>
    
    <input type="radio" name="my_tabs_2" role="tab" class="tab" aria-label="통계" style="width:100px;"/>
    <div role="tabpanel" class="tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto">
        <!-- 
        이번달 판수, 승수, 승률, 캐릭터별 승률, 스테이지별 승률, 철찌력
        지난달 판수, 승수, 승률, 캐릭터별 승률, 스테이지별 승률, 철찌력
        전체 판수, 승수, 승률, 캐릭터별 승률, 스테이지별 승률, 철찌력
        -->
    </div>

  </div>
  

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
</style>