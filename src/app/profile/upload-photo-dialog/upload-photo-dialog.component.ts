import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/service/registation.service';
import { AngularFireStorage } from 'angularfire2/storage';
@Component({
  selector: 'app-upload-photo-dialog',
  templateUrl: './upload-photo-dialog.component.html',
  styleUrls: ['./upload-photo-dialog.component.css']
})
export class UploadPhotoDialogComponent implements OnInit {

  image: File;
  percentage = 0;
  uploadForm = new FormGroup({
    image: new FormControl("", Validators.required)
  })
  constructor(private uploadService:RegistrationService,private afStorage: AngularFireStorage) { }

  ngOnInit() {
  }

  add(files) {
    this.image = files[0];
  }
  upload() {
    console.log(this.image);

    this.afStorage.upload(this.image.name, this.image).percentageChanges().subscribe(data => {
      this.percentage = data
    });
    
    setTimeout(() => {
      const downloadUrl = this.afStorage.ref(this.image.name).getDownloadURL().subscribe(data => {

        this.uploadService.uploadProfilePicture(data,localStorage.getItem("token")).subscribe(data=>{
          console.log(data);
          
        })
       });
    }, 1500);
  }

}
