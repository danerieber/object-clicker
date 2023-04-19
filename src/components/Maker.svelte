<script lang="ts">
	import { fade } from "svelte/transition";
	import type Maker from "../game/Maker";

    export let o: Maker;
    export let update: () => void;

    function add() {
        o.add();
    }
</script>

<div transition:fade style="display: flex; flex-direction: column">
    <div>{o.pluralName}: {o.count.toLocaleString()}</div>
    <div><button on:click={add}>{o.addButtonText}</button> (cost: {o.cost} objects)</div>
</div>