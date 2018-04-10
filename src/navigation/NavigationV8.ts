import { INavigation, NullNavigation } from "./Navigation";
export class NavigationV8 extends NullNavigation {
    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters?: Xrm.Utility.FormOpenParameters): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            if (!options && !options.entityName) {
                reject(new Error("Cannot open form if entity name is undefined."));
            }
            if (options.useQuickCreateForm) {
                parent.Xrm.Utility.openQuickCreate(options.entityName, null, formParameters)
                    .then(() => resolve(), error => reject(error));
            } else {
                parent.Xrm.Utility.openEntityForm(options.entityName, options.entityId, formParameters, { openInNewWindow: options.openInNewWindow });
                resolve();
            }
        });
    }

    openWebResource(webResourceName: string, windowOptions?: Xrm.Navigation.OpenWebresourceOptions, data?: string): void {
        parent.Xrm.Utility.openWebResource(webResourceName, data, windowOptions ? windowOptions.width : null, windowOptions ? windowOptions.height : null)
    }
}
