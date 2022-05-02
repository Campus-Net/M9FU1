export class Chat {
    constructor(){
        this.chatId = 0;
        this.date = new Date();
        this.message = "";
        this.userId = 0;
        this.roomId = 0;
        this.type = "";
    }
    public chatId?: number;
    public date: Date;
    public message: string;
    public userId: number;
    public roomId: number;
    public type: string;
}
