export class AppUserAuth {
    constructor(){
        this.userId = 0;
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.password = "";
        this.address = "";
        this.sex = 0;
        this.dateOfBirth = undefined;
        this.bearerToken = "";
        this.isAuthenticated = false;
    }

    public userId: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public address: string;
    public sex: number;
    public dateOfBirth?: Date;
    public bearerToken: string;
    public isAuthenticated: boolean;
}
