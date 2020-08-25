import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, Inject } from '@angular/core';
import { TopicService } from '../service/topic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Topics } from '../models/Topics';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ReplyDialogComponent } from './reply-dialog/reply-dialog.component';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { ReplyService } from '../service/reply.service';

@Component({
  selector: 'app-topic-overview',
  templateUrl: './topic-overview.component.html',
  styleUrls: ['./topic-overview.component.css']
})
export class TopicOverviewComponent implements OnInit {

  constructor(private vcRef: ViewContainerRef,
    private cResolver: ComponentFactoryResolver, private route: ActivatedRoute, 
    private router: Router, private topicService: TopicService,
    private dialog:MatDialog,private replyService:ReplyService) { }

  async ngOnInit(): Promise<void> {
    this.findTopic();
    
  }

  topic: Topics;


  incrementLike(id){

    this.replyService.incrementLike(id).subscribe(data=>{
      this.findTopic();
    })
  }


  findTopic() {
    this.route.params.subscribe(params => {
      this.topicService.findById(params.id).subscribe(data => {
        this.topic = data as Topics;
      })
    })
  }

  openReplyDialog(): void {

    if (localStorage.getItem("loggedUser") !== null) {
      const dialogRef = this.dialog.open(ReplyDialogComponent, {
        width: 'auto',
        data:this.topic
      });

      dialogRef.afterClosed().subscribe(result => {
       this.findTopic();
      });
      
    } else {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: 'auto'
      });
    }
  }
}
