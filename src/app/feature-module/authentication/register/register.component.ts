import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/authservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  public routes = routes;
  public CustomControler!: string | number;
  public isValidConfirmPassword = false;
  public show_password = true;

 

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required]),
    mobile: new FormControl('576879809', [Validators.required]),
    userType: new FormControl('user', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    private auth: AuthService, 
    // private dataFactoryService: DataFactoryService,
    private router: Router
  ) {}

  signup() {
    if (this.form.valid) {

      let user = ({
        userName: this.form.value.username || '',       
        email: this.form.value.email || '',    
        password: this.form.value.password || '',   
        userType: this.form.value.userType || 'user',  
        mobile: this.form.value.mobile || '67677899089',  
      
      });

      this.auth.signup(user).subscribe(response => {
        if (response.status == 'true') {
          this.router.navigate([routes.login])
        } else {
          console.log("Signup failed");
        }
      });
    }
  }


  togglePassword() {
    this.show_password = !this.show_password;
  }
}
