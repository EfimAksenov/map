import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entity} from "../interfaces/entity";
import {formArrayNameProvider} from "@angular/forms/src/directives/reactive_directives/form_group_name";

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  @Input() entity: Entity = {};

  @Output() onSave = new EventEmitter<any>();
  @Output() onUpdate = new EventEmitter<any>();

  save(values) {
    this.onSave.emit(values);
  }

  update(values) {
    this.onUpdate.emit(values);
  }

  clear(form) {
    console.log(form);
    this.entity = {};
  }

  constructor() {
  }

  ngOnInit() {
  }

}
