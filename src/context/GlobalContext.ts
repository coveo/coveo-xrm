import { OData } from "coveo-odata";
import { IClientContext, NullClientContext, ClientContext } from "./ClientContext";
import { IUserSettings, UserSettings, UserSettingsV8, NullUserSettings } from "./Global/UserSettings";

export interface IGlobalContext {
    client: IClientContext;
    userSettings: IUserSettings;

    getClientUrl(): string;
    getCrmVersion(): string;
    getCurrentAppUrl(): string;
    getOrgUniqueName(): string;
}

export class NullGlobalContext implements IGlobalContext {
    clientContext = new NullClientContext();
    innerUserSettings = new NullUserSettings();

    get client(): IClientContext {
        return this.clientContext;
    }

    get userSettings() {
        return this.innerUserSettings;
    }

    getClientUrl(): string {
        return "./";
    }
    getCrmVersion(): string {
        return "8.0";
    }
    getCurrentAppUrl(): string {
        return "/";
    }
    getOrgUniqueName(): string {
        return "Fake Org";
    }
}

export class GlobalContext implements IGlobalContext {
    private innerUserSettings: IUserSettings;

    constructor(private context: Xrm.GlobalContext) {
        this.innerUserSettings = this.context.userSettings
            ? new UserSettings(this.context.userSettings)
            : new UserSettingsV8(this.context);
    }

    get client(): IClientContext {
        return new ClientContext(this.context.client);
    }

    get userSettings(): IUserSettings {
        return this.innerUserSettings;
    }

    getClientUrl(): string {
        return this.context.getClientUrl();
    }

    getCrmVersion(): string {
        return this.context.getVersion();
    }

    getCurrentAppUrl(): string {
        return this.context.getCurrentAppUrl
            ? this.context.getCurrentAppUrl()
            : this.context.getClientUrl();
    }

    getOrgUniqueName(): string {
        return this.context.getOrgUniqueName();
    }
}
