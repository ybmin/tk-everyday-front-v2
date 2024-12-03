<script lang="ts">
    let searchQuery = '';
    type QueryTekkenUser = {"nickname": string, "polaris_id": string, "tekken_power": number, "last_seen_at": number, "parent_user_id":string|undefined};
    let filteredItems:QueryTekkenUser[] = [];
    let apiItems:QueryTekkenUser[] = [];
    let hasFetched = false;

    async function fetchItems(query: string) {
        const response = await fetch(`https://api.tk-everyday.site/tekken_user/nickname/${query}`);
        apiItems = await response.json();
    }

    $: if (searchQuery.length >= 3 && !hasFetched) {
        fetchItems(searchQuery);
        hasFetched = true;
    };

    $: if (searchQuery.length < 3) {
        apiItems = [];
        filteredItems = [];
        hasFetched = false;
    };

    $: filteredItems = apiItems.filter(item =>
        item.nickname.toLowerCase().includes(searchQuery.toLowerCase())
    );
</script>

<div class="w-full content-center my-28">
    <div class="w-full p-6 m-auto bg-base-200 rounded-md shadow-md flex flex-col prose justify-center items-center lg:max-w-lg">
        <form class="input input-bordered flex items-center gap-2" on:submit|preventDefault={()=>fetchItems(searchQuery)}>
            <input type="text" class="grow" placeholder="검색어를 입력하세요" bind:value={searchQuery} />
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70">
            <path
                fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd" />
            </svg>
        </form>

        <div class="overflow-x-auto">
            <table class="table w-full min-w-full">
                <thead>
                    <tr>
                    <th class="whitespace-normal">닉네임</th>
                    <th class="whitespace-normal">Tekken Power</th>
                    <th class="whitespace-normal">최근 접속</th>
                    <th class="whitespace-normal">연동 유저</th>
                    </tr>
                </thead>
                <tbody>
                    {#each filteredItems as item}
                    <tr>
                        <th class="whitespace-normal">
                            {#if !item.parent_user_id}
                            <a href={`/tekkenUser/player/${item.polaris_id}`}>
                                <div class="font-bold">{item.nickname}</div>
                                <div class="text-sm opacity-50">{item.polaris_id}</div>
                            </a>
                            {:else}
                            <a href={`/users/${item.parent_user_id}`}>
                                <div class="font-bold">{item.nickname}</div>
                                <div class="text-sm opacity-50">{item.polaris_id}</div>
                            </a>
                            {/if}
                        </th>
                        <td class="whitespace-normal">{item.tekken_power}</td>
                        <td class="whitespace-normal">{new Date(item.last_seen_at * 1000).toLocaleString("ko-KR")}</td>
                        <td class="whitespace-normal">
                            {#if !item.parent_user_id}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="size-5 fill-primary">
                                    <path fill-rule="evenodd" d="M16.403 12.652a3 3 0 0 0 0-5.304 3 3 0 0 0-3.75-3.751 3 3 0 0 0-5.305 0 3 3 0 0 0-3.751 3.75 3 3 0 0 0 0 5.305 3 3 0 0 0 3.75 3.751 3 3 0 0 0 5.305 0 3 3 0 0 0 3.751-3.75Zm-2.546-4.46a.75.75 0 0 0-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" />
                                </svg>
                            {:else}
                            연동 없음
                            {/if}
                        </td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>