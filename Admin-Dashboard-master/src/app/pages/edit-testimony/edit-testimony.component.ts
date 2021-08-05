import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TestService } from '../test.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-edit-testimony',
  templateUrl: './edit-testimony.component.html',
  styleUrls: ['./edit-testimony.component.scss']
})
export class EditTestimonyComponent implements OnInit {

  images:any;
  submitted : boolean = false;
  imageModified : boolean=false;
  imgPrev  : any ='';

  testimonialItem={
    name:"",
    position:"",
    organisation:"",
    testimony:"",
    course_title:"",
    image:""
  }

  constructor(private testService:TestService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.submitted = false;
    this.imageModified=false;
    let testimonialId = localStorage.getItem("adminEditTestimonialID");
    this.testService.gettestimonial(testimonialId).subscribe((data)=>{
    console.log(data);
    this.testimonialItem=JSON.parse(JSON.stringify(data));
    this.imgPrev    = this.testimonialItem.image;
  })
  }

  
  editTestimonial() 
  {
    this.testimonialItem.image = this.testimonialItem.image.replace('C:\\fakepath\\','');
    if (this.imageModified){
      console.log('image modified')
      this.testService.editTestimonialWithImage(this.images, this.testimonialItem)
      .subscribe(
        response => {
          if (response) {
            Swal.fire("Successfully Updated", "", "success")
              .then(() => {
                this.router.navigate(['../testimonials'], { relativeTo: this.route });
              })
          }
          else {
            Swal.fire("Network Error", "Please do after sometime ", "error")
              .then(() => {
                this.router.navigate(['../testimonials'], { relativeTo: this.route });
              })
  
          }
        });
    }
    else{
    this.testService.editTestimonial(this.testimonialItem)      
    .subscribe(
      response => {
        if (response) {
          Swal.fire("Successfully Updated", "", "success")
            .then(() => {
              this.router.navigate(['../testimonials'], { relativeTo: this.route });
            })
        }
        else {
          Swal.fire("Network Error", "Please do after sometime ", "error")
            .then(() => {
              this.router.navigate(['../testimonials'], { relativeTo: this.route });
            })

        }
      });
    }
  }


  updateImage(event : any) {
    this.imageModified= true;
    console.log('select image')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log('inside if event')
    }
  }

  closeForm(){
    this.router.navigate(['../testimonials'], { relativeTo: this.route });    
  }
}
