import { get } from "svelte/store";
import type Maker from "./Maker";
import { objects, objectsPerSecond, opsMultiplier } from "./stores";
import MakerFactory from "./MakerFactory";

// STRATEGY PATTERN
class MakingStrategy {
    // the makingstrategy contains a list of makers that the user has access to. it also has a description for when the user is choosing between strategies.
    makers: Maker[];
    desc: string;

    constructor(makers: Maker[]) {
        this.makers = makers;
        this.desc = "As Kay intended.";
    }

    // makingstrategies allow the tick() function to be modified to have different behavior rather than just incrementing the object counter
    tick(clicks: number, multiplier: number) {
        objects.set(get(objects) + get(objectsPerSecond) * get(opsMultiplier) * multiplier);
        objects.set(get(objects) + clicks);
    }

    count(makerType: string): number {
        makerType = makerType.toLowerCase();
        return this.makers.find(maker => maker.type === makerType)?.count ?? 0;
    }

    add(makerType: string) {
        const maker = new MakerFactory().getMaker(makerType)!;
        this.makers.push(maker);
    }
}

export default MakingStrategy;