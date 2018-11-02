export interface IUserSettings {
    securityRolePrivileges: string[];
    securityRoles: string[];
    userId: string;
    userName: string;
}

export class NullUserSettings implements IUserSettings {
    get securityRolePrivileges() {
        // No equivalent in CRM 8.
        return [];
    }

    get securityRoles() {
        return [];
    }

    get userId() {
        return "";
    }

    get userName() {
        return "";
    }
}

export class UserSettingsV8 extends NullUserSettings {
    constructor(private context: Xrm.GlobalContext) {
        super();
    }

    get securityRoles() {
        return this.context.getUserRoles();
    }

    get userId() {
        return this.context.getUserId();
    }

    get userName() {
        return this.context.getUserName();
    }
}

export class UserSettings implements IUserSettings {
    constructor(private userSettings: Xrm.UserSettings) {}

    get securityRolePrivileges() {
        return this.userSettings.securityRolePrivileges;
    }

    get securityRoles() {
        return this.userSettings.securityRoles;
    }

    get userId() {
        return this.userSettings.userId;
    }

    get userName() {
        return this.userSettings.userName;
    }
}
