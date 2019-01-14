import {adapter, elevatorReducer, initialElevatorsState, queAdapter, queElevatorReducer} from './reducers';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Elevator} from '../elevators.types';


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

export const getQueState = createFeatureSelector<any>('que');

export const {
    selectIds: queIds,
    selectEntities: queEntities,
    selectAll: queAll,
    selectTotal: queTotal,
} = queAdapter.getSelectors();


export const getQueEntities = createSelector(getQueState, queEntities);

export const getQueByDistFlor = () => {
    return createSelector(
        getElevatorsEntities,
        (entities: Dictionary<Elevator>, props: { id: string }) => {
            return entities[props.id];
        },
    );
};




export const reducers = {
    elevator: elevatorReducer,
    que: queElevatorReducer
};
