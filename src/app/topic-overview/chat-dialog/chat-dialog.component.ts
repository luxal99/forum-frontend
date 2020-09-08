import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MessageService } from 'src/app/service/message.service';
import { Message } from 'src/app/models/Message';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private authService: AuthService, private messageService: MessageService) { }

  messageForm = new FormGroup({
    message: new FormControl("", Validators.required)
  })
  ngOnInit() {
  }


  sendMessage() {

    const loggedUser = { token: localStorage.getItem("token") }


    const user = this.authService.findUserByHash(loggedUser).subscribe(data => {

      const message = new Message(data, this.data, this.messageForm.get("message").value);

      console.log(message);
      
      this.messageService.save(message).subscribe(resp => {
        console.log(resp);

      })
    })

  }

}
