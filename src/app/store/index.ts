import {adapter, elevatorReducer, initialElevatorsState} from './reducers';
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

export const getElevatorsEntities = createSelector(getElevatorsState, selectEntities);


export const getElevatorById = () => {
    return createSelector(
        getElevatorsEntities,
        (entities: Dictionary<Elevator>, props: { id: string }) => {
            return entities[props.id];
        },
    );
};

export const reducers = {
    elevator: elevatorReducer
};
