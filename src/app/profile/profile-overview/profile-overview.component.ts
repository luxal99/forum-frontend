import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/service/topic.service';
import { Topics } from 'src/app/models/Topics';
import { Reply } from 'src/app/models/Reply';
import { ReplyService } from 'src/app/service/reply.service';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent implements OnInit {

  listOfTopics: Array<Topics>
  listOfReplies: Array<Reply>
  constructor(private replyService: ReplyService, private topicService: TopicService) { }

  async ngOnInit(): Promise<void> {
    this.getTopics();
    this.getReplies();
  }

  getReplies() {
    this.replyService.findByUser().subscribe(resp => {
      this.listOfReplies = resp as Array<Reply>

    })
  }

  getTopics() {
    this.topicService.findByUser().subscribe(data => {
      this.listOfTopics = data as Array<Topics>
    })
  }

}
