import { get } from "svelte/store";
import { objects, objectsPerSecond } from "./stores";

abstract class Maker {
    baseCost: number;
    costCurve: number;
    unitOPS: number;

    pluralName: string;
    addButtonText: string;

    count: number;
    cost: number;

    type: string;

    constructor(baseCost: number, costCurve: number, unitOPS: number, pluralName: string, addButtonText: string, type: string) {
        this.baseCost = baseCost;
        this.costCurve = costCurve;
        this.unitOPS = unitOPS;
        
        this.pluralName = pluralName;
        this.addButtonText = addButtonText;

        this.count = 0;
        this.cost = baseCost;

        this.type = type;
    }

    inner(): Maker {
        return this;
    }

    add() {
        if (get(objects) < this.cost) return;
        objects.set(get(objects) - this.cost);
        objectsPerSecond.set(get(objectsPerSecond) + this.unitOPS);
        this.count += 1;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));
    }
}

export default Maker;