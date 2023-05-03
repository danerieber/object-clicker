import type Maker from "./Maker";
import MakerDecorator from "./MakerDecorator";
import { get } from "svelte/store";
import { objects, objectsPerSecond } from "./stores";

class LeetcodeDecorator extends MakerDecorator {
    constructor(maker: Maker) {
        super(maker);

        this.baseCost = maker.baseCost;
        this.costCurve = maker.costCurve * 1.01;
        this.unitOPS = maker.unitOPS * 1.2;
        
        this.pluralName = maker.pluralName;
        this.addButtonText = maker.addButtonText;

        this.count = maker.count;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));

        this.decorators.push("leetcode");
    }

    add() {
        super.add();
        this.inner().add();
    }
}

export default LeetcodeDecorator;