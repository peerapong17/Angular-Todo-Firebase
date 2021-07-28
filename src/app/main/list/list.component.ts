import { FirestoreService } from './../../services/firestore.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  isEditing: boolean = false;
  @Input() task: string = '';
  @Input() createdAt: any = '';
  @Input() id: string = '';

  constructor(private fireStore: FirestoreService) {}

  ngOnInit(): void {}

  onDelete() {
    this.fireStore.deleteTask(this.id);
  }

  onEdit() {
    this.isEditing = !this.isEditing;
  }

  onUpdate() {
    this.fireStore.updateTask(this.id, this.task);
  }

  onCancel() {
    this.isEditing = !this.isEditing;
  }
}
