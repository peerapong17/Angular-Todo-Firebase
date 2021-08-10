import { FormGroup, FormControl, Validator } from '@angular/forms';
import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  taskForm = new FormGroup({
    task: new FormControl(''),
    isCompleted: new FormControl(false),
  });

  constructor(private fireStore: FirestoreService) {}

  ngOnInit(): void {}

  addTask() {
    if (this.task.value == '') {
      return;
    }
    this.fireStore.addTask(this.task.value, this.isCompleted.value);
    this.taskForm.reset()
  }

  get task() {
    return this.taskForm.controls.task;
  }
  get isCompleted() {
    return this.taskForm.controls.isCompleted;
  }
}
