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

    updateCount(change: number) {
        this.count += change;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));
    }

    add() {
        if (get(objects) < this.cost) return;
        objects.set(get(objects) - this.cost);
        objectsPerSecond.set(get(objectsPerSecond) + this.unitOPS);
        this.count++;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));
    }

    give() {
        objectsPerSecond.set(get(objectsPerSecond) + this.unitOPS);
        this.count++;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));
    }

    del(amt: number) {
        objectsPerSecond.set(get(objectsPerSecond) - this.unitOPS * amt);
        this.count -= amt;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));
    }
}

export default Maker;