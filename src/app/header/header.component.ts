import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { Topics } from '../models/Topics';
import { TopicService } from '../service/topic.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MessageService } from '../service/message.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog, private topicsService: TopicService, private _formBuilder: FormBuilder, private messageService: MessageService) { }

  loggedUser = localStorage.getItem("loggedUser");
  listOfTopics: Array<Topics> = [];
  listOfNotifications: Array<Message>
  filteredTopic: Array<Topics> = [];
  @Input() searchText: string;

  notificationCounter = 0;


  searchForm: FormGroup = this._formBuilder.group({
    search: '',
  });
  ngOnInit() {
    this.isLogged();
    this.getTopics();
  }


  isLogged() {
    if (localStorage.getItem("token") === null) {
      document.getElementById("userParagraf").style.display = 'none';
      document.getElementById("userBtn").style.display = 'none';
      document.getElementById("notification").style.display = 'none';
    } else {
      document.getElementById("h4-bold").style.display = 'none';
      document.getElementById("h4-bold-active").style.display = 'none';

      this.getNotification();

    }
  }

  getNotification() {
    this.messageService.getUnreadMessages().subscribe(data => {
      this.listOfNotifications = data as Array<Message>
      this.notificationCounter = this.listOfNotifications.length;
    })
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isLogged();
    });
  }

  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: 'auto'
    });
  }

  getTopics() {
    this.topicsService.getAll().subscribe(data => {
      this.listOfTopics = data as Array<Topics>;
    })
  }

  logout() {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    location.reload();
  }

  search() {

    if (this.searchForm.get("search").value === '') {

      this.filteredTopic = [];
    } else {
      this.listOfTopics.forEach(topic => {

        if (topic.title.includes(this.searchForm.get("search").value)) {


          var index = this.filteredTopic.findIndex(x => x.title === topic.title)

          if (index < 0)
            this.filteredTopic.push(topic)

        }
      })
    }


  }


}
