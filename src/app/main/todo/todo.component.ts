import { FirestoreService } from './../../services/firestore.service';
import { AuthenticationService } from './../../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentChangeAction, DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  task: string = '';
  listTask: DocumentChangeAction<DocumentData>[] = [];
  isLoading: boolean = true;
  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private fireStore: FirestoreService
  ) {
    if (this.authentication.isLoggedIn === false) {
      this.router.navigate(['login']);
    }
    this.fireStore.getTask().subscribe((data) => {
      this.listTask = data
      this.isLoading = false;
    });
  }

  ngOnInit() {}
}
