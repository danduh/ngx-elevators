import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Elevator, Floor } from '../app.types';
import { ElevatorActions, FloorActions } from './actions';

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

        default:
            return state
    }
}

export interface FloorState extends EntityState<Floor> { }

export const floorAdapter: EntityAdapter<Floor> =
    createEntityAdapter<Floor>(
        {
            selectId: (floor: Floor) => floor.floorId
        });

export const initialFloorState: FloorState = floorAdapter.getInitialState();

export function floorReducer(state = initialFloorState, action) {
    switch (action.type) {

        case FloorActions.ADD_FLOOR: {
            return floorAdapter.addOne(action.payload, state);
        }

        case FloorActions.UPDATE_FLOOR: {
            return floorAdapter.updateOne(action.payload, state);
        }

        default:
            return state
    }
}
