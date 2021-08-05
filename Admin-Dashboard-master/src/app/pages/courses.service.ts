import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(public http : HttpClient) { }

  // server_address :string ='/api';
  // server_address :string ='http://localhost:5000';

  getCourses(){
    return this.http.get('http://localhost:5000/course/CourseList')
  };
  
  getCourseRegistrationAggr(){
    return this.http.get('http://localhost:5000/registration/registercourseAggr')
  };

  session_out(){
    console.log("loging out")
    this.http.get('http://localhost:5000/logout')
  };

  getCourseRegistrationList(){
    return this.http.get('http://localhost:5000/registration/registercourseList')
  };

  getCourse(id:any){
    return this.http.get("http://localhost:5000/course/Course/"+id);
  };

  updateCourseIndex(course:any){
    return this.http.put("http://localhost:5000/course/Course/updateIndex/",course);
  };

  editCourse(Course:any)
  {   
    console.log(`editCourse : ${Course.title}`);
   return this.http.put("http://localhost:5000/course/Course/update", Course);
  };
 
  editCourseWithImage(image:any, course:any)
  {
    console.log('inside service-editCourseWithImage')
    const formData = new FormData();
    console.log(image);
    for(let i=0; i<image.length; i++){
      formData.append("files", image[i], image[i]['name']);
      console.log(`${i} ${image[i]}`);
    }
   
    formData.append('_id', course._id); 
    formData.append('course_title', course.course_title); 
    formData.append('course_image', course.course_image); 
    formData.append('course_short_desc', course.course_short_desc); 
    formData.append('Reg_Status', course.Reg_Status); 
    formData.append('Category', course.Category); 
    formData.append('Rating', course.Rating); 
    formData.append('about_course', course.about_course); 
    formData.append('dates', course.dates); 
    formData.append('eligibility', course.eligibility); 
    formData.append('course_fee', course.course_fee); 
    formData.append('entrance_details', course.entrance_details); 
    formData.append('refund_policy', course.refund_policy); 
    formData.append('course_delivery', course.course_delivery); 
    formData.append('internship_partner', course.internship_partner); 
    formData.append('knowledge_partner', course.knowledge_partner); 
    formData.append('sponser_partner', course.sponser_partner); 
    formData.append('active', course.active); 

    return this.http.put("http://localhost:5000/course/Course/updateWithFile",formData);
  };

  newCourse(image:any, course : any)
  {
    console.log('inside service upload')
    const formData = new FormData();
    for(let i=0; i<image.length; i++){
      formData.append("files", image[i], image[i]['name']);
      console.log(`${i} ${image[i]}`);
    }
    
    formData.append('course_title', course.course_title); 
    formData.append('course_image', course.course_image); 
    formData.append('course_short_desc', course.course_short_desc); 
    formData.append('Reg_Status', course.Reg_Status); 
    formData.append('Category', course.Category); 
    formData.append('Rating', course.Rating); 
    formData.append('about_course', course.about_course); 
    formData.append('dates', course.dates); 
    formData.append('eligibility', course.eligibility); 
    formData.append('course_fee', course.course_fee); 
    formData.append('entrance_details', course.entrance_details); 
    formData.append('refund_policy', course.refund_policy); 
    formData.append('course_delivery', course.course_delivery); 
    formData.append('internship_partner', course.internship_partner); 
    formData.append('knowledge_partner', course.knowledge_partner); 
    formData.append('sponser_partner', course.sponser_partner); 
    formData.append('active', course.active); 
    return this.http.post('http://localhost:5000/course/Course/insert', formData);
  }

  deleteCourse(Course:any)  
  {
    console.log(`inside server ${Course}`);
    return this.http.post("http://localhost:5000/course/Course/remove/",Course);
  }
}
