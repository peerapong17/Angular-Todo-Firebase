import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email:string
  password:string

  constructor(private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['login'])
  }

  register(){
    this.authentication.createUser(this.email, this.password)
  }

}
