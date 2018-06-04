export interface IEntity {
    getId: () => string;
    save(saveMode?: Xrm.EntitySaveMode)
}

export class EntityWrapper implements IEntity {
    constructor(private entity: Xrm.Entity) {}

    getId() {
        return this.entity.getId();
    }

    save(saveMode?: Xrm.EntitySaveMode) {
        this.entity.save(saveMode);
    }
}
