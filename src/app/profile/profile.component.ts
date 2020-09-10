import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../models/User';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { UploadPhotoDialogComponent } from './upload-photo-dialog/upload-photo-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('target', { read: ViewContainerRef, static: false }) entry: ViewContainerRef;


  loggedUser;
  pic ='';
  constructor(private authService: AuthService, private dialog: MatDialog, private cvRef: ViewContainerRef, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.findProfile();
  }
  ngAfterViewInit(): void {
    this.loadProfileOverview();
  }

  async loadChat() {
    this.entry.clear();
    const { ChatComponent } = await import('./chat/chat.component');
    const factory = this.resolver.resolveComponentFactory(ChatComponent)
    this.entry.createComponent(factory);
  }

  async loadProfileOverview() {
    this.entry.clear();
    const { ProfileOverviewComponent } = await import('./profile-overview/profile-overview.component');
    const factory = this.resolver.resolveComponentFactory(ProfileOverviewComponent)
    this.entry.createComponent(factory);
    
  }
  findProfile() {
    if (localStorage.getItem("token") !== null) {
      this.authService.findUserByHash({ token: localStorage.getItem("token") }).subscribe(data => {
        this.loggedUser = data as User
        this.pic = data['profilePicture']
      })
    } else {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: 'auto'
      });
    }
  }

  openUploadPhotoDialog(){
    const dialogRef = this.dialog.open(UploadPhotoDialogComponent, {
      width: 'auto'
    });
  }
}
