<script lang="ts">
	import { fade } from 'svelte/transition';
	import type Maker from '../game/Maker';
	import MakerDecorator from '../game/MakerDecorator';
	import LeetcodeDecorator from '../game/LeetcodeDecorator';
	import CoffeeDecorator from '../game/CoffeeDecorator';

	export let o: Maker;
	export let decorators: boolean;
	export let update: (prev: Maker, next: Maker) => void;

	function isDecoratedWith(decorator: string): boolean {
		if (o instanceof MakerDecorator) {
			let d = o as MakerDecorator;
			return d.decorators.includes(decorator);
		}
		return false;
	}

	function toggleCoffeed(event: any) {
		if (coffeed) {
			if (o instanceof LeetcodeDecorator) {
				update(o, new LeetcodeDecorator(o.inner().inner()));
			} else {
				update(o, o.inner());
			}
			coffeed = false;
		} else {
			update(o, new CoffeeDecorator(o));
			coffeed = true;
		}
		setTimeout(() => (event.target.checked = coffeed), 0);
	}

	function toggleLeetcoded(event: any) {
		if (leetcoded) {
			if (o instanceof CoffeeDecorator) {
				update(o, new CoffeeDecorator(o.inner().inner()));
			} else {
				update(o, o.inner());
			}
			leetcoded = false;
		} else {
			update(o, new LeetcodeDecorator(o));
			leetcoded = true;
		}
		setTimeout(() => (event.target.checked = leetcoded), 0);
	}

	let coffeed = isDecoratedWith('coffee');
	let leetcoded = isDecoratedWith('leetcode');

	function add() {
		o.add();
	}
</script>

<div transition:fade style="display: flex; flex-direction: column">
	<div>{o.pluralName}: {o.count.toLocaleString()}</div>
	<div><button on:click={add}>{o.addButtonText}</button> (cost: {o.cost} objects)</div>
	{#if decorators}
		<div style="display: flex; flex-direction: row">
			<input
				id={'coffeed' + o.type}
				type="checkbox"
				checked={coffeed}
				on:click|preventDefault={toggleCoffeed}
			/>
			<label for={'coffeed' + o.type}>Coffee Decorator</label>
		</div>
		<div style="display: flex; flex-direction: row">
			<input
				id={'leetcoded' + o.type}
				type="checkbox"
				checked={leetcoded}
				on:click|preventDefault={toggleLeetcoded}
			/>
			<label for={'leetcoded' + o.type}>Leetcode Decorator</label>
		</div>
	{/if}
</div>
