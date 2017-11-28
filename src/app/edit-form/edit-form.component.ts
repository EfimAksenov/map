import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Entity} from "../interfaces/entity";

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
    this.entity = {};
  }

  constructor() {
  }

  ngOnInit() {
  }

}
