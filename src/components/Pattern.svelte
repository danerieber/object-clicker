<script lang="ts">
	import { fade } from 'svelte/transition';
	import { objects } from '../game/stores';

	export let cost: number;

	export let name: string;
	export let description: string;

	export let action: () => void;

	function clickAction() {
		if (cost > $objects) return;
		$objects -= cost;
		visible = false;
		action();
	}

	let visible = true;
</script>

{#if visible}
	<div transition:fade on:click={clickAction}>
		<h5 style="margin: 10px; margin-bottom: 0px">{name}</h5>
		<p style="margin: 10px"><small>{description}</small></p>
		<h5 style="margin: 10px">Cost: {cost} objects</h5>
	</div>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
		border: 1px solid gray;
		background-color: #eee;
		user-select: none;
	}
	div:hover {
		background-color: #ddd;
	}
	div:active {
		background-color: #ccc;
	}
</style>
