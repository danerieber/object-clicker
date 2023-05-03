import { get } from "svelte/store";
import type Maker from "./Maker";
import { objects, objectsPerSecond, opsMultiplier } from "./stores";
import DeveloperMaker from "./DeveloperMaker";
import MakerFactory from "./MakerFactory";
import ObjectFactoryMaker from "./ObjectFactoryMaker";

class MakingStrategy {
    makers: Maker[];

    constructor(makers: Maker[]) {
        this.makers = makers;
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