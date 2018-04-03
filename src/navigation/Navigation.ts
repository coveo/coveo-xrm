export interface INavigation {
    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters: Xrm.Utility.FormOpenParameters): Promise<void>;
}

export class NullNavigation implements INavigation {
    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters: Xrm.Utility.FormOpenParameters): Promise<void> {
        return Promise.resolve();
    }
}

export class Navigation implements INavigation {
    openForm(options: Xrm.Navigation.EntityFormOptions, formParameters: Xrm.Utility.FormOpenParameters): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            Xrm.Navigation
                .openForm(options, formParameters)
                .then(() => resolve(), error => reject(error));
        });
    }
}
