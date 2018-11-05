const discoveryUrlPrefix = "disco";

export interface IOrganization extends Xrm.OrganizationSettings {
    readonly clientUrl: string;
    readonly name: string;
    getDiscoveryUrl(): string;
}

interface IOrganizationAttributes {
    readonly name: string;
}

/**
 * Decorates the current organization settings with more detailed information.
 * @param settings Current organization settings.
 * @see {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/clientapi/reference/xrm-utility/getglobalcontext/organizationsettings }.
 */
export class Organization implements IOrganization {
    private readonly attributes: IOrganizationAttributes;

    public readonly baseCurrencyId: string;
    public readonly defaultCountryCode: string;
    public readonly isAutoSaveEnabled: boolean;
    public readonly languageId: number;
    public readonly organizationId: string;
    public readonly uniqueName: string;
    public readonly useSkypeProtocol: boolean;

    constructor(public readonly clientUrl: string, settings: Xrm.OrganizationSettings, private readonly discoveryUrl?: string) {
        Object.assign(this, settings);
        this.attributes = (settings as any).attributes || {};
    }

    get name(): string { return this.attributes.name; }

    public getDiscoveryUrl(): string {
        return this.discoveryUrl || this.getDefaultDiscoveryUrl();
    }

    private getDefaultDiscoveryUrl(): string {
        return this.clientUrl && this.name
            ? this.clientUrl.replace(this.name, discoveryUrlPrefix)
            : this.clientUrl;
    }
}
