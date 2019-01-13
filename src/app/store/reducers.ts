import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Elevator} from '../elevators.types';
import {ElevatorActions} from './actions';

export interface ElevatorsState extends EntityState<Elevator> {
}


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
        default:
            return state
    }
}
