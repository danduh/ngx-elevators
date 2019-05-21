import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';
import { Elevator, Floor } from '../app.types';
import { adapter, elevatorReducer, floorAdapter, floorReducer } from './reducers';

export const getElevatorsState = createFeatureSelector<any>('elevator');

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();

export const selectAllElevators = createSelector(
    getElevatorsState,
    selectAll
);

export const selectElevatorsTotal = createSelector(
    getElevatorsState,
    selectTotal
);

export const selectElevatorsIDs = createSelector(
    getElevatorsState,
    selectIds
);

export const getElevatorsEntities = createSelector(getElevatorsState, selectEntities);

export const getElevatorById = () => {
    return createSelector(
        getElevatorsEntities,
        (entities: Dictionary<Elevator>, props: { id: string }) => {
            return entities[props.id];
        },
    );
};

export const getFloorState = createFeatureSelector<any>('floor');

export const {
    selectIds: floorIds,
    selectEntities: floorEntities,
    selectAll: floorAll,
    selectTotal: floorTotal,
} = floorAdapter.getSelectors();

export const getFloorEntities = createSelector(
    getFloorState,
    floorEntities
);

export const getFloorById = () => {
    return createSelector(
        getFloorEntities,
        (entities: Dictionary<Floor>, props: { id: string }) => {
            return entities[props.id];
        },
    );
};

export const reducers = {
    elevator: elevatorReducer,
    floor: floorReducer
};
