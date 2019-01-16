import {Elevator} from '../elevators.types';

export enum ElevatorActions {
    ORDER_ELEVATOR = '[] Elevator ordered',
    ADD_ELEVATOR = '[] Add Elevator',
    SEND_ELEVATOR = '[] Send Elevator',
    TO_BE_RELEASED = '[] Elevator Should to be released',
    RELEASED = '[] Elevator released and free to use',

}


export enum QueActions {
    ADD_FLOOR_TO_QUE = '[] Add Floor to QUE'
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

export class ElevatorToBeReleased {
    readonly type = ElevatorActions.TO_BE_RELEASED;

    constructor(public payload) {

    }
}

export class ElevatorReleased {
    readonly type = ElevatorActions.RELEASED;

    constructor(public payload) {

    }
}

export class AddFloorToElevatorQue {
    readonly type = QueActions.ADD_FLOOR_TO_QUE;

    constructor(public payload) {

    }
}
