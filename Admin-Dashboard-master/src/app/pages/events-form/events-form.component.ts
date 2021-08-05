import { Component, OnInit } from '@angular/core';
import '../ckeditor.loader';
import 'ckeditor';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'ngx-events-form',
  templateUrl: './events-form.component.html',
  styleUrls: ['./events-form.component.scss']
})
export class EventsFormComponent implements OnInit {

  images:any;

  constructor(private router:Router, private route:ActivatedRoute, private eventService :EventService) { }

  eventDetails={
    name:"",
    shortdetails:"",
    moredetails:"",
    boxdetails:"",
    coordinatorsdetail:"",
    registrationlink:"",
    date:"",
    image:""
  }

  ngOnInit(): void {
  }

  addevent(){
    this.eventDetails.image = this.eventDetails.image.replace('C:\\fakepath\\','');

    this.eventService.newEvent(this.images, this.eventDetails);
    console.log(` upload image ${this.images}`); 
    console.log("called");
    alert("success")
    this.router.navigate(['/pages/events'])

  }

  selectImage(event : any) {
    console.log('select image')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log('inside if event')
    }
  }

}
