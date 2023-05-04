import Maker from "./Maker";

// IS-A INHERITANCE
class ObjectFactoryMaker extends Maker {
    constructor() {
        super(500, 1.12, 7, "ObjectFactories", "Add ObjectFactory", "objectfactory");
    }
}

export default ObjectFactoryMaker;