import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStopsComponent } from './create-stops.component';

describe('CreateStopsComponent', () => {
  let component: CreateStopsComponent;
  let fixture: ComponentFixture<CreateStopsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateStopsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateStopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
