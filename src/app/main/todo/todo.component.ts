import { Subscription } from 'rxjs';
import { FirestoreService } from './../../services/firestore.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentChangeAction, DocumentData } from '@angular/fire/firestore';

interface Task {
  task: string;
  createdAt: string;
  userId: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit, OnDestroy {
  task: string = '';
  listTask: DocumentChangeAction<Task>[] = [];
  // listTask: Task[] = [];
  isLoading: boolean = true;
  subscription: Subscription;
  constructor(
    private fireStore: FirestoreService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.fireStore.getTask().subscribe((data: DocumentChangeAction<Task>[]) => {
      this.listTask = data;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.subscription = this.authService.$isLoggedin.subscribe((res) => {
      if (!res) {
        this.router.navigate(['login']);
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
