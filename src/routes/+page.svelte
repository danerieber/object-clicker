<script lang="ts">
	import { fade } from "svelte/transition";
	import Maker from "../components/Maker.svelte";
	import Pattern from "../components/Pattern.svelte";
    import { objects, objectsPerSecond, opsMultiplier } from "../game/stores";
	import Page from "../game/Page";

    // game loop logic: ticks per second and previous tick time
    // let TPS = 50.0;
    // let interval = (1000.0 / TPS);
    // let prev = Date.now() - interval;

    // let clicks = 0;     // number of clicks during this game tick
    // let level = 0;      // new makers are unlocked with increasing levels

    // let developers: number;
    // let objectFactories: number;

    // let strategiesUnlocked: boolean = false;

    // function clickObject() {
    //     clicks += 1;`
    // }

    // function gameLoop() {
    //     // try to call gameLoop() at AROUND the right time
    //     const now = Date.now();
    //     const delta = now - prev;
    //     if (delta < interval) {
    //         // since gameLoop() was called early, set timeout to what SHOULD be the remainder of this tick
    //         setTimeout(gameLoop, interval - delta);
    //         return;
    //     }
    //     prev = now;

    //     // calculations will use ACTUAL time since last tick for multiplier
    //     const multiplier = delta / 1000.0;

    //     $objects += $objectsPerSecond * $opsMultiplier * multiplier;
    //     $objects += clicks;
    //     clicks = 0;

    //     if (level === 0 && $objects >= 50) {
    //         level = 1; // Developers
    //     } else if (level === 1 && developers >= 5) {
    //         level = 2; // ObjectFactories
    //     } else if (level === 2 && $objects >= 1500) {
    //         level = 3; // Decorator and Strategy Patterns
    //     }

    //     // hopefully make up for time innacuracies by ajusting timeout for next tick
    //     setTimeout(gameLoop, interval - (delta - interval));
    // }

    // gameLoop();

    let page = Page.getInstance();
    page.gameLoop();

    function update() {
        page = Page.getInstance();
        setTimeout(update, 100);
    }

    function clickObject() {
        page.clickObject();
    }

    update();
</script>

<div class="vflex">
    <div><h1>Objects: {Math.floor($objects).toLocaleString()}</h1></div>
    {#if page.level >= 2}
        <div transition:fade>{$objectsPerSecond * $opsMultiplier} OPS <small style="color: gray">({$objectsPerSecond} OPS x {$opsMultiplier})</small></div>
    {/if}
    <div class="hflex">
        {#if page.level >= 1}
            <div class="vflex">
                <h4>Makers</h4>
                <div class="vflex vspaced">
                    {#each page.makingStrategy.makers as maker}
                        <Maker o={maker} update={update}/>
                    {/each}
                </div>
            </div>
        {/if}
        {#if page.level >= 3}
            <div class="vflex" style="flex-grow: 1; max-width: 400px">
                <h4>Patterns</h4>
                <div class="vflex vspaced">
                    <Pattern cost={4000} name="Decorator Pattern" description="Wrap your original objects with decorator objects to provide additional functionality while keeping the original object's functionality! Doubles your OPS." action={() => {$opsMultiplier *= 2.0}} />
                    <!-- <Pattern cost={20000} name="Strategy Pattern" description="Allows you to attach strategies to your objects that can be changed during runtime for optimal adaptability! Unlocks Strategies." action={() => {strategiesUnlocked = true}} /> -->
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