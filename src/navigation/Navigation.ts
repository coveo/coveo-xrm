export interface INavigation {
    openAlertDialog(alertStrings: Xrm.Navigation.AlertStrings, alertOptions?: Xrm.Navigation.DialogSizeOptions);
    openConfirmDialog(confirmStrings: Xrm.Navigation.ConfirmStrings, confirmOptions?: Xrm.Navigation.DialogSizeOptions): Promise<Xrm.Navigation.ConfirmResult>;
    openErrorDialog(errorOptions: Xrm.Navigation.ErrorDialogOptions);
    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters?: Xrm.Utility.FormOpenParameters): Promise<void>;
    openUrl(url: string, openUrlOptions?: Xrm.Navigation.DialogSizeOptions): void;
    openWebResource(webResourceName: string, windowOptions?: Xrm.Navigation.OpenWebresourceOptions, data?: string): void;
}

export class NullNavigation implements INavigation {
    openAlertDialog(alertStrings: Xrm.Navigation.AlertStrings, alertOptions: Xrm.Navigation.DialogSizeOptions) {
        console.log("Not in Dynamics, doing nothing.");
    }

    async openConfirmDialog(confirmStrings: Xrm.Navigation.ConfirmStrings, confirmOptions?: Xrm.Navigation.DialogSizeOptions) {
        return {
            confirmed: true
        };
    }

    openErrorDialog(errorOptions: Xrm.Navigation.ErrorDialogOptions) {
        console.log("Not in Dynamics, doing nothing.");
    }

    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters?: Xrm.Utility.FormOpenParameters): Promise<void> {
        return Promise.resolve();
    }

    openUrl(url: string, openUrlOptions?: Xrm.Navigation.DialogSizeOptions): void {
        window.open(url, "_blank");
    }

    openWebResource(webResourceName: string, windowOptions?: Xrm.Navigation.OpenWebresourceOptions, data?: string): void {
        window.open(`WebResources/${webResourceName}`);
    }
}

export class Navigation implements INavigation {
    constructor(private xrm: Xrm.XrmStatic) {}

    openAlertDialog(alertStrings: Xrm.Navigation.AlertStrings, alertOptions?: Xrm.Navigation.DialogSizeOptions) {
        return new Promise<void>((resolve, reject) => {
            return this.xrm.Navigation
                .openAlertDialog(alertStrings, alertOptions)
                .then(() => resolve(), error => reject(error));
        });
    }

    openConfirmDialog(confirmStrings: Xrm.Navigation.ConfirmStrings, confirmOptions?: Xrm.Navigation.DialogSizeOptions) {
        return new Promise<Xrm.Navigation.ConfirmResult>((resolve, reject) => {
            return this.xrm.Navigation
                .openConfirmDialog(confirmStrings, confirmOptions)
                .then((success) => resolve(success), error => reject(error));
        });
    }

    openErrorDialog(errorOptions: Xrm.Navigation.ErrorDialogOptions) {
        return new Promise<void>((resolve, reject) => {
            return this.xrm.Navigation
                .openErrorDialog(errorOptions)
                .then(() => resolve(), error => reject(error));
        });
    }

    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters?: Xrm.Utility.FormOpenParameters): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            return this.xrm.Navigation
                .openForm(options, formParameters)
                .then(() => resolve(), error => reject(error));
        });
    }

    openUrl(url: string, openUrlOptions?: Xrm.Navigation.DialogSizeOptions): void {
        this.xrm.Navigation.openUrl(url, openUrlOptions);
    }

    openWebResource(webResourceName: string, windowOptions?: Xrm.Navigation.OpenWebresourceOptions, data?: string): void {
        this.xrm.Navigation.openWebResource(webResourceName, windowOptions, data);
    }
}
