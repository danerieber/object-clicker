import Maker from "./Maker";

abstract class MakerDecorator extends Maker {
    protected maker: Maker;

    decorators: string[];

    constructor(maker: Maker) {
        super(maker.baseCost, maker.costCurve, maker.unitOPS, maker.pluralName, maker.addButtonText, maker.type);
        this.maker = maker;
        this.decorators = [];
    }

    inner() {
        return this.maker;
    }
}

export default MakerDecorator;