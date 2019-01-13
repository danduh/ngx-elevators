import {Elevator} from '../elevators.types';

export enum ElevatorActions {
    ORDER_ELEVATOR = '[] Elevator ordered',
    ADD_ELEVATOR = '[] Add Elevator',
    SEND_ELEVATOR = '[] Send Elevator'
}

export class OrderElevatorAction {
    readonly type = ElevatorActions.ORDER_ELEVATOR;

    constructor(public payload: any) {

    }
}

export class AddElevatorActions {
    readonly type = ElevatorActions.ADD_ELEVATOR;

    constructor(public payload?: any) {

    }
}

export class SendElevatorActions {
    readonly type = ElevatorActions.SEND_ELEVATOR;

    constructor(public payload: Elevator) {

    }
}
