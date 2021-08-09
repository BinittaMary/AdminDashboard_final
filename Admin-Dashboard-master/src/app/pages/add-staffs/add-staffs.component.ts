import { Component, OnInit,enableProdMode } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { StaffService } from '../staff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

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

  downloadURL: Observable<string>
  fb: any;
  ifActive : boolean = false;

  constructor(private staffService:StaffService, private router:Router ,private route:ActivatedRoute, private fireStorage: AngularFireStorage) { }

  ngOnInit(): void {
    this.submitted = false;
    this.ifActive = false;
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
    this.ifActive = false;
    const file = event.target.files[0];
    console.log(file);
    var n=new Date();
    const filePath = `uploads/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`uploads/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          console.log('inside snapshot');
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.staffDetails.image= url;
              this.ifActive = true;
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log('hhhh',url);
        }
      });
  }

  closeForm(){
    this.router.navigate(['../staffs'], { relativeTo: this.route });    
  }

}