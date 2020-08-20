export class UserInfo {
    full_name: string;
    email: string;

    constructor(full_name?, email?) {
        this.email = email;
        this.full_name = full_name;
    }
}