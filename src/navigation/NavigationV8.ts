import { NullNavigation } from "./Navigation";
export class NavigationV8 extends NullNavigation {
    constructor(private xrm: Xrm.XrmStatic) {
        super();
    }

    openAlertDialog(alertStrings: Xrm.Navigation.AlertStrings, alertOptions: Xrm.Navigation.DialogSizeOptions) {
        return new Promise<void>((resolve) => {
            this.xrm.Utility.alertDialog(alertStrings.text, () => resolve());
        });
    }

    openConfirmDialog(confirmStrings: Xrm.Navigation.ConfirmStrings, confirmOptions: Xrm.Navigation.DialogSizeOptions) {
        return new Promise<Xrm.Navigation.ConfirmResult>((resolve) => {
            this.xrm.Utility.confirmDialog(confirmStrings.text, () => resolve({confirmed: true}), () => resolve({confirmed: false}));
        });
    }

    openErrorDialog(errorOptions: Xrm.Navigation.ErrorDialogOptions) {
        return new Promise<void>((resolve) => {
            this.xrm.Utility.alertDialog(`${errorOptions.errorCode}: ${errorOptions.message} ${errorOptions.details}`, () => resolve());
        });
    }

    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters?: Xrm.Utility.FormOpenParameters): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!options && !options.entityName) {
                reject(new Error("Cannot open form if entity name is undefined."));
            }
            if (options.useQuickCreateForm) {
                this.xrm.Utility.openQuickCreate(options.entityName, null, formParameters)
                    .then(() => resolve(), error => reject(error));
            } else {
                this.xrm.Utility.openEntityForm(options.entityName, options.entityId, formParameters, { openInNewWindow: options.openInNewWindow });
                resolve();
            }
        });
    }

    openWebResource(webResourceName: string, windowOptions?: Xrm.Navigation.OpenWebresourceOptions, data?: string): void {
        this.xrm.Utility.openWebResource(webResourceName, data, windowOptions ? windowOptions.width : null, windowOptions ? windowOptions.height : null);
    }
}
