import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { take } from 'rxjs';
import { Auth } from 'src/app/models/Auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword = false;

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    let { login, password } = this.loginForm.value;

    this.service
      .login(login, password)
      .pipe(take(1))
      .subscribe({
        next: (value:Auth[]) => {
          if(value.length !=0){
            localStorage.setItem('login',value[0].login)
            localStorage.setItem('password',value[0].password)
            localStorage.setItem('auth', "true");
            this.router.navigate(['/books/catalog']);
          }else{
            this.toast.error('Error!', 'Invalid user or password!');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toast.error('Error!', 'Try again.');
        },
      });
  }

}
