import { Subject } from 'rxjs';
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
  userData: User = null;
  $isLoggedin = new Subject<boolean>()

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.$isLoggedin.next(true)
      } else {
        localStorage.clear();
      }
    });
  }

  async AuthLogin(provider: firebase.auth.AuthProvider): Promise<void> {
    try {
      await this.auth.signInWithPopup(provider).then((res) => {
        this.userData = res.user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      });
    } catch (error) {
      window.alert(error.message);
    }
  }

  GoogleAuth(): void {
    this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  signIn(email: string, password: string): void {
    this.auth
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
    this.auth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.userData = user;
        this.router.navigate(['login']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  signOut() {
    this.auth.signOut().then((res) => {
      localStorage.clear();
      this.$isLoggedin.next(false)
    });
  }

  get isLoggedIn(): boolean {
    if (this.userData !== null) {
      return true;
    } else {
      return false;
    }
  }
}
