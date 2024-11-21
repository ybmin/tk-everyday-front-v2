<script lang="ts">
  import {charData} from "./TekkenChar";
  export let char: string;
</script>

<img
      src={charData[char]?.src}
      alt={charData[char]?.name}
      sizes="80"
      class="tekken-char"
      style="width: 80px; height: 80px; border-radius: 80px;"
    />
