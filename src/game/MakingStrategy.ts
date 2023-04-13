import { get } from "svelte/store";
import type Maker from "./Maker";
import { objects, objectsPerSecond, opsMultiplier } from "./stores";
import DeveloperMaker from "./DeveloperMaker";
import MakerFactory from "./MakerFactory";
import ObjectFactoryMaker from "./ObjectFactoryMaker";

class MakingStrategy {
    makers: Maker[];

    constructor() {
        this.makers = [];
    }

    tick(clicks: number, multiplier: number) {
        objects.set(get(objects) + get(objectsPerSecond) * get(opsMultiplier) * multiplier);
        objects.set(get(objects) + clicks);
    }

    count(makerType: string): number {
        makerType = makerType.toLowerCase();
        if (makerType === "developer") {
            return this.makers.find(maker => maker instanceof DeveloperMaker)?.count ?? 0;
        }
        if (makerType === "objectfactory") {
            return this.makers.find(maker => maker instanceof ObjectFactoryMaker)?.count ?? 0;
        }
        return 0;
    }

    add(makerType: string) {
        const maker = new MakerFactory().getMaker(makerType)!;
        this.makers.push(maker);
    }
}

export default MakingStrategy;