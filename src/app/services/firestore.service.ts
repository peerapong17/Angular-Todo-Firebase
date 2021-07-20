import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private angularFireStore: AngularFirestore,
    private authenticationService: AuthenticationService
  ) {}

  getTask() {
    return this.angularFireStore
      .collection('Todo')
      .doc(this.authenticationService.userData.uid)
      .collection('TodoTask')
      .snapshotChanges();
  }

  addTask(task: string) {
    this.angularFireStore
      .collection('Todo')
      .doc(this.authenticationService.userData.uid)
      .collection('TodoTask')
      .add({ task: task })
      .then((res) => {
        console.log(res);
      });
  }

  updateTask(id: string, task: string) {
    this.angularFireStore
      .collection('Todo')
      .doc(this.authenticationService.userData.uid)
      .collection('TodoTask')
      .doc(id)
      .update({ task: task })
      .then((res) => {
        console.log(res);
      });
  }

  deleteTask(id: string) {
    this.angularFireStore
      .collection('Todo')
      .doc(this.authenticationService.userData.uid)
      .collection('TodoTask')
      .doc(id)
      .delete();
  }
}
