import { EntityWrapper, IEntity } from "./entity/EntityWrapper";

export interface IXrmData {
    entity: IEntity;
    refresh(save: boolean): Promise<void>;
}

export class DataWrapper implements IXrmData {
    private innerEntity: IEntity;

    constructor(private data: Xrm.Data) {
        this.innerEntity = new EntityWrapper(this.data.entity);
    }

    get entity() {
        return this.innerEntity;
    }

    refresh(save: boolean): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.data.refresh(save)
                .then(() => resolve(), () => reject());
        });
    }
}
