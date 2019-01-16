import {Component} from '@angular/core';
import {ElevatorsService} from './services/elevators.service';
import {Store} from '@ngrx/store';
import {AddElevatorActions} from './store/actions';
import {guid} from './utils/uuid';
import {Elevator} from './elevators.types';

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
    private numbers: number = 0;

    constructor(elevatorsService: ElevatorsService,
                private store: Store<any>) {
    this.elevatorsService = elevatorsService;
    }

    addElevator() {
        const el: Elevator = {
            id: guid(),
            initFloor: 0,
            destFloor: null,
            endTime: null,
            number: this.numbers++,
            que: []
        };

        this.store.dispatch(new AddElevatorActions(el));
        let elevator = this.elevatorsService.addElevator(this._defaultStoppingTimeAtFloor, this._defaultTimeBetweenFloors, this._defaultCurrentFloor);
        this.elevatorIds.push(elevator.getId());
    }

    onFloorSelected(floorNumber: number) {
        // this.elevatorsService.addNewTask(floorNumber);
    }

}
