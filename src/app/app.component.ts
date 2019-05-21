import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddElevatorActions } from './store/actions';
import { guid } from './utils/uuid';
import { APP_TITLE } from './app.constants';
import { Elevator } from './app.types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    public title = APP_TITLE;
    private numbers = 0;

    constructor(private store: Store<any>) {
    }

    addElevator() {
        const elevator: Elevator = {
            id: guid(),
            initFloor: 0,
            destFloor: null,
            endTime: null,
            number: this.numbers++,
            que: []
        };

        this.store.dispatch(new AddElevatorActions(elevator));
    }

    onFloorSelected(floorNumber: number) {

    }
}
