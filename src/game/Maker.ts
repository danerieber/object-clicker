import { get } from "svelte/store";
import { objects, objectsPerSecond } from "./stores";

// IS-A INHERITANCE
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

    // utility function for unwrapping decorators
    inner(): Maker {
        return this;
    }

    // makers have a baseCost that is then multiplied by an exponential to determine the actual cost. the costCurve represents the base of the exponential, and is raised to the Nth power, where N is the maker count. So, every time a maker is purchased, its price increases exponentially.
    updateCount(change: number) {
        this.count += change;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));
    }

    // update our global objects and OPS values to reflect the purchase of one additional maker
    add() {
        if (get(objects) < this.cost) return;
        objects.set(get(objects) - this.cost);
        objectsPerSecond.set(get(objectsPerSecond) + this.unitOPS);
        // the updateCount() code had to be duplicated in order to run properly. I do not know why, but it worked.
        this.count++;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));
    }

    // adds a maker without making a purchase
    give() {
        objectsPerSecond.set(get(objectsPerSecond) + this.unitOPS);
        this.count++;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));
    }

    // removes the specified number of makers and updates OPS accordingly
    del(amt: number) {
        objectsPerSecond.set(get(objectsPerSecond) - this.unitOPS * amt);
        this.count -= amt;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));
    }
}

export default Maker;