import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ElevatorsService } from './services/elevators.service';
import { EventsService } from './services/events.service';

import { AppComponent } from './app.component';
import { ElevatorsComponent } from './elevators/elevators.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { ElevatorTaskComponent } from './elevator-task/elevator-task.component';
import { FloorsComponent } from './floors/floors.component';

@NgModule({
  declarations: [
    AppComponent,
    ElevatorsComponent,
    ElevatorComponent,
    ElevatorTaskComponent,
    FloorsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ElevatorsService,EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
