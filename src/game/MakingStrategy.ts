import { get } from "svelte/store";
import type Maker from "./Maker";
import { objects, objectsPerSecond, opsMultiplier } from "./stores";
import MakerFactory from "./MakerFactory";

class MakingStrategy {
    makers: Maker[];
    desc: string;

    constructor(makers: Maker[]) {
        this.makers = makers;
        this.desc = "As Kay intended.";
    }

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