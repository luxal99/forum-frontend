import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../models/User';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  loggedUser: User;
  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit() {
    this.findProfile();
  }

  findProfile() {
    if (localStorage.getItem("token") !== null) {
      this.authService.findUserByHash({ token: localStorage.getItem("token") }).subscribe(data => {
        this.loggedUser = data as User
      })
    } else {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: 'auto'
      });
    }
  }

}
