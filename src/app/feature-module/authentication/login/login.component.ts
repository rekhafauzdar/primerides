import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { AuthService } from 'src/app/shared/services/auth/authservice';

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

  constructor(private auth: AuthService, private router: Router) { }

  signin() {
    if (this.form.valid) {

      let user = ({
        email: this.form.value.email || '',
        password: this.form.value.password || '',
      });

      this.auth.signin(user).subscribe(response => {
        if (response.status == 'true') {
          let responseData = response.data;
          if (responseData.userType === 'user')
            this.router.navigate([routes.userDashboard]);
          else
            this.router.navigate([routes.admin]);
        } else {
          console.log("Signin failed !");
        }
      });
    }
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
