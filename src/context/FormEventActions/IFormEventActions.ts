import { CrmSaveMode } from "./CrmSaveMode";

export interface IFormEventActions {
    xrmUi: Xrm.Ui;
    xrmEntity: Xrm.Entity;
    clearNotifications(id: string): boolean;
    getAttribute(attributeName: string): Xrm.Attributes.Attribute;
    setFormNotification(message: string, level: Xrm.FormNotificationLevel, uniqueId: string): boolean;
    save(saveMode?: CrmSaveMode): void;
}
