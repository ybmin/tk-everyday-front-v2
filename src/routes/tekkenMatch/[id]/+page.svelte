<script lang="ts">
    import TekkenMatch from "$lib/components/TekkenMatch.svelte";
    import {page} from "$app/stores";

    let matchId:string = $page.params.id;
</script>

<TekkenMatch matchId={matchId} />

<!-- CA765E0F63C64A6289AFAA7F152E37F6 -->