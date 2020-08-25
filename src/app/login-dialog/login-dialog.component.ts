import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../models/User';
import { AuthService } from "../service/auth.service";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {


  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  })

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  auth() {

    const user = new User(this.loginForm.get("username").value, this.loginForm.get("password").value);

    this.authService.auth(user).subscribe(data => {
      localStorage.setItem("token", data['id']);
      localStorage.setItem("loggedUser", data["username"])

      location.reload();
    }, err => {

    })

  }
}
