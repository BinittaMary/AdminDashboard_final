import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute,Router } from '@angular/router';
import '../ckeditor.loader';
import 'ckeditor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  course : any;
  images :any= [];
  imageModified : boolean=false;
  submitted : boolean=false;
  constructor(public courseObj : CoursesService, private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.submitted = false;
    let CourseId = localStorage.getItem("adminEditCourseID");
    this.imageModified=false;
    this.courseObj.getCourse(CourseId)
    .subscribe((courseItem)=>{
      this.course =courseItem;
      console.log(this.course);
      });
  }
  closeForm(){
    this.router.navigate(['../courses'], { relativeTo: this.route });    
  }
  editCourse() 
  {
    this.course.course_delivery = this.course.course_delivery.replace('C:\\fakepath\\','');
    this.course.internship_partner = this.course.internship_partner.replace('C:\\fakepath\\','');
    this.course.knowledge_partner = this.course.knowledge_partner.replace('C:\\fakepath\\','');
    this.course.sponser_partner = this.course.sponser_partner.replace('C:\\fakepath\\','');
    this.course.course_image = this.course.course_image.replace('C:\\fakepath\\','');
    console.log(this.course)
    if (this.imageModified){
      console.log('image modified')
      this.courseObj.editCourseWithImage(this.images, this.course)
      .subscribe(
        response => {
          if (response) {
            Swal.fire("Successfully Updated", "", "success")
              .then(() => {
                this.router.navigate(['../courses'], { relativeTo: this.route });
              })
          }
          else {
            Swal.fire("Network Error", "Please do after sometime ", "error")
              .then(() => {
                this.router.navigate(['../courses'], { relativeTo: this.route });
              })
  
          }
        });
    }
    else{
    this.courseObj.editCourse(this.course)      
    .subscribe(
      response => {
        if (response) {
          Swal.fire("Successfully Updated", "", "success")
            .then(() => {
              this.router.navigate(['../courses'], { relativeTo: this.route });
            })
        }
        else {
          Swal.fire("Network Error", "Please do after sometime ", "error")
            .then(() => {
              this.router.navigate(['../courses'], { relativeTo: this.route });
            })

        }
      });
    }
  }

  selectImage(event : any) {
    this.imageModified= true;
    this.course.course_delivery = this.course.course_delivery.replace('C:\\fakepath\\','');
    this.course.internship_partner = this.course.internship_partner.replace('C:\\fakepath\\','');
    this.course.knowledge_partner = this.course.knowledge_partner.replace('C:\\fakepath\\','');
    this.course.sponser_partner = this.course.sponser_partner.replace('C:\\fakepath\\','');
    this.course.course_image = this.course.course_image.replace('C:\\fakepath\\','');
    console.log('inside select')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images.push(file);
      console.log('pushed file')
    }    
  }
}
