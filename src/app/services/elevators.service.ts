import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {EventsService} from './events.service';
import ElevatorObj from '../objects/elevatorObj';

@Injectable()
export class ElevatorsService {

    protected events: EventsService;
    protected _elevators: ElevatorObj[];
    protected _elevatorIdCounter: number = 1;
    protected _taskMaxId: number = 1;
    protected _elevatorsJson: any[];


    constructor(events: EventsService) {
        this.events = events;
        this._elevators = [];
        this._elevatorsJson = [];
    }

    getEvents() {
        return this.events;
    }

    getElevatorsJson() {
        return this._elevatorsJson;
    }

    getElevators() {
        return this._elevators;
    }

    getElevatorById(id: number) {
        for (let i in this._elevators) {
            if (this._elevators[i].getId() === id) {
                return this._elevators[i];
            }
        }
        console.warn('couldn\'t find an elevator with id: ' + id);

        return false;
    }

    addElevator(stoppingTime: number, floorMoveTime: number, currentFloor: number) {
        let elevator = new ElevatorObj(this._elevatorIdCounter++, stoppingTime, floorMoveTime, currentFloor);
        let elevatorEvents = elevator.getEvents();
        elevatorEvents.on('currentFloorUpdated', (data) => {
            this.onElevatorFloorUpdated(data);
            this.events.broadcast('elevatorsChanged', this._elevatorsJson);
        })
        elevatorEvents.on('taskArrivedToDest', (data) => {
            this.events.broadcast('taskArrivedToDest');
        })
        elevatorEvents.on('taskAdded', (data) => {
            this.onTaskAdded(data);
            this.events.broadcast('elevatorsChanged', this._elevatorsJson);
            this.events.broadcast('taskAdded', data);
        })
        elevatorEvents.on('taskEnded', (data) => {
            this.onTaskEnded(data);
            this.events.broadcast('elevatorsChanged', this._elevatorsJson);
            this.events.broadcast('taskEnded', data);
        })

        this._elevators.push(elevator);
        this._elevatorsJson.push(this._createElevatorDataObj(elevator));

        this.events.broadcast('elevatorsChanged', this._elevatorsJson);

        return elevator;
    }

    addNewTask(floorNumber: number) {
        let min = Number.MAX_VALUE;
        let selectedElevator;
        for (let i in this._elevators) {
            let completionTimeForPotentialTask = this._elevators[i].calculateCompletionTimeForPotentialTask(floorNumber);
            if (completionTimeForPotentialTask < min) {
                min = completionTimeForPotentialTask;
                selectedElevator = this._elevators[i];
            }
        }

        selectedElevator.addTask(floorNumber, this._taskMaxId++);
    }

    _createElevatorDataObj(elevatorObj: ElevatorObj) {
        let elevatorDataObj = {
            id: elevatorObj.getId(),
            floorNumber: elevatorObj.getCurrentFloor(),
            tasks: this._createTasksObjData(elevatorObj.getTasks())
        }

        return elevatorDataObj
    }

    _createTasksObjData(tasks) {
        let tastksObjData = []
        for (var i in tasks) {
            let task = this._createTaskDataObj(tasks[i]);
            tastksObjData.push(task);
        }

        return tastksObjData;
    }

    _createTaskDataObj(taskObj) {
        let taskDataObj = {
            id: taskObj.getId(),
            taskTotalTime: taskObj.getTaskTotalTime(),
            taskDestFloor: taskObj.getDestFloor()
        }

        return taskDataObj;
    }

    onElevatorFloorUpdated(data) {
        let elvatorDataObj = _.find(this._elevatorsJson, {id: data.id});
        elvatorDataObj.floorNumber = data.floor;
    }

    onTaskAdded(data) {
        let elvatorDataObj = _.find(this._elevatorsJson, {id: data.elevator.getId()});
        let taskData = this._createTaskDataObj(data.task);
        elvatorDataObj.tasks.push(taskData);
    }

    onTaskEnded(data) {
        console.log('task end', data);
        let elvatorDataObj = _.find(this._elevatorsJson, {id: data.elevator.getId()});
        _.remove(elvatorDataObj.tasks, {id: data.task.getId()})
    }

}
