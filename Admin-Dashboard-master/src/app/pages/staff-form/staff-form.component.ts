import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { StaffService } from '../staff.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {

  images:any;

  staffDetails={
    name:"",
    designation:"",
    email:"",
    image:""
  }

  constructor(private staffService:StaffService, private router:Router) { }

  ngOnInit(): void {
  }
  addStaff(){
    this.staffDetails.image = this.staffDetails.image.replace('C:\\fakepath\\','');

    this.staffService.newStaff(this.images, this.staffDetails);
    console.log(` upload image ${this.images}`); 
    console.log("called");
    alert("success")
    this.router.navigate(['/pages/staffs'])
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
