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
@NgModule({
  declarations: [
    AppComponent,
    TopicOverviewComponent,
    HomeComponent,
    LoginDialogComponent,
    RegistrationDialogComponent,
    HeaderComponent,
    AddTopicDialogComponent,
  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents:[LoginDialogComponent,TopicOverviewComponent,HomeComponent,AddTopicDialogComponent,RegistrationDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
