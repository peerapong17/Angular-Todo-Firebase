import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

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
      console.log('this is from firebase authstate');
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.router.navigate(['todo']);
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async AuthLogin(provider: firebase.auth.AuthProvider): Promise<void> {
    try {
      await this.firebaseAuth.signInWithPopup(provider);
    } catch (error) {
      alert(error.message);
    }
  }

  GoogleAuth(): void {
    this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  signIn(email: string, password: string): void {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  createUser(email: string, password: string): void {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.router.navigate(['login']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  signOut() {
    this.firebaseAuth.signOut().then((res) => {
      localStorage.clear()
      this.router.navigate(['login']);
    });
  }

  get isLoggedIn(): boolean {
    this.userData = JSON.parse(localStorage.getItem('user'));
    if (this.userData !== null) {
      return true;
    } else {
      return false;
    }
  }
}
