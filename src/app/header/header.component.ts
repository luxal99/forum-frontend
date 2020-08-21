import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  loggedUser = localStorage.getItem("loggedUser");


  ngOnInit() {
    this.isLogged();
  }


  isLogged() {
    if (localStorage.getItem("token") === null) {
      document.getElementById("userParagraf").style.display = 'none';
      document.getElementById("userBtn").style.display = 'none';
    } else {
      document.getElementById("h4-bold").style.display = 'none';
      document.getElementById("h4-bold-active").style.display = 'none';
    }
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

  logout(){
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("token");
    location.reload();
  }
}
