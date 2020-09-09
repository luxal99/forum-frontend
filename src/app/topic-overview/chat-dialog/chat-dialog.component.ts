import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MessageService } from 'src/app/service/message.service';
import { Message } from 'src/app/models/Message';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  listOfMessages: Array<Message> = [];
  loggedUser

  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private messageService: MessageService) { }

  messageForm = new FormGroup({
    message: new FormControl("", Validators.required)
  })
  ngOnInit() {

   setInterval(()=>{this.getMessages()},5000);
   
    this.getLoggedUser();
    this.getMessages();
  }


  getMessages() {
    this.authService.findUserByHash({ token: localStorage.getItem("token") }).subscribe(data => {

      const obj = { senderId: data, receiverId: this.data }
      this.messageService.getChat(obj).subscribe(resp => {
        this.listOfMessages = resp as Array<Message>
      })
    })

  }



  getLoggedUser() {
    this.authService.findUserByHash({ token: localStorage.getItem("token") }).subscribe(data => {
      this.loggedUser = data;
    })
  }
  sendMessage() {

    this.authService.findUserByHash({ token: localStorage.getItem("token") }).subscribe(data => {

      const message = new Message(data, this.data, this.messageForm.get("message").value);
      this.messageService.save(message).subscribe(resp => {
        this.getMessages();
      })
    })

    

  }

}
