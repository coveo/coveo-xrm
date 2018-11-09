import { ClientContext, IClientContext, NullClientContext } from "./ClientContext";
import { IUserSettings, NullUserSettings, UserSettings, UserSettingsV8 } from "./Global/UserSettings";
import { IOrganization, Organization } from "./Organization";

export interface IGlobalContext {
    client: IClientContext;
    userSettings: IUserSettings;

    getClientUrl(): string;
    getCrmVersion(): string;
    getCurrentAppUrl(): string;
    getOrgUniqueName(): string;
    getOrganization(): IOrganization;
}

abstract class Context<TClientContext extends IClientContext> {
    protected constructor(
        protected readonly clientContext: TClientContext,
        protected readonly innerUserSettings: IUserSettings) { }

    get client(): IClientContext { return this.clientContext; }
    get userSettings() { return this.userSettings; }
}

interface INullGlobalContextOptions {
    readonly clientUrl: string;
    readonly crmVersion: string;
    readonly appUrl: string;
    readonly orgUniqueName: string;
}

export class NullGlobalContext extends Context<NullClientContext> implements IGlobalContext {
    constructor(private readonly options?: INullGlobalContextOptions) {
        super(new NullClientContext(), new NullUserSettings());
        const defaultOptions: INullGlobalContextOptions = {
            clientUrl: "./",
            crmVersion: "8.0",
            appUrl: "/",
            orgUniqueName: "Fake Org"
        };
        this.options = { ...defaultOptions, ...options };
    }

    getClientUrl(): string {
        return this.options.clientUrl;
    }
    getCrmVersion(): string {
        return this.options.crmVersion;
    }
    getCurrentAppUrl(): string {
        return this.options.appUrl;
    }
    getOrgUniqueName(): string {
        return this.options.orgUniqueName;
    }
    getOrganization(): IOrganization {
        const settings: Partial<Xrm.OrganizationSettings> = {
            uniqueName: this.getOrgUniqueName()
        };
        return new Organization(this.getClientUrl(), settings as Xrm.OrganizationSettings);
    }
}

export class GlobalContext extends Context<ClientContext> implements IGlobalContext {
    constructor(private readonly xrmContext: Xrm.GlobalContext) {
        super(
            new ClientContext(xrmContext.client),
            xrmContext.userSettings
                ? new UserSettings(xrmContext.userSettings)
                : new UserSettingsV8(xrmContext));
    }

    getClientUrl(): string {
        return this.xrmContext.getClientUrl();
    }
    getCrmVersion(): string {
        return this.xrmContext.getVersion();
    }
    getCurrentAppUrl(): string {
        return this.xrmContext.getCurrentAppUrl
            ? this.xrmContext.getCurrentAppUrl()
            : this.xrmContext.getClientUrl();
    }
    getOrgUniqueName(): string {
        return this.xrmContext.getOrgUniqueName();
    }
    getOrganization(): IOrganization {
        const orgSettings: Xrm.OrganizationSettings = this.xrmContext.organizationSettings || {} as any;
        orgSettings.uniqueName = this.getOrgUniqueName();
        return new Organization(this.getClientUrl(), orgSettings);
    }
}
