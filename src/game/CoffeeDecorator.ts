import type Maker from "./Maker";
import MakerDecorator from "./MakerDecorator";

class CoffeeDecorator extends MakerDecorator {
    constructor(maker: Maker) {
        super(maker);

        this.baseCost = maker.baseCost * 1.05;
        this.costCurve = maker.costCurve;
        this.unitOPS = maker.unitOPS * 1.1;

        this.pluralName = maker.pluralName;
        this.addButtonText = maker.addButtonText;

        this.count = maker.count;
        this.cost = Math.floor(this.baseCost * Math.pow(this.costCurve, this.count));

        this.decorators.push("coffee");
    }

    updateCount(change: number): void {
        super.updateCount(change);
        this.inner().updateCount(change);
    }

    add() {
        super.add();
        this.inner().updateCount(1);
    }

    give() {
        super.add();
        this.inner().updateCount(1);
    }

    del(amt: number) {
        super.del(amt);
        this.inner().updateCount(-amt);
    }
}

export default CoffeeDecorator;