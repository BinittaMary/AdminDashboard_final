import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'ngx-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss']
})
export class EditEventsComponent implements OnInit {
  images:any;
  submitted : boolean = false;
  imageModified : boolean=false;
  imgPrev  : any ='';

 

  eventItem={
    name:"",
    shortdetails:"",
    moredetails:"",
    boxdetails:"",
    coordinatorsdetail:"",
    registrationlink:"",
    brouchurelink:"",
    programschedule:"",
    speakerslist:"",
    button:"",
    date:"",
    image:""
  }

  constructor( private router:Router,private eventService:EventService) { }

  ngOnInit(): void {
    this.submitted = false;
    this.imageModified=false;
    let eventId = localStorage.getItem("adminEditEventID");
    this.eventService.getevent(eventId).subscribe((data)=>{
    console.log(data);
    this.eventItem=JSON.parse(JSON.stringify(data));
    this.imgPrev    = this.eventItem.image;
  })
  }
  editevent(){

    this.eventItem.image = this.eventItem.image.replace('C:\\fakepath\\','');
    if (this.imageModified){
      this.eventService.editEventWithImage(this.images, this.eventItem);
    }
    else{
    this.eventService.editEvent(this.eventItem);
    }
     localStorage.setItem('authorAlertMsg', `The author ${this.eventItem.name} is updated`); 
     this.router.navigate(['/pages/events']); 

  }

  selectImage(event : any) {
    this.imageModified= true;
    console.log('select image')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log('inside if event')
    }
  }

}
