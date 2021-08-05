import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

    // server_address :string ='/api';
  // server_address :string ='http://localhost:5000';


  item = {
    name: "",
    designation: "",
    about: "",
    image: ""
  }

  getstaff(id: any) {
    return this.http.get("http://localhost:5000/staffMenu/staff/" + id);
  }


  getstaffs() {
    return this.http.get("http://localhost:5000/staffMenu/staffs");
  }

  updateStaffIndex(staff: any) {
    console.log(staff);
    return this.http.put("http://localhost:5000/staffMenu/Staffs/updateIndex/", staff);
  };


  newStaff(image: any, item: any) {

    console.log('inside service upload')
    const formData = new FormData();
    formData.append('file', image);
    formData.append('name', item.name);
    formData.append('designation', item.designation);
    formData.append('about', item.about);
    formData.append('image', item.image);
    return this.http.post("http://localhost:5000/staffMenu/Staff/insert", formData);
  }

  deletestaff(staff: any) {
    return this.http.post("http://localhost:5000/staffMenu/Staff/remove/", staff);
  }

  editStaff(item: any) {
    console.log('client update')
    return this.http.post("http://localhost:5000/staffMenu/staff/update", item)
  };


  editStaffWithImage(image: any, item: any) {

    console.log('inside service upload')
    const formData = new FormData();
    formData.append('_id', item._id);
    formData.append('file', image);
    formData.append('name', item.name);
    formData.append('designation', item.designation);
    formData.append('about', item.about);
    formData.append('image', item.image);


    return this.http.post("http://localhost:5000/staffMenu/staff/updateWithFile", formData)

  }


  newAdminUser(item:any){
    console.log(item);
    return this.http.post("http://localhost:5000/AdminUser/insert/",item);
    // .subscribe(data =>{console.log(data)})
  }

  deleteAdmin(item:any){
    return this.http.post("http://localhost:5000/AdminUser/remove/",item);
  }

  getAdminUsers(){
    return this.http.get("http://localhost:5000/AdminUser/AdminUserList");
  }

  getAdminUser(id:any){
    return this.http.get("http://localhost:5000/AdminUser/AdminUserDetails/"+id);
  }
  editAdminUser(item:any)
  {
    console.log('client update')
    return this.http.post("http://localhost:5000/AdminUser/update",item)
    // .subscribe(data =>{console.log(`response recieved ${data}`)})
  };




}
