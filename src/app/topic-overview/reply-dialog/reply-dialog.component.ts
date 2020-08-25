import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ReplyService } from "src/app/service/reply.service";
import { Reply } from 'src/app/models/Reply';

@Component({
  selector: 'app-reply-dialog',
  templateUrl: './reply-dialog.component.html',
  styleUrls: ['./reply-dialog.component.css']
})
export class ReplyDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private replyService: ReplyService, private _snackBar: MatSnackBar) { }

  @ViewChild('editor', { static: false }) editorComponent: CKEditorComponent;
  public Editor = ClassicEditor;


  ngOnInit() {
  }

  saveReply() {
    let reply = new Reply();
    reply.title = this.editorComponent.editorInstance.getData();
    reply.idTopic = this.data;
    reply.idUser = localStorage.getItem("token");

    this.replyService.save(reply).subscribe(data => {
      this.openSnackBar(data,"OK")

    }, err => {

    })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
