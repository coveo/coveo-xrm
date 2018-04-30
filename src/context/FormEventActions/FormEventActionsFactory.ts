import { FormEventActions } from "./FormEventActions";
import { IFormEventActions } from "./IFormEventActions";

export class FormEventActionsFactory {
    public static buildFormEventActions(formContext: Xrm.FormContext, xrm: Xrm.XrmStatic): IFormEventActions {
        const areV9MethodsAvailable = !!formContext
                                    && !!formContext.data
                                    && !!formContext.data.entity
                                    && !!formContext.data.entity.save;
        return areV9MethodsAvailable
            ? new FormEventActions(formContext.ui, formContext.data.entity, formContext.getAttribute)
            : new FormEventActions(xrm.Page.ui, xrm.Page.data.entity, xrm.Page.getAttribute);
    }
}

export const buildFormEventActions = FormEventActionsFactory.buildFormEventActions;
