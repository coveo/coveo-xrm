import { IUI } from "./UIWrapper";

export class NullUI implements IUI {
    clearFormNotification(uniqueId: string): boolean {
        return true;
    }
    getFormType(): XrmEnum.FormType {
        return XrmEnum.FormType.Update;
    }
    setFormNotification(message: string, level: Xrm.FormNotificationLevel, uniqueId: string): boolean {
        return true;
    }
}
