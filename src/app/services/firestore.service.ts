import { AuthenticationService } from './authentication.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    private angularFireStore: AngularFirestore,
    private authService: AuthenticationService
  ) {}

  getTask() {
    return this.angularFireStore
      .collection('Todo', (ref) =>
        ref
          .orderBy('createdAt', 'desc')
          .where('userId', '==', this.authService.userData.uid)
      )
      .snapshotChanges();
  }

  addTask(task: string, isCompleted: boolean) {
    this.angularFireStore
      .collection('Todo')
      .add({
        task: task,
        isCompleted: isCompleted,
        userId: this.authService.userData.uid,
        createdAt: new Date(),
      })
      .then((res) => {
        console.log(res);
      });
  }

  toggleTask(id: string, isCompleted: boolean){
    this.angularFireStore
      .collection('Todo')
      .doc(id)
      .update({ isCompleted:isCompleted })
      .then((res) => {
        console.log(res);
      });
  }

  updateTask(id: string, task: string) {
    this.angularFireStore
      .collection('Todo')
      .doc(id)
      .update({ task:task })
      .then((res) => {
        console.log(res);
      });
  }

  deleteTask(id: string) {
    this.angularFireStore.collection('Todo').doc(id).delete();
  }
}
