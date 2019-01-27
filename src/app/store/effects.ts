import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { getElevatorById, selectAllElevators } from './index';
import {
    AddFloorToElevatorQue,
    ElevatorActions,
    ElevatorReleased,
    ElevatorToBeReleased,
    OrderElevatorAction,
    SendElevatorActions
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
        map((action) => {
                let sndEl: Elevator;

                if (!!action.payload.elevatorId) {
                    sndEl = this.getElevatorByID(action.payload.elevatorId);
                    console.log('Expected FALSE', sndEl.ordered)
                } else {
                    sndEl = this.findElevator(action.payload.distFloor);
                    console.log('Expected UKNOWN', sndEl.ordered)
                }

                if (sndEl.ordered) {
                    sndEl.finalFloor = action.payload.distFloor;
                    sndEl.que.push(action.payload.distFloor);
                    sndEl.endTime = calcTime(sndEl.initFloor, sndEl.destFloor, sndEl.endTime);

                    return new AddFloorToElevatorQue({
                        id: sndEl.id,
                        distFloor: action.payload.distFloor
                    });

                } else {
                    sndEl.destFloor = action.payload.distFloor;
                    sndEl.ordered = true;
                    sndEl.endTime = calcTime(sndEl.initFloor, sndEl.destFloor, sndEl.endTime);

                    return new SendElevatorActions(sndEl);
                }
            }
        )
    );

    @Effect()
    releaseElevator$: Observable<Action> = this.actions$.pipe(
        ofType<ElevatorToBeReleased>(ElevatorActions.TO_BE_RELEASED),
        switchMap((action) => {
                const actionsToReturn = [];

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
                            distFloor: dist,
                            elevatorId: action.payload.id
                        })
                    );
                }

                return actionsToReturn;
            }
        ),
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

        return elev
    }

    constructor(
        private actions$: Actions,
        private store: Store<any>) {
    }
}
