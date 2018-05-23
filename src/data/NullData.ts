import { IXrmData } from "./DataWrapper";
import { IEntity } from "./entity/EntityWrapper";

export class NullData implements IXrmData {
    get entity(): IEntity {
        return null;
    }
    refresh(save: boolean): Promise<void> {
        return Promise.resolve();
    }
}
