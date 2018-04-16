export interface INavigation {
    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters: Xrm.Utility.FormOpenParameters): Promise<void>;
    openUrl(url: string, openUrlOptions?: Xrm.Navigation.DialogSizeOptions): void;
    openWebResource(webResourceName: string, windowOptions?: Xrm.Navigation.OpenWebresourceOptions, data?: string): void;
}

export class NullNavigation implements INavigation {
    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters: Xrm.Utility.FormOpenParameters): Promise<void> {
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

    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters: Xrm.Utility.FormOpenParameters): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.xrm.Navigation
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
