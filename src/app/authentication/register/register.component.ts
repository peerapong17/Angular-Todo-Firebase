import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  inputForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6),]),
  });

  isEmailEmpty:boolean = false
  isPasswordEmpty:boolean = false

  ngOnInit(): void {}

  login() {
    this.router.navigate(['login']);
  }

  get checkEmailError(){
    return this.email.touched && this.email.dirty && this.email.errors
  }

  get checkPasswordError(){
    return this.password.touched && this.password.dirty && this.password.errors
  }

  get email(){
    return this.inputForm.controls.email
  }
  get password(){
    return this.inputForm.controls.password
  }

  get checkEmailEmpty(){
    return this.isEmailEmpty && this.email.errors
  }
  get checkPasswordEmpty(){
    return this.isPasswordEmpty && this.password.errors
  }

  register() {
    if(this.inputForm.valid){
      this.authentication.createUser(this.email.value, this.password.value)
    }

    if(this.email.value === ''){
      this.isEmailEmpty = true
    }
    if(this.password.value === ''){
      this.isPasswordEmpty = true
    }
  }
}
