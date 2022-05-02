import { User } from "./user";

export class AppUserAuth {
    constructor(user?:any){
        if(!user){            
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
        }else{            
            this.userId = user.userId;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.password = user.password;
            this.address = user.address;
            this.sex = user.sex;
            this.dateOfBirth = user.dateOfBirth;
            if(user instanceof AppUserAuth){
                this.bearerToken = user.bearerToken;
                this.isAuthenticated = user.isAuthenticated;
            }else{
                this.bearerToken = "";
                this.isAuthenticated = false;
            }
        }
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

    public getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }
}
