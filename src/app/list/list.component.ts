import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Entity} from "../interfaces/entity";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input('array') array: Array<Entity>;
  @Input('title') title: string;
  @Input() isDeleteButtonActive = false;

  @Output() onSelect = new EventEmitter<Entity>();
  @Output() onDelete = new EventEmitter<Entity>();

  selectedEntity: Entity = {};

  loadEntity(entity: Entity) {
    this.onSelect.emit(entity);
    this.selectedEntity = entity;
  }

  deleteEntity(entity: Entity) {
    this.onDelete.emit(entity);
  }
  constructor() {
  }

  ngOnInit() {
  }

}
