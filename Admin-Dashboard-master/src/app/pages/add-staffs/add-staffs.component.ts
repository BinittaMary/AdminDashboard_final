import { Component, OnInit,enableProdMode } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { StaffService } from '../staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-add-staffs',
  templateUrl: './add-staffs.component.html',
  styleUrls: ['./add-staffs.component.scss']
})
export class AddStaffsComponent implements OnInit { 
  
  images:any;
  submitted : boolean=false;

  staffDetails={
    name:"",
    designation:"",
    about:"",
    image:""
  }

  constructor(private staffService:StaffService, private router:Router ,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.submitted = false;
  }
  addStaff(){
    this.staffDetails.image = this.staffDetails.image.replace('C:\\fakepath\\','');
    console.log('inside addstaff');
     console.log(this.staffDetails);
    this.staffService.newStaff(this.images, this.staffDetails).subscribe(
      response => {
        console.log(response);
        if (response) {
          Swal.fire("Successfully Added", "success")
          .then(() => {
            this.router.navigate(['../staffs'], { relativeTo: this.route });
          })          }
        else {
          Swal.fire("Network Error", "Please do after sometime ", "error")
            .then(() => {
              this.router.navigate(['../staffs'], { relativeTo: this.route });
            })

        }
      })
  }

  selectImage(event : any) {
    console.log('select image')
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log('inside if event')
    }
  }

  closeForm(){
    this.router.navigate(['../staffs'], { relativeTo: this.route });    
  }

}