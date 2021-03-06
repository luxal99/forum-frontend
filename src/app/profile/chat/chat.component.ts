import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/service/message.service';
import { User } from 'src/app/models/User';
import { Message } from 'src/app/models/Message';
import { AuthService } from 'src/app/service/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  listOfUsers: Array<User>
  listOfMessages: Array<Message>
  currentUser: User;
  loggedUser: User

  messageForm = new FormGroup({
    message: new FormControl("", Validators.required)
  })

  constructor(private messageService: MessageService, private authService: AuthService) { }

  async ngOnInit(): Promise<void> {
    this.getLoggedUser();
    this.getUsers();
    
  }


  getUsers() {
    this.messageService.getUsersFromChat().subscribe(data => {

      this.listOfUsers = data as Array<User>
    })
  }

  getLoggedUser() {
    this.authService.findUserByHash({ token: localStorage.getItem("token") }).subscribe(data => {
      this.loggedUser = data as User;
    })
  }

  getMessages(user) {
    this.currentUser = user
    document.getElementById('chat-col').style.visibility = 'initial';

    document.getElementById('chat-col').style.opacity = '1';

    this.authService.findUserByHash({ token: localStorage.getItem("token") }).subscribe(resp => {
      const obj = { senderId: resp, receiverId: user }
      this.messageService.getChat(obj).subscribe(resp => {
        this.listOfMessages = resp as Array<Message>
      })
    })
  }

  sendMessage() {

    this.authService.findUserByHash({ token: localStorage.getItem("token") }).subscribe(data => {

      const message = new Message(this.loggedUser, this.currentUser, this.messageForm.get("message").value);
      this.messageService.save(message).subscribe(resp => {
        this.messageForm.get("message").reset();
        this.getMessages(this.currentUser);
      })
    })

    

  }


}
