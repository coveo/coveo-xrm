export interface IFormContext {
    ui: Xrm.Ui;
    data: Xrm.Data;
    getAttribute: (attributeName: string) => Xrm.Attributes.Attribute;
}
export const buildFormContext =
    (xrmPage: Xrm.Page, context?: Xrm.Events.EventContext): IFormContext => 
        context
        ? context.getFormContext ? context.getFormContext() : xrmPage
        : xrmPage;