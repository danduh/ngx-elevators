import * as _ from 'lodash';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ElevatorsService} from '../services/elevators.service';
import AppConstants from './../constants';
import {Store} from '@ngrx/store';
import {OrderElevatorAction} from '../store/actions';

@Component({
    selector: 'app-floors',
    templateUrl: './floors.component.html',
    styleUrls: ['./floors.component.scss'],
    providers: [ElevatorsService]
})
export class FloorsComponent implements OnInit {
    @Input() maxFloor: number = 10;
    @Input() minFloor: number = 0;
    @Output() floorSelected: EventEmitter<number> = new EventEmitter();
    public floors: {}[];
    elevatorsServiceEvents: any;


    constructor(protected elevatorsService: ElevatorsService,
                private store: Store<any>) {
        this.elevatorsServiceEvents = elevatorsService.getEvents();
        this.elevatorsServiceEvents.on('taskAdded', this.onTaskAdded.bind(this));
        this.elevatorsServiceEvents.on('taskEnded', this.onTaskEnded.bind(this));
    }

    ngOnInit() {
        this.floors = this._createFloors(this.minFloor, this.maxFloor);
    }

    getFloorHeight() {
        return AppConstants.FLOOR_SIZE_IN_PX + 'px'
    }

    onTaskAdded(data) {
        let floor: any = _.find(this.floors, {distFloor: data.task.getDestFloor()});
        floor.active = true;
    }

    onTaskEnded(data) {
        let floor: any = _.find(this.floors, {distFloor: data.task.getDestFloor()});
        floor.active = false;
    }

    selectFloor(floor) {
        this.store.dispatch(new OrderElevatorAction(floor));
        if (!floor.active) {
            this.floorSelected.emit(floor.distFloor)
        }
    }

    _createFloors(min, max) {
        let floors = [];
        for (var i = min; i < (max + 1); i++) {
            let floorObj = {
                distFloor: i,
                active: false
            }
            floors.push(floorObj);
        }

        return floors;
    }

}
