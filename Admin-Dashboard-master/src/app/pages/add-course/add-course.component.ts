import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { ActivatedRoute,Router } from '@angular/router';
import '../ckeditor.loader';
import 'ckeditor';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {
  course ={
    course_title            : '',
    course_image            : '',
    course_short_desc       : '',
    Reg_Status              : 1,
    Category                : '',
    Rating                  : 1,
    about_course            : '',
    dates                   : '' ,
    eligibility             : '',
    course_fee              : '',
    entrance_details        : '',
    refund_policy           : '',
    course_delivery         : '',
    internship_partner      : '',
    knowledge_partner       : '',
    sponser_partner         : '',
    index                   : 0,
    active                  : true 
  }
  images :any= [];
  submitted : boolean=false;

  constructor(public courseObj : CoursesService, private router:Router, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.submitted = false;
  }

  closeForm(){
    this.router.navigate(['../courses'], { relativeTo: this.route });    
  }
  AddCourse()
  {
    this.course.course_delivery = this.course.course_delivery.replace('C:\\fakepath\\','');
    this.course.internship_partner = this.course.internship_partner.replace('C:\\fakepath\\','');
    this.course.knowledge_partner = this.course.knowledge_partner.replace('C:\\fakepath\\','');
    this.course.sponser_partner = this.course.sponser_partner.replace('C:\\fakepath\\','');
    this.course.course_image = this.course.course_image.replace('C:\\fakepath\\','');
    console.log(this.course)
    this.courseObj.newCourse(this.images, this.course).subscribe(
      response => {
        if (response) {
          Swal.fire("Successfully Added", "success")
          .then(() => {
            this.router.navigate(['../courses'], { relativeTo: this.route });
          })          }
        else {
          Swal.fire("Network Error", "Please do after sometime ", "error")
            .then(() => {
              this.router.navigate(['../courses'], { relativeTo: this.route });
            })

        }
      })
  }

  selectImage(event : any) {
    console.log('select image')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images.push(file);
      console.log('inside if event')
    }    
  }
}
