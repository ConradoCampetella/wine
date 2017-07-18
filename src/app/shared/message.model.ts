export class Message{
    public usermail:string;
    public username:string;
    public date:number;
    public type:string;
    public subject:string;
    public message:string;

    constructor(usermail:string, username:string, date:number, type:string, subject:string, message:string){
        this.usermail = usermail;
        this.username = username;
        this.date = date;
        this.type = type;
        this.subject = subject;
        this.message = message;
    }
}