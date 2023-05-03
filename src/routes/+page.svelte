<script lang="ts">
	import { fade } from 'svelte/transition';
	import Maker from '../components/Maker.svelte';
	import type MakerObj from '../game/Maker';
	import Pattern from '../components/Pattern.svelte';
	import { objects, objectsPerSecond, opsMultiplier } from '../game/stores';
	import Page from '../game/Page';
	import MakingStrategy from '../game/MakingStrategy';
	import RiskyMakingStrategy from '../game/RiskyMakingStrategy';
	import AggressiveMakingStrategy from '../game/AggressiveMakingStrategy';
	import FriendlyMakingStrategy from '../game/FriendlyMakingStrategy';

	let page = Page.getInstance();
	page.gameLoop();

	function update() {
		page = Page.getInstance();
		setTimeout(update, 100);
	}

	function clickObject() {
		page.clickObject();
	}

	let decoratorsUnlocked = false;
	function unlockDecorators() {
		decoratorsUnlocked = true;
	}

	let strategiesUnlocked = false;
	function unlockStrategies() {
		strategiesUnlocked = true;
	}

	function updateMaker(prev: MakerObj, next: MakerObj) {
		page.makingStrategy.makers[page.makingStrategy.makers.indexOf(prev)] = next;
	}

	let selectedStrategy: string;
	function changeStrategy() {
		if (selectedStrategy === 'standard') {
			page.makingStrategy = new MakingStrategy(page.makingStrategy.makers);
		} else if (selectedStrategy === 'risky') {
			page.makingStrategy = new RiskyMakingStrategy(page.makingStrategy.makers);
		} else if (selectedStrategy === 'aggressive') {
			page.makingStrategy = new AggressiveMakingStrategy(page.makingStrategy.makers);
		} else if (selectedStrategy === 'friendly') {
			page.makingStrategy = new FriendlyMakingStrategy(page.makingStrategy.makers);
		}
	}

	update();
</script>

<div class="vflex">
	<div><h1>Objects: {Math.floor($objects).toLocaleString()}</h1></div>
	{#if page.level >= 2}
		<div transition:fade>
			{Math.floor($objectsPerSecond * $opsMultiplier)} OPS
			<small style="color: gray">({Math.floor($objectsPerSecond)} OPS x {$opsMultiplier})</small>
		</div>
	{/if}
	<div class="hflex">
		{#if page.level >= 1}
			<div class="vflex">
				<h4>Makers</h4>
				<div class="vflex vspaced">
					{#each page.makingStrategy.makers as maker, i}
						<Maker o={maker} decorators={decoratorsUnlocked} update={updateMaker} />
					{/each}
				</div>
				{#if strategiesUnlocked}
					<h4>Strategies</h4>
					<div class="vflex" style="max-width: 300px">
						<select bind:value={selectedStrategy} on:change={changeStrategy}>
							<option value="standard">Standard</option>
							<option value="risky">Risky</option>
							<option value="aggressive">Aggressive</option>
							<option value="friendly">Friendly</option>
						</select>
						{page.makingStrategy.desc}
					</div>
				{/if}
			</div>
		{/if}
		{#if page.level >= 3}
			<div class="vflex" style="flex-grow: 1; max-width: 400px">
				<h4>Patterns</h4>
				<div class="vflex vspaced">
					<Pattern
						cost={4000}
						name="Decorator Pattern"
						description="Wrap your original objects with decorator objects to provide additional functionality while keeping the original object's functionality! Unlocks Decorators."
						action={unlockDecorators}
					/>
					<Pattern
						cost={20000}
						name="Strategy Pattern"
						description="Allows you to attach strategies to your objects that can be changed during runtime for optimal adaptability! Unlocks Strategies."
						action={unlockStrategies}
					/>
				</div>
			</div>
		{/if}
	</div>
	<div style="margin-top: 40px"><button on:click={clickObject}>Make Object</button></div>
</div>

<style>
	.vflex {
		display: flex;
		flex-direction: column;
	}
	.vspaced {
		row-gap: 30px;
	}
	.hflex {
		display: flex;
		flex-direction: row;
		column-gap: 100px;
	}
</style>
