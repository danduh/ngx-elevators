import { Component } from '@angular/core';
import {ElevatorsService} from './services/elevators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ElevatorsService]
})

export class AppComponent {
  public title = 'Elevators App';
  protected _defaultCurrentFloor: number = 0;
  protected _defaultTimeBetweenFloors: number = 0.5;
  protected _defaultStoppingTimeAtFloor: number = 2;
  public elevatorIds: any = [];
  elevatorsService;

  constructor(elevatorsService: ElevatorsService) {
    this.elevatorsService = elevatorsService;
  }

  addElevator() {
    let elevator = this.elevatorsService.addElevator(this._defaultStoppingTimeAtFloor,this._defaultTimeBetweenFloors,this._defaultCurrentFloor);
    this.elevatorIds.push(elevator.getId());
  }

  onFloorSelected(floorNumber: number) {
    this.elevatorsService.addNewTask(floorNumber);
  }

}
