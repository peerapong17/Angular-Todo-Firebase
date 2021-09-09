import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string;
  password: string;
  subscription: Subscription;

  constructor(
    private router: Router,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.$isLoggedin.subscribe((res: boolean) => {
      if (res) {
        this.router.navigate(['todo']);
      } else {
        this.router.navigate(['login']);
      }
    });
  }

  register(): void {
    this.router.navigate(['register']);
  }

  login() {
    this.authService.signIn(this.email, this.password);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
