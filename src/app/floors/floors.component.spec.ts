import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ElevatorsService} from '../services/elevators.service';

import { FloorsComponent } from './floors.component';
import {EventsService} from "../services/events.service";

describe('FloorsComponent', () => {
  let component: FloorsComponent;
  let fixture: ComponentFixture<FloorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloorsComponent ],
      providers: [ElevatorsService,EventsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
