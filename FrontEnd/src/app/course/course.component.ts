import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  Courses : any;
  categories = ['Retail', 'Institutional', 'Corporate', 'All'];
  // all_courses : any;
  popularCourses : any=[];
  public searchFilter: any = '';
  public category: any = '';
  query= '';
  querycategory= 'All';
  alertMsg : any ='';

  constructor(public courseObj : CourseService, private router:Router) { }

  ngOnInit(): void {
    this.alertMsg = localStorage.getItem('courseAlertMsg');  
    this.courseObj.getCourses()
    .subscribe((courses)=>{
      this.Courses = courses;
      console.log(this.Courses);
      for (let i = 0; i < this.Courses.length; i++) {
        console.log(`inside rating ${this.Courses[i].Rating}`);
        if (this.Courses[i].Rating>= 3) {
             console.log(`inside rating ${this.Courses[i].Rating}`);
            this.popularCourses.push(this.Courses[i]);
        }
      }      
      localStorage.removeItem('courseAlertMsg'); 
      console.log(this.popularCourses);
    })
 
    // this.popularCourses = this.Courses;

  }

  SearchClik()
  {
    alert('search');
  }

  getCourse(course: any)
  {
    localStorage.setItem("getCourseId", course._id.toString());
    this.router.navigate(['course']);
  };

  Register(course : any)
  {
    console.log('inside register');
    localStorage.setItem("CourseReg", course._id.toString());
    this.router.navigate(['courseregstrn']);
  };

}
