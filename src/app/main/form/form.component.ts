import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  task:string = ''

  constructor(private fireStore: FirestoreService) { }

  ngOnInit(): void {
  }

  addTask() {
    this.fireStore.addTask(this.task);
  }

}
