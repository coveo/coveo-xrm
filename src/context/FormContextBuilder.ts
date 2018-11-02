import { DataWrapper, IXrmData } from "../data/DataWrapper";
import { NullData } from "../data/NullData";
import { NullUI } from "../ui/NullUI";
import { IUI, UIWrapper } from "../ui/UIWrapper";

export interface IFormContext {
    ui: IUI;
    data: IXrmData;
    getAttribute<T extends Xrm.Attributes.Attribute | Xrm.Attributes.Attribute[]>(attributeName: string): T;
    getControl<T extends Xrm.Controls.Control | Xrm.Controls.Control[]>(attributeName: string): T;
}

export class FormContext implements IFormContext {
    private innerUi: IUI;
    private innerData: IXrmData;

    get ui() {
        return this.innerUi;
    }

    get data() {
        return this.innerData;
    }

    constructor(private formContext: Xrm.FormContext) {
        this.innerUi = formContext.ui
            ? new UIWrapper(formContext.ui)
            : new NullUI();
        this.innerData = formContext.data
            ? new DataWrapper(formContext.data)
            : new NullData();
    }

    getAttribute<T extends Xrm.Attributes.Attribute | Xrm.Attributes.Attribute[]>(attributeName: string): T {
        return this.formContext.getAttribute(attributeName) as T;
    }

    getControl<T extends Xrm.Controls.Control | Xrm.Controls.Control[]>(attributeName: string): T {
        return this.formContext.getControl(attributeName) as T;
    }
}

export class NullFormContext implements IFormContext {
    private innerUi: IUI;
    private innerData: IXrmData;

    get ui(): IUI {
        return this.innerUi;
    }
    get data(): IXrmData {
        return this.innerData;
    }

    constructor() {
        this.innerUi = new NullUI();
        this.innerData = new NullData();
    }

    getAttribute<T extends Xrm.Attributes.Attribute | Xrm.Attributes.Attribute[]>(attributeName: string): T {
        return null;
    }
    getControl<T extends Xrm.Controls.Control | Xrm.Controls.Control[]>(attributeName: string): T {
        return null;
    }
}

export const buildFormContext =
    (xrm: Xrm.XrmStatic, context?: Xrm.Events.EventContext): IFormContext => {
        const formContext = context && context.getFormContext
            ? context.getFormContext()
            : xrm ? xrm.Page : null;
        return formContext
            ? new FormContext(formContext)
            : new NullFormContext();
    };
