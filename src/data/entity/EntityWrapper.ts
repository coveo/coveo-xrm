export interface IEntity {
    getId: () => string;
    getEntityName: () => string;
    save(saveMode?: Xrm.EntitySaveMode);
}

export class EntityWrapper implements IEntity {
    constructor(private entity: Xrm.Entity) {}

    getId() {
        return this.entity.getId();
    }

    getEntityName() {
        return this.entity.getEntityName();
    }

    save(saveMode?: Xrm.EntitySaveMode) {
        this.entity.save(saveMode);
    }
}
