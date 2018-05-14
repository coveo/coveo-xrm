import { IGlobalContext } from "./context/GlobalContext";
import { INavigation } from "./navigation/Navigation";
import { WebApiService } from "./WebApiService";

export class CrmClient {
    get WebApi() {
        return this.webApi;
    }

    get GlobalContext() {
        return this.globalContext;
    }

    get Navigation() {
        return this.navigation;
    }

    constructor(private globalContext: IGlobalContext,
                private webApi: WebApiService,
                private navigation: INavigation) {}
}
