import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';
import { AddTopicDialogComponent } from './add-topic-dialog/add-topic-dialog.component';
import { CategoryService } from '../service/category.service';
import { Category } from '../models/Category';
import { Topics } from '../models/Topics';
import { TopicService } from '../service/topic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  listOfCategories: Array<Category> = [];
  listOfTopics: Array<Topics> = [];

  constructor(private dialog: MatDialog, private categoryService: CategoryService,
    private topicService: TopicService, private vcRef: ViewContainerRef, private cResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.getAllCategories();
    this.getAllTopics();
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.listOfCategories = data as Array<Category>
    }, err => {

    })
  }

  getAllTopics() {
    this.topicService.getAll().subscribe(data => {
      this.listOfTopics = data as Array<Topics>
    }, err => {

    })
  }

  openAddTopicDialog(): void {

    if (localStorage.getItem("loggedUser") !== null) {
      const dialogRef = this.dialog.open(AddTopicDialogComponent, {
        width: 'auto'
      });
    } else {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: 'auto'
      });
    }
  }

  async openTopic(id) {
    this.vcRef.clear();
    const { TopicOverviewComponent } = await import('../topic-overview/topic-overview.component');
    this.vcRef.createComponent(this.cResolver.resolveComponentFactory(TopicOverviewComponent))

    localStorage.setItem("topicID",id);    
  }
}
