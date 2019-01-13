import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorTaskComponent } from './elevator-task.component';

describe('ElevatorTaskComponent', () => {
  let component: ElevatorTaskComponent;
  let fixture: ComponentFixture<ElevatorTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevatorTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevatorTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
