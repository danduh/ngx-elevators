import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { getElevatorById, selectAllElevators, getFloorById } from './index';
import {
    ElevatorActions,
    ElevatorReleased,
    ElevatorToBeReleased,
    OrderElevatorAction,
    SendElevatorActions,
    AddFloor,
    UpdateFloor
} from './actions';
import { Elevator } from '../app.types';
import { ELEVATOR_RUN_TIME, ELEVATOR_IDLE_TIME } from '../app.constants';

/**
 *
 * @param initFlor -> Destination floor of elevator
 * @param dist -> ordered floor
 * @param endTime -> timestamp when elevator is free
 */
function calcTime(initFlor, dist, endTime): number {
    const _t: number = endTime || Date.now();
    return _t + (Math.abs(initFlor - dist) * ELEVATOR_RUN_TIME) + ELEVATOR_IDLE_TIME
}

@Injectable()
export class ExpertsEffects {

    @Effect()
    orderElevator$: Observable<Action> = this.actions$.pipe(
        ofType<OrderElevatorAction>(ElevatorActions.ORDER_ELEVATOR),
        switchMap((action) => {
                const actionsToReturn = [];

                let sndEl: Elevator;

                if (!!action.payload.elevatorId) {
                    sndEl = this.getElevatorByID(action.payload.elevatorId);
                    // console.log('Expected FALSE', sndEl.ordered)
                } else {
                    sndEl = this.findElevator(action.payload.floorId);
                    // console.log('Expected UNKNOWN', sndEl.ordered)
                }



                if (sndEl.ordered) {
                    sndEl.finalFloor = action.payload.floorId;
                    sndEl.que.push(action.payload.floorId);
                    sndEl.endTime = calcTime(sndEl.initFloor, sndEl.destFloor, sndEl.endTime);
                } else {
                    sndEl.destFloor = action.payload.floorId;
                    sndEl.ordered = true;
                    sndEl.endTime = calcTime(sndEl.initFloor, sndEl.destFloor, sndEl.endTime);

                    const floor = this.getFloorByID(action.payload.floorId);

                    if (floor) {
                        floor.active = true;
                        floor.que.push(sndEl.id);
                        actionsToReturn.push(new UpdateFloor(floor));
                    } else {
                        actionsToReturn.push(new AddFloor({
                            active: true,
                            floorId: action.payload.floorId,
                            que: [
                                sndEl.id
                            ]
                        }));
                    }

                    actionsToReturn.push(new SendElevatorActions(sndEl));
                }

                return actionsToReturn;
            }
        )
    );

    @Effect()
    releaseElevator$: Observable<Action> = this.actions$.pipe(
        ofType<ElevatorToBeReleased>(ElevatorActions.TO_BE_RELEASED),
        switchMap((action) => {
                const actionsToReturn = [];

                const floor = this.getFloorByID(action.payload.destFloor);

                floor.que.shift();
                actionsToReturn.push(new UpdateFloor(floor));

                let dist;

                action.payload.initFloor = action.payload.destFloor;
                action.payload.endTime = null;
                action.payload.ordered = false;

                if (action.payload.que.length > 0) {
                    dist = action.payload.que.shift();
                }

                actionsToReturn.push(new ElevatorReleased(action.payload));

                if (!!dist || dist === 0) {
                    actionsToReturn.push(
                        new OrderElevatorAction({
                            floorId: dist,
                            elevatorId: action.payload.id
                        })
                    );
                }

                return actionsToReturn;
            }
        ),
    );

    @Effect()
    releasedElevator$: Observable<Action> = this.actions$.pipe(
        ofType<ElevatorReleased>(ElevatorActions.RELEASED),
        map((action) => {
                const floor = this.getFloorByID(action.payload.destFloor);

                if (floor.que.length === 0) {
                    floor.active = false;
                }

                return new UpdateFloor(floor);
            }
        )
    );

    /**
     * returns the fastest elevator that can come to given floor;
     * @param floor
     */
    findElevator(floor) {
        let fastest;

        this.store
            .pipe(
                select(selectAllElevators),
            )
            .subscribe(els => {
                fastest = [...els].sort((a, b) => {
                    return calcTime(a.finalFloor || a.destFloor || a.initFloor, floor, a.endTime)
                        - calcTime(b.finalFloor || b.destFloor || b.initFloor, floor, b.endTime);
                })[0]
            });

        return fastest
    }

    getElevatorByID(id) {
        let elev;

        this.store
            .pipe(
                select(getElevatorById(), {id}),
            )
            .subscribe(els => elev = els);

        return elev;
    }

    getFloorByID(id) {
        let floor;

        this.store
            .pipe(
                select(getFloorById(), {id}),
            )
            .subscribe(fls => floor = fls);

        return floor;
    }

    constructor(
        private actions$: Actions,
        private store: Store<any>) {
    }
}
