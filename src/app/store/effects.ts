import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Action, select, Store} from '@ngrx/store';
import {ElevatorActions, OrderElevatorAction, SendElevatorActions} from './actions';
import {map} from 'rxjs/operators';
import {selectAllElevators} from './index';

export const ELEV = {
    RUN_TIME: 500,
    IDLE_TIME: 2000,
    FLOOR_SIZE: 62
};

/**
 *
 * @param initFlor -> Destination floor of elevator
 * @param dist -> ordered floor
 * @param endTime -> timestamp when elevator is free
 */
function clacTime(initFlor, dist, endTime) {
    const _t: number = endTime || Date.now();
    return _t + (Math.abs(initFlor - dist) * ELEV.RUN_TIME) + ELEV.IDLE_TIME
}

@Injectable()
export class ExpertsEffects {
    @Effect()
    orderElevator$: Observable<Action> = this.actions$.pipe(
        ofType<OrderElevatorAction>(ElevatorActions.ORDER_ELEVATOR),
        map((action) => {
                const sndEl = this.findElevator(action.payload.number);
                sndEl.destFloor = action.payload.number;
                return new SendElevatorActions(sndEl);
            }
        )
    );

    constructor(
        private actions$: Actions,
        private store: Store<any>) {

    }

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
                    return clacTime(a.destFloor || a.initFloor, floor, a.endTime)
                        - clacTime(b.destFloor || b.initFloor, floor, b.endTime);
                })[0]
            });

        return fastest
    }
}
