import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorsComponent } from './elevators.component';
import { ElevatorComponent } from './../elevator/elevator.component';
import { ElevatorTaskComponent } from './../elevator-task/elevator-task.component';
import {ElevatorsService} from '../services/elevators.service';
import {EventsService} from '../services/events.service';

describe('ElevatorsComponent', () => {
  let component: ElevatorsComponent;
  let fixture: ComponentFixture<ElevatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElevatorsComponent, ElevatorComponent,ElevatorTaskComponent ],
      providers: [ElevatorsService,EventsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElevatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
