import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from "src/app/service/registation.service";
import { User } from '../models/User';
import { UserInfo } from '../models/UserInfo';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {

  constructor(private registrationService: RegistrationService, private _snackBar: MatSnackBar) { }

  userInfoForm = new FormGroup({
    full_name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required)
  })

  userForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    confirm_password: new FormControl("", Validators.required)
  })


  ngOnInit() {

  }

  register() {

    if (this.userForm.get("password").value === this.userForm.get("confirm_password").value) {

      var c = (this.userForm.get("username").value.length <= 5) ? this.openSnackBar("Prekratko korisnicko ime", "OK") : true

      const user = new User(this.userForm.get("username").value, this.userForm.get("password").value);
      const userInfo = new UserInfo(this.userInfoForm.get("full_name").value, this.userInfoForm.get("email").value);

      const obj = { user: user, userInfo: userInfo }

      this.registrationService.save(obj).subscribe(data => {
        this.openSnackBar("Uspesno ste se registrovali", "OK")
      }, err => {
      })
    } else {
      this.openSnackBar("Sifre se ne poklapaju", "OK");
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
