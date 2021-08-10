import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { TodoComponent } from './todo/todo.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [TodoComponent, ListComponent, FormComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
