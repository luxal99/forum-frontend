import { UserInfo } from "./UserInfo";

export class User {
    id;
    username: string;
    password: string;
    idUserInfo: UserInfo;

    constructor(username?, password?, idUserInfo?) {
        this.idUserInfo = idUserInfo;
        this.password = password;
        this.username = username;
    }
}