<script lang="ts">
	import { fade } from "svelte/transition";
	import { objects, objectsPerSecond } from "../game/stores";

    export let baseCost: number;
    export let costCurve: number;
    export let unitOPS: number;

    export let pluralName: string;
    export let addButtonText: string;

    export let count = 0;
    let cost = baseCost;

    function add() {
        if ($objects < cost) return;
        $objects -= cost;
        $objectsPerSecond += unitOPS;
        count += 1;
        cost = Math.floor(baseCost * Math.pow(costCurve, count));
    }
</script>

<div transition:fade style="display: flex; flex-direction: column">
    <div>{pluralName}: {count.toLocaleString()}</div>
    <div><button on:click={add}>{addButtonText}</button> (cost: {cost} objects)</div>
</div>