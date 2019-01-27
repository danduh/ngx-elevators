import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Elevator, ElevQue} from '../app.types';
import {ElevatorActions, QueActions} from './actions';

export interface ElevatorsState extends EntityState<Elevator> { }

export const adapter: EntityAdapter<Elevator> =
    createEntityAdapter<Elevator>(
        {
            selectId: (elevator: Elevator) => elevator.id,
        });

export const initialElevatorsState: ElevatorsState =
    adapter.getInitialState();


export function elevatorReducer(state = initialElevatorsState, action) {
    switch (action.type) {
        case ElevatorActions.ADD_ELEVATOR: {

            return adapter.addOne(action.payload, state);
        }

        case ElevatorActions.SEND_ELEVATOR: {

            return adapter.updateOne(action.payload, state);
        }
        case ElevatorActions.RELEASED: {

            return adapter.updateOne(action.payload, state);
        }
        case QueActions.ADD_FLOOR_TO_QUE: {

            return adapter.addOne(action.payload, state);
        }

        default:
            return state
    }
}

export interface ElevQuesState extends EntityState<ElevQue> { }

export const queAdapter: EntityAdapter<ElevQue> =
    createEntityAdapter<ElevQue>(
        {
            selectId: (que: ElevQue) => que.elevatorId
        });

export const initialQueElevatorsState: ElevQuesState = queAdapter.getInitialState();

export function queElevatorReducer(state = initialQueElevatorsState, action) {
    switch (action.type) {

        case QueActions.ADD_FLOOR_TO_QUE: {
            return queAdapter.addOne(action.payload, state);
        }

        default:
            return state
    }
}
