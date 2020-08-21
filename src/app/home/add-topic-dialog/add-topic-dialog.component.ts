import { Component, OnInit, ViewChild } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/models/Category';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Topics } from 'src/app/models/Topics';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import { User } from 'src/app/models/User';
import { MatDialog } from '@angular/material';
import { LoginDialogComponent } from 'src/app/login-dialog/login-dialog.component';
import { TopicService } from 'src/app/service/topic.service';
@Component({
  selector: 'app-add-topic-dialog',
  templateUrl: './add-topic-dialog.component.html',
  styleUrls: ['./add-topic-dialog.component.css']
})
export class AddTopicDialogComponent implements OnInit {

  listOfCategories: Array<Category> = [];
  constructor(private categoryService: CategoryService,private dialog:MatDialog,private topicService:TopicService) { }

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;

  addTopicForm = new FormGroup({
    title: new FormControl("", Validators.required),
    id_category: new FormControl("", Validators.required)
  })
  ngOnInit() {
    this.getAllCategories();
  }


  getAllCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.listOfCategories = data as Array<Category>
    }, err => {

    })
  }

  addTopic() {

      let topic = new Topics(this.addTopicForm.get("title").value, this.addTopicForm.get("id_category").value);
      topic.question = this.editorComponent.editorInstance.getData();

      const loggedUser = new User();
      loggedUser.id = localStorage.getItem("token");

      topic.id_user = loggedUser;

      console.log(topic);

      this.topicService.save(topic).subscribe(data=>{
        console.log(data);
        
      },err=>{
        console.log(err);
        
      })



  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: 'auto'
    });
  }
}
