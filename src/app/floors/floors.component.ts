import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderElevatorAction } from '../store/actions';
import { FLOOR_SIZE } from '../app.constants';

@Component({
    selector: 'app-floors',
    templateUrl: './floors.component.html',
    styleUrls: ['./floors.component.scss']
})
export class FloorsComponent implements OnInit {
    @Input() maxFloor = 10;
    @Input() minFloor = 0;

    @Output() floorSelected: EventEmitter<number> = new EventEmitter();

    public floors: {}[];
    public floorSize: number = FLOOR_SIZE;

    constructor(private store: Store<any>) {
    }

    ngOnInit() {
        this.floors = this._createFloors(this.minFloor, this.maxFloor);
    }

    selectFloor(floor) {
        this.store.dispatch(new OrderElevatorAction(floor));

        if (!floor.active) {
            this.floorSelected.emit(floor.distFloor)
        }
    }

    _createFloors(min, max) {
        const floors = [];

        for (let i = min; i <= max; i++) {
            floors.push({
                distFloor: i,
                active: false
            });
        }

        return floors;
    }

}
