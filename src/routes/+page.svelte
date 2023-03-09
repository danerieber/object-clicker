<script lang="ts">
	import Maker from "../components/Maker.svelte";
    import { objects, objectsPerSecond } from "../game/stores";

    // game loop logic: ticks per second and previous tick time
    let TPS = 50.0;
    let interval = (1000.0 / TPS);
    let prev = Date.now() - interval;

    let clicks = 0;     // number of clicks during this game tick
    let level = 0;      // new makers are unlocked with increasing levels

    let developers: number;

    function clickObject() {
        clicks += 1;
    }

    function gameLoop() {
        // try to call gameLoop() at AROUND the right time
        const now = Date.now();
        const delta = now - prev;
        if (delta < interval) {
            // since gameLoop() was called early, set timeout to what SHOULD be the remainder of this tick
            setTimeout(gameLoop, interval - delta);
            return;
        }
        prev = now;

        // calculations will use ACTUAL time since last tick for multiplier
        const multiplier = delta / 1000.0;

        $objects += $objectsPerSecond * multiplier;
        $objects += clicks;
        clicks = 0;

        if (level === 0 && $objects >= 50) {
            level = 1;
        }
        else if (level === 1 && developers >= 5) {
            level = 2;
        }

        // hopefully make up for time innacuracies by ajusting timeout for next tick
        setTimeout(gameLoop, interval - (delta - interval));
    }

    gameLoop();
</script>

<div class="vflex">
    <div><h1>Objects: {Math.floor($objects).toLocaleString()}</h1></div>
    <div class="hflex">
        {#if level >= 1}
            <div class="vflex">
                <h4>Makers</h4>
                <Maker baseCost={60} costCurve={1.22} unitOPS={1} pluralName="Developers" addButtonText="Hire Developer" bind:count={developers} />
            </div>
        {/if}
        {#if level >= 2}
            <div class="vflex">
                <h4>Patterns</h4>
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
    .hflex {
        display: flex;
        flex-direction: row;
        column-gap: 100px;
    }
</style>