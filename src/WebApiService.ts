import { OData, Batch } from "coveo-odata";
import { IGlobalContext } from "./context/GlobalContext";

export class WebApiService {
    constructor(private globalContext: IGlobalContext) {}

    callAction<T>(actionName: string, options?: any) {
        return this
            .init()
            .resource(actionName)
            .post(options)
            .build<T>();
    }

    get serviceEndpoint(): string {
        return `${this.globalContext.getClientUrl()}/api/data/v${this.getODataEndpointVersion()}`;
    }

    init() {
        return new OData({
            endpoint: this.serviceEndpoint,
            headers: [
                { name: "Content-Type", value: "application/json" },
                { name: "Accept", value: "application/json" },
                { name: "OData-MaxVersion", value: "4.0" },
                { name: "OData-Version", value: "4.0" }
            ]
        });
    }

    initBatch() {
        return new Batch({
            endpoint: this.serviceEndpoint,
            headers: []
        });
    }

    createRecord(entity: string, data: object): Promise<void> {
        return this.init()
            .resource(entity)
            .post(data)
            .build();
    }

    executeQuery<T>(query: OData) {
        return query.build<T>();
    }

    private getODataEndpointVersion(): string {
        const crmVersion = this.globalContext.getCrmVersion();
        return !!crmVersion
            ? crmVersion.split(".")
                        .slice(0, 2)
                        .join(".")
            : "8.0";
    }
}
