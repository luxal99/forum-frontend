export class Message {

    id: number;
    senderId;
    receiverId;
    message;

    constructor(senderId?, receiverId?, message?) {

        this.senderId = senderId;
        this.receiverId = receiverId;
        this.message = message;
    }

}
