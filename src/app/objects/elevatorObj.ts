/**
 * Created by itay on 01/07/17.
 */
import {EventsService} from '../services/events.service';
import ElevatorTask from './elevatorTask';

export default class ElevatorObj {
    protected _id: number;
    protected _stoppingTime: number;
    protected _floorMoveTime: number;
    protected _currentFloor: number;
    protected _tasks: ElevatorTask[];
    protected events: EventsService = new EventsService();


    constructor(id, stoppingTime, floorMoveTime, currentFloor) {
        this._id = id;
        this._stoppingTime = stoppingTime;
        this._floorMoveTime = floorMoveTime;
        this._currentFloor = currentFloor;
        this._tasks = [];
    }

    getStoppingTime() {
        return this._stoppingTime
    }

    getId() {
        return this._id;
    }

    getCurrentFloor() {
        return this._currentFloor;
    }

    getEvents() {
        return this.events;
    }

    setTasks(tasks: ElevatorTask[]) {
        this._tasks = tasks;
    }

    getTasks() {
        return this._tasks;
    }

    getDestFloor() {
        if (this._tasks.length === 0) {
            return this._currentFloor;
        }

        return this._tasks[this._tasks.length - 1].getDestFloor();
    }

    addTask(floorNumber: number, id: number) {
        const task = this._createNewTask(floorNumber, id);
        const taskEventService = task.getEvents();
        taskEventService.on('currentFloorUpdated', this.onCurrentFloorUpdated.bind(this))
        taskEventService.on('taskEnded', this.onTaskEnded.bind(this));
        taskEventService.on('taskArrivedToDest', this.onTaskArrivedToDest.bind(this));

        if (this._tasks.length === 0) {
            task.startTask();
        }

        this.events.broadcast('taskAdded', {elevator: this, task: task});
        this._tasks.push(task);

        return task;
    }

    endTask(task: ElevatorTask) {
        let index = this._tasks.indexOf(task);
        this.events.broadcast('taskEnded', {elevator: this, task: task});
        this._tasks.splice(index, 1);
    }

    _createNewTask(floorNumber: number, id: number) {
        let sourceFloor = this._currentFloor;
        let destFloor = floorNumber;
        if (this._tasks.length > 0) {
            sourceFloor = this._tasks[this._tasks.length - 1].getDestFloor();
        }
        let startingTime = this.calculateCompletionTime();

        return new ElevatorTask(id, this._stoppingTime, this._floorMoveTime, sourceFloor, destFloor, startingTime);
    }

    calculateCompletionTime() {
        let completionTime = 0;
        for (var i in this._tasks) {
            completionTime += this._tasks[i].calculateCompletionTime();
        }

        return completionTime;
    }

    calculateCompletionTimeForPotentialTask(floorNumber: number) {
        let task = this._createNewTask(floorNumber, 1);

        return this.calculateCompletionTime() + task.calculateCompletionTime();
    }

    onCurrentFloorUpdated(floor) {
        this._currentFloor = floor;
        this.events.broadcast('currentFloorUpdated', {id: this._id, floor: this._currentFloor});
    }

    onTaskArrivedToDest() {
        this.events.broadcast('taskArrivedToDest');
    }

    onTaskEnded(task) {
        // console.log(task)
        this.endTask(task);
        let firstTask = this._tasks.shift();
        if (firstTask) {
            firstTask.startTask();
        }
    }

}
