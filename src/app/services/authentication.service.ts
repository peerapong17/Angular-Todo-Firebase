import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

export interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: User;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) {
    this.firebaseAuth.authState.subscribe((user) => {
      console.log("this is from firebase authstate")
      if (user) {
        this.SetUserData(user)
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  signIn(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(({user}) => {
        this.SetUserData(user);
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.router.navigate(['todo']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  createUser(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        this.SetUserData(user);
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.router.navigate(['todo']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  signOut() {
    this.firebaseAuth.signOut().then((res) => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/');
    });
  }

  SetUserData(user: User) {
    this.userData = {
      uid: user.uid,
      email: user.email,
    };
  }

  get isLoggedIn(): boolean {
    this.userData = JSON.parse(localStorage.getItem('user'));
    return this.userData !== null  ? true : false;
  }
}