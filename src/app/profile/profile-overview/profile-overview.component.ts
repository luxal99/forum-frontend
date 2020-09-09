import { Component, OnInit } from '@angular/core';
import { TopicService } from 'src/app/service/topic.service';
import { Topics } from 'src/app/models/Topics';

@Component({
  selector: 'app-profile-overview',
  templateUrl: './profile-overview.component.html',
  styleUrls: ['./profile-overview.component.css']
})
export class ProfileOverviewComponent implements OnInit {


  listOfTopics: Array<Topics>
  constructor(private topicService: TopicService) { }

  async ngOnInit(): Promise<void> {

    this.getTopics();
  }

  getTopics() {
    this.topicService.findByUser().subscribe(resp => {
      this.listOfTopics = resp as Array<Topics>
      console.log(resp);
      
    })
  }

}
