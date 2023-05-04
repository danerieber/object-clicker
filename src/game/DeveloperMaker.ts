import Maker from "./Maker";

// IS-A INHERITANCE
class DeveloperMaker extends Maker {
    constructor() {
        super(60, 1.22, 1, "Developers", "Hire Developer", "developer");
    }
}

export default DeveloperMaker;