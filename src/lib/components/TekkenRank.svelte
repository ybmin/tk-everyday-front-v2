<script lang="ts">
    import { rankData } from "./TekkenRank";
    export let rank: string;
    export let width: string = "100px";
</script>

<img
    src={rankData[rank].src}
    alt={rankData[rank].name}
    class="tekken-rank my-1"
    style={`width: ${width}; `}
/>
