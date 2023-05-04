import { get } from "svelte/store";
import { objects } from "./stores";
import MakingStrategy from "./MakingStrategy";

// SINGLETON PATTERN
class Page {
    TPS: number;
    interval: number;
    prev: number;

    clicks: number;
    level: number;

    makingStrategy: MakingStrategy;

    // SINGLETON PATTERN, INSTANCE
    private static instance: Page;

    private constructor(TPS: number) {
        this.TPS = TPS;
        this.interval = (1000.0 / TPS);
        this.prev = Date.now() - this.interval;

        this.clicks = 0;
        this.level = 0;

        this.makingStrategy = new MakingStrategy([]);
    }

    // SINGLETON PATTERN, LAZY INITIALIZATION
    public static getInstance(): Page {
        if (!Page.instance) {
            Page.instance = new Page(50.0);
        }
        return Page.instance;
    }

    clickObject() {
        this.clicks += 1;
    }

    gameLoop() {
        // try to call gameLoop() at AROUND the right time
        const now = Date.now();
        const delta = now - this.prev;
        if (delta < this.interval) {
            // since gameLoop() was called early, set timeout to what SHOULD be the remainder of this tick
            setTimeout(this.gameLoop.bind(this), this.interval - delta);
            return;
        }
        this.prev = now;

        // calculations will use ACTUAL time since last tick for multiplier
        const multiplier = delta / 1000.0;

        this.makingStrategy.tick(this.clicks, multiplier);
        // $objects += $objectsPerSecond * $opsMultiplier * multiplier;
        // $objects += this.clicks;
        this.clicks = 0;

        if (this.level === 0 && get(objects) >= 50) {
            this.level = 1; // Developers
            this.makingStrategy.add("developer");
        } else if (this.level === 1 && this.makingStrategy.count("developer") >= 5) {
            this.level = 2; // ObjectFactories
            this.makingStrategy.add("objectfactory");
        } else if (this.level === 2 && get(objects) >= 1500) {
            this.level = 3; // Decorator and Strategy Patterns
        }

        // hopefully make up for time innacuracies by ajusting timeout for next tick
        setTimeout(this.gameLoop.bind(this), this.interval - (delta - this.interval));
    }
}

export default Page