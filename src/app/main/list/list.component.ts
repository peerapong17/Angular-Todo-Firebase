import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit, Input } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  faEdit = faEdit;
  faCheck = faCheck;
  faTimes = faTimes;
  faTrashAlt = faTrashAlt;
  isEditing: boolean = false;
  @Input() task: string = '';
  @Input() createdAt: any = '';
  @Input() id: string = '';
  @Input() isCompleted: boolean = false;

  constructor(private fireStore: FirestoreService) {}

  ngOnInit(): void {}

  onDelete() {
    this.fireStore.deleteTask(this.id);
  }

  onEdit() {
    this.isEditing = !this.isEditing;
  }

  toggle() {
    this.isCompleted = !this.isCompleted;
    this.fireStore.toggleTask(this.id, this.isCompleted);
  }

  onUpdate() {
    this.fireStore.updateTask(this.id, this.task);
  }

  onCancel() {
    this.isEditing = !this.isEditing;
  }
}
