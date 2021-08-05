import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(public http : HttpClient) { }


  getCourses(){
    return this.http.get('http://localhost:5000/CourseList')
  };

  getCourse(id:any){
    return this.http.get("http://localhost:5000/Course/"+id);
  };

  getTestimonials(id:any){
    return this.http.get("http://localhost:5000/CourseTestimony/"+id);
  };

  courseRegistration(courseReg:any)
  {
    return this.http.post<any>('http://localhost:5000/registercourse', courseReg)
  }

}
