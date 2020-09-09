import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./material.module";
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from './registration-dialog/registration-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { AddTopicDialogComponent } from './home/add-topic-dialog/add-topic-dialog.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TopicOverviewComponent } from './topic-overview/topic-overview.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { ReplyDialogComponent } from './topic-overview/reply-dialog/reply-dialog.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatDialogComponent } from './topic-overview/chat-dialog/chat-dialog.component';
import { ChatComponent } from './profile/chat/chat.component';
import { ProfileOverviewComponent } from './profile/profile-overview/profile-overview.component';
import { UploadPhotoDialogComponent } from './profile/upload-photo-dialog/upload-photo-dialog.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
@NgModule({
  declarations: [
    AppComponent,
    TopicOverviewComponent,
    HomeComponent,
    LoginDialogComponent,
    RegistrationDialogComponent,
    HeaderComponent,
    AddTopicDialogComponent,
    ReplyDialogComponent,
    ProfileComponent,
    ChatDialogComponent,
    ChatComponent,
    ProfileOverviewComponent,
    UploadPhotoDialogComponent,
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAz8PX_PdPZo7WmWuxLYVMDiJUOozl0Fn4",
      authDomain: "soy-smile-249718.firebaseapp.com",
      databaseURL: "https://soy-smile-249718.firebaseio.com",
      projectId: "soy-smile-249718",
      storageBucket: "soy-smile-249718.appspot.com",
      messagingSenderId: "870517553704",
      appId: "1:870517553704:web:d238ce266071d519f8131d",
      measurementId: "G-JGV7HTSL0B"
    }),
  ],
  providers: [HttpClientModule,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  entryComponents: [LoginDialogComponent, UploadPhotoDialogComponent, ChatComponent, ChatDialogComponent, ProfileOverviewComponent, ReplyDialogComponent, TopicOverviewComponent, HomeComponent, AddTopicDialogComponent, RegistrationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
