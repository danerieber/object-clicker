import Maker from "./Maker";

// DECORATOR PATTERN
abstract class MakerDecorator extends Maker {
    protected maker: Maker;

    decorators: string[];

    constructor(maker: Maker) {
        // store maker values in this instance and save instance of previous maker
        super(maker.baseCost, maker.costCurve, maker.unitOPS, maker.pluralName, maker.addButtonText, maker.type);
        this.maker = maker;
        this.decorators = [];
    }

    inner() {
        return this.maker;
    }
}

export default MakerDecorator;