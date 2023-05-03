import type Maker from "./Maker";
import MakingStrategy from "./MakingStrategy";
import { opsMultiplier } from "./stores";

class FriendlyMakingStrategy extends MakingStrategy {
    constructor(makers: Maker[]) {
        super(makers);
        this.desc = "Halves your OPS, but for each type of maker, there is a 1 in 500 chance each tick to earn a new one for free!";
        opsMultiplier.set(0.5);
    }

    tick(clicks: number, multiplier: number) {
        super.tick(clicks, multiplier);
        for (let i = 0; i < this.makers.length; i++) {
            if (Math.random() <= 0.002) {
                this.makers[i].give();
            }
        }
    }
}

export default FriendlyMakingStrategy;