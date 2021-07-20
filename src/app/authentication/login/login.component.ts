import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string
  password:string

  constructor(private router:Router, private authentication:AuthenticationService) { }

  ngOnInit(): void {
  }

  register():void {
    this.router.navigate(['register'])
  }

  login(){
    this.authentication.signIn(this.email, this.password)
  }

}
