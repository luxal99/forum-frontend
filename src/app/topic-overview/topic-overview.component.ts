import { Component, OnInit,ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { TopicService } from '../service/topic.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Topics } from '../models/Topics';

@Component({
  selector: 'app-topic-overview',
  templateUrl: './topic-overview.component.html',
  styleUrls: ['./topic-overview.component.css']
})
export class TopicOverviewComponent implements OnInit {

  constructor(private vcRef: ViewContainerRef, 
    private cResolver: ComponentFactoryResolver,private route: ActivatedRoute,private router: Router,private topicService:TopicService) { }

  async ngOnInit(): Promise<void> {
  
  this.findBlog();
  }


  topic:Topics;


  findBlog(){
    this.route.params.subscribe(params=>{
      this.topicService.findById(params.id).subscribe(data=>{
        
        this.topic = data as Topics;
        console.log(this.topic);
        
      })
    })
  }

  async backToTopics() {
    this.vcRef.clear();
    const { HomeComponent } = await import('../home/home.component');
    this.vcRef.createComponent(this.cResolver.resolveComponentFactory(HomeComponent))
    
    
  }

}
