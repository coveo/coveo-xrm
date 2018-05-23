export interface IEntity {
    getId: () => string;
}

export class EntityWrapper implements IEntity {
    constructor(private entity: Xrm.Entity) {
    }

    getId() {
        return this.entity.getId();
    }
}
