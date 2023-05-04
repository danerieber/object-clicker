import DeveloperMaker from "./DeveloperMaker";
import type Maker from "./Maker";
import ObjectFactoryMaker from "./ObjectFactoryMaker";

// FACTORY PATTERN
class MakerFactory {
    getMaker(makerType: string): Maker | undefined {
        makerType = makerType.toLowerCase();
        if (makerType === "developer") {
            return new DeveloperMaker();
        }
        if (makerType === "objectfactory") {
            return new ObjectFactoryMaker();
        }
    }
}

export default MakerFactory;