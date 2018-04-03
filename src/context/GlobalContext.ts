import { OData } from "coveo-odata";

export interface IGlobalContext {
    getClientUrl(): string;
    getCrmVersion(): string;
    getOrgUniqueName(): string;
}

export class NullGlobalContext implements IGlobalContext {
    getClientUrl(): string {
        return "./";
    }
    getCrmVersion(): string {
        return "8.0";
    }
    getOrgUniqueName(): string {
        return "Fake Org";
    }
}

export class GlobalContext implements IGlobalContext {
    constructor(private context: Xrm.GlobalContext) {}

    getClientUrl(): string {
        return this.context.getClientUrl();
    }

    getCrmVersion(): string {
        return this.context.getVersion();
    }

    getOrgUniqueName(): string {
        return this.context.getOrgUniqueName();
    }
}
