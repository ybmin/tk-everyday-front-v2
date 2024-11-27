<script lang="ts">
  import {charData} from "./TekkenChar";
  export let char: string;
  export let size: string = "80";
</script>

<img
      src={charData[char]?.src}
      alt={charData[char]?.name}
      class="tekken-char my-1"
      style="width: {size}px; height: {size}px; border-radius: {size}px;"
    />
