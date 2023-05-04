import type Maker from "./Maker";
import MakingStrategy from "./MakingStrategy";
import { opsMultiplier } from "./stores";

// STRATEGY PATTERN
class AggressiveMakingStrategy extends MakingStrategy {
    constructor(makers: Maker[]) {
        super(makers);
        this.desc = "Doubles your OPS, but for each type of maker, there is a 1 in 500 chance each tick to lose 10% of them!";
        opsMultiplier.set(2);
    }

    // the aggressivemakingstrategy uses the tick function to randomly remove makers
    tick(clicks: number, multiplier: number) {
        super.tick(clicks, multiplier);
        for (let i = 0; i < this.makers.length; i++) {
            if (Math.random() <= 0.002) {
                let amt = Math.floor(this.makers[i].count * 0.1);
                this.makers[i].del(amt);
            }
        }
    }
}

export default AggressiveMakingStrategy;