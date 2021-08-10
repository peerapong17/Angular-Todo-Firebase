import { FirestoreService } from './../../services/firestore.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
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
export class TodoComponent implements OnInit {
  task: string = '';
  listTask: DocumentChangeAction<Task>[] = [];
  // listTask: Task[] = [];
  isLoading: boolean = true;
  constructor(private fireStore: FirestoreService) {
    this.fireStore.getTask().subscribe((data: DocumentChangeAction<Task>[]) => {
      this.listTask = data;
      this.isLoading = false;
    });
  }

  ngOnInit() {}
}
