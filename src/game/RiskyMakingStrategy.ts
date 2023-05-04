import type Maker from "./Maker";
import MakingStrategy from "./MakingStrategy";
import { opsMultiplier } from "./stores";

// STRATEGY PATTERN
class RiskyMakingStrategy extends MakingStrategy {
    ticksLeft: number;

    constructor(makers: Maker[]) {
        super(makers);
        this.desc = "Halves your OPS, but there is a 1 in 100 chance each tick to earn 100x your OPS for the next 10 ticks!";
        opsMultiplier.set(0.5);
        this.ticksLeft = -1;
    }

    // the riskymakingstrategy uses the tick function as a sort of lottery that spikes the OPS sometimes
    tick(clicks: number, multiplier: number) {
        if (Math.random() <= 0.01) {
            opsMultiplier.set(100);
            this.ticksLeft = 10;
        }
        super.tick(clicks, multiplier);
        if (this.ticksLeft === 0) {
            opsMultiplier.set(0.5);
        }
        else if (this.ticksLeft >= 0) {
            this.ticksLeft--;
        }
    }
}

export default RiskyMakingStrategy;