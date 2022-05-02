import { AppUserAuth } from "./app-user-auth";

export class User {
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
        }else{
            this.userId = user.userId;            
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.email = user.email;
            this.password = user.password;
            this.address = user.address;
            this.sex = user.sex;
            this.dateOfBirth = user.dateOfBirth;
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

    public getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }
}