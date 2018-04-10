export interface IClientContext {
    getClient: () => string;
}

export class NullClientContext implements IClientContext {
    getClient() {
        return "Web";
    }
}

export class ClientContext implements IClientContext {
    constructor(private client: Xrm.ClientContext) {}

    getClient(): string {
        return this.client.getClient();
    }
}
