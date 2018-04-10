import { OData } from "coveo-odata";
import { IClientContext, NullClientContext, ClientContext } from "./ClientContext";

export interface IGlobalContext {
    client: IClientContext;

    getClientUrl(): string;
    getCrmVersion(): string;
    getCurrentAppUrl(): string;
    getOrgUniqueName(): string;
}

export class NullGlobalContext implements IGlobalContext {
    get client(): IClientContext {
        return new NullClientContext();
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
    constructor(private context: Xrm.GlobalContext) {}

    get client(): IClientContext {
        return new ClientContext(this.context.client);
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
