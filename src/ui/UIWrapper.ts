export interface IUI {
    clearFormNotification(uniqueId: string): boolean;
    getFormType(): XrmEnum.FormType;
    setFormNotification(message: string, level: Xrm.FormNotificationLevel, uniqueId: string): boolean;
}

export class UIWrapper implements IUI {
    constructor(private ui: Xrm.Ui) {}

    clearFormNotification(uniqueId: string): boolean {
        return this.ui.clearFormNotification(uniqueId);
    }

    getFormType(): XrmEnum.FormType {
        return this.ui.getFormType();
    }

    setFormNotification(message: string, level: Xrm.FormNotificationLevel, uniqueId: string): boolean {
        return this.ui.setFormNotification(uniqueId, level, uniqueId);
    }
}
