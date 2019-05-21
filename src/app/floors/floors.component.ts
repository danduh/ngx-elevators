import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import { getFloorEntities, selectElevatorsIDs } from '../store';
import { OrderElevatorAction } from '../store/actions';
import { Floor } from '../app.types';
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

    public floors: Floor[];
    public floorSize: number = FLOOR_SIZE;

    private elevatorsIds: string[];

    constructor(private store: Store<any>) {
    }

    ngOnInit() {
        this.floors = this._createFloors(this.minFloor, this.maxFloor);

        this.store
            .pipe(
                select(selectElevatorsIDs),
                distinctUntilChanged()
            )
            .subscribe((elevatorsIds: string[]) => {
                this.elevatorsIds = elevatorsIds;
            });

        this.store
            .pipe(
                select(getFloorEntities),
                distinctUntilChanged()
            )
            .subscribe((floorEntities: {[key: number]: Floor}) => {
                for (const floorId in floorEntities) {
                    if (floorEntities.hasOwnProperty(floorId)) {
                        if (this.floors[floorId].active && !floorEntities[floorId].active) {
                            this._playDing();
                        }

                        this.floors[floorId].active = floorEntities[floorId].active;
                    }
                }
            });
    }

    selectFloor(floor) {
        floor.active = true;

        if (this.elevatorsIds.length === 0) {
            floor.active = false;
            return;
        }

        this.store.dispatch(new OrderElevatorAction(floor));
    }

    _createFloors(min, max) {
        const floors = [];

        for (let i = min; i <= max; i++) {
            floors.push({
                floorId: i
            });
        }

        return floors;
    }

    _playDing() {
        const audio = new Audio('/assets/ding.mp3');
        audio.play();
    }

}
