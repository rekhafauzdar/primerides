import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { AuthService } from 'src/app/shared/services/auth/authservice';
import { CommonService } from 'src/app/shared/services/common/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public show_password = true;

  form = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required,
    ]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    private auth: AuthService, private router: Router,
    private commonService:CommonService,
  ) { 
    this.getAllUserProfile();
  }

  signin() {
    if (this.form.valid) {

      let user = ({
        email: this.form.value.email || '',
        password: this.form.value.password || '',
      });

      this.auth.signin(user).subscribe(response => {
        if (response.status == 'true') {
           this.signInData = response.data;
          this.userProfileId = this.signInData.userProfileId;
          if (this.signInData.userType === "user"){
            this.getUserProfileById();  
            this.router.navigate([routes.userDashboard]);             
          }
          else
            this.router.navigate([routes.admin]);
        } else {
          console.log("Signin failed !");
        }
      });
    }
  }


  signInData:any;
  userProfileData:any;
  userProfileId:number=0;
  // getUserProfileById(){
  //   // const payload ={
  //   //     userProfileId: this.userProfileId,
  //   // }
  //   this.commonService.getUserProfileById(this.userProfileId).subscribe((response:any) => {
  //     if (response.status == 'true') {
  //      this.userProfileData = response.data;
  //      console.log(this.userProfileData);
  //     } else {
  //       console.log("No Cars Data Present");
  //     }
  //   });
  // }

  getUserProfileById(){
    const payload ={
        userProfileId: this.userProfileId,
    }
    this.commonService.getUserProfileById(payload).subscribe((response:any) => {
      if (response.status == 'true') {
       this.userProfileData = response.data;
       console.log(this.userProfileData);
      } else {
        console.log("No Cars Data Present");
      }
    });
  }


  getAllUserProfile(){
  
    this.commonService.getAllUserProfile().subscribe((response:any) => {
      if (response.status == 'true') {
       this.userProfileData = response.data;
       console.log(this.userProfileData);
      } else {
        console.log("No Cars Data Present");
      }
    });
  }

  togglePassword() {
    this.show_password = !this.show_password;
  }
  ngOnInit(): void {
    if (localStorage.getItem('authenticated')) {
      localStorage.removeItem('authenticated');
    }
  }
}
