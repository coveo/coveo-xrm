import * as Url from "url-parse";

export interface IOrganization extends Xrm.OrganizationSettings {
    getClientUrl(): string;
    getName(): string;
    getDiscoveryOriginUrl(): string;
    getDiscoveryUrl(): string;
}

/**
 * Decorates the current organization settings with more detailed information.
 * @see {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/clientapi/reference/xrm-utility/getglobalcontext/organizationsettings }.
 */
export class Organization implements IOrganization {
    private readonly _clientUrl: Url;

    constructor(clientUrl: string, private readonly _settings: Xrm.OrganizationSettings) {
        if (clientUrl) {
            this._clientUrl = new Url(clientUrl);
        } else {
            const locationUrl: Url = new Url(location.href);
            this._clientUrl = new Url(locationUrl.origin);
        }
    }

    get baseCurrencyId(): string { return this._settings.baseCurrencyId; }
    get defaultCountryCode(): string { return this._settings.defaultCountryCode; }
    get languageId(): number { return this._settings.languageId; }
    get organizationId(): string { return this._settings.organizationId; }
    get uniqueName(): string { return this._settings.uniqueName; }
    get isAutoSaveEnabled(): boolean { return this._settings.isAutoSaveEnabled; }
    get useSkypeProtocol(): boolean { return this._settings.useSkypeProtocol; }

    getClientUrl(): string {
        return this._clientUrl.toString();
    }

    getDiscoveryOriginUrl(): string {
        const discoUrl: string = this.getDiscoveryUrl();
        return discoUrl ? new Url(discoUrl).origin : undefined;
    }

    /**
     * Returns the discovery url associated to the organization.
     * @see {@link https://docs.microsoft.com/en-us/dynamics365/customer-engagement/developer/org-service/discover-url-organization-organization-service }.
     */
    getDiscoveryUrl(): string {
        const region: string = this.getRegionHostName();
        return region ? `https://disco.${region}/XRMServices/2011/Discovery.svc` : undefined;
    }

    getName(): string {
        const region: string = this.getRegionHostName();
        return region
            ? this._clientUrl.hostname.replace(`.${region}`, "")
            : undefined;
    }

    private getRegionHostName(): string {
        const hostname: string = this._clientUrl.hostname;
        const index: number = hostname.indexOf(".");
        return index > 0 && index < hostname.length - 1
            ? hostname.substring(index + 1)
            : undefined;
    }
}
