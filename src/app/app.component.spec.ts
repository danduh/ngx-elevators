import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ElevatorsComponent } from './elevators/elevators.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { ElevatorTaskComponent } from './elevator-task/elevator-task.component';
import { FloorsComponent } from './floors/floors.component';

import { ElevatorsService } from './services/elevators.service';
import { EventsService } from './services/events.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ElevatorsComponent,
        ElevatorComponent,
        ElevatorTaskComponent,
        FloorsComponent
      ],
      providers: [ElevatorsService,EventsService],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
