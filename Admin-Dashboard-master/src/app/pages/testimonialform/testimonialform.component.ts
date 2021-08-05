import { Component, OnInit } from '@angular/core';
import { TestimonialsComponent } from '../testimonials/testimonials.component';
import { TestService } from '../test.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-testimonialform',
  templateUrl: './testimonialform.component.html',
  styleUrls: ['./testimonialform.component.scss']
})
export class TestimonialformComponent implements OnInit {
  images:any;
  submitted = false;
  testimonialDetails={
    name:"",
    position:"",
    organisation:"",
    testimony:"",
    course_title:"",
    image:""

  }
  
   constructor(private testService:TestService,private router:Router, private route:ActivatedRoute) { }
    ngOnInit(): void {
      this.submitted = false;
    }

  

    addTestimonial(){
      this.testimonialDetails.image = this.testimonialDetails.image.replace('C:\\fakepath\\','');
      console.log('inside addstaff');
       console.log(this.testimonialDetails);
       this.testService.newTestimonial(this.images, this.testimonialDetails).subscribe(
        response => {
          console.log(response);
          if (response) {
            Swal.fire("Successfully Added", "success")
            .then(() => {
              this.router.navigate(['../testimonials'], { relativeTo: this.route });
            })          }
          else {
            Swal.fire("Network Error", "Please do after sometime ", "error")
              .then(() => {
                this.router.navigate(['../testimonials'], { relativeTo: this.route });
              })
  
          }
        })
    }
    deleteTestimonial(testimonial : any){}

    editTestimonial(testimonial : any){}


  
    closeForm(){
      this.router.navigate(['../testimonials'], { relativeTo: this.route });    
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
