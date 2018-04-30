import { IFormEventActions } from "./IFormEventActions";
import { CrmSaveMode } from "./CrmSaveMode";

export class FormEventActions implements IFormEventActions {

    constructor(public xrmUi: Xrm.Ui, public xrmEntity: Xrm.Entity, public getAttributeFn: (attributeName: string) => Xrm.Attributes.Attribute) { }

    clearNotifications(id: string): boolean {
        return this.xrmUi.clearFormNotification(id);
    }
    
    setFormNotification(message: string, level: Xrm.FormNotificationLevel, uniqueId: string): boolean {
        return this.xrmUi.setFormNotification(message, level, uniqueId);
    }

    getAttribute(attributeName: string): Xrm.Attributes.Attribute {
        return this.getAttributeFn(attributeName);
    }

    save(saveMode?: CrmSaveMode): void {
        if (saveMode && saveMode === CrmSaveMode.SaveAndClose) {
            this.xrmEntity.save("saveandclose");
        } else {
            this.xrmEntity.save();
        }
    }
}
