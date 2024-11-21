<script lang="ts">
    import TekkenUser from "$lib/components/TekkenUser.svelte";
    import {page} from "$app/stores";

    let polarisId:string = $page.params.id;
</script>

<TekkenUser polarisId={polarisId} name="Tekken User"/>

<!-- 5m3qhrAgaHJr -->