import {EventsService} from './../services/events.service';

/**
 * Created by itay on 01/07/17.
 */
export default class ElevatorTask {
  protected _id: number;
  protected _stoppingTime: number;
  protected _floorMoveTime: number;
  protected _currentFloor: number;
  protected _sourceFloor: number;
  protected _destFloor: number;
  protected _taskTotalTime: number;
  protected _taskStarted: boolean;
  protected _taskEnded: boolean;
  protected _interval: any;
  protected events: EventsService = new EventsService();

  constructor(id,stoppingTime,floorMoveTime,sourceFloor,destFloor,startingTime) {
    this._id = id; // in seconds
    this._stoppingTime = stoppingTime; // in seconds
    this._floorMoveTime = floorMoveTime; //in seconds
    this._sourceFloor = sourceFloor;
    this._destFloor = destFloor;
    this._currentFloor = sourceFloor;
    this._taskTotalTime = startingTime + this.calculateCompletionTime();
  }

  getId() {
    return this._id;
  }

  getTaskTotalTime() {
    return this._taskTotalTime;
  }

  getEvents() {
    return this.events;
  }

  getCurrentFloor() {
    return this._currentFloor;
  }

  getDestFloor()  {
    return this._destFloor;
  }

  getSourceFloor() {
    return this._sourceFloor;
  }


  calculateCompletionTime() {
    return Math.abs(this._currentFloor - this._destFloor) * this._floorMoveTime + this._stoppingTime;
  }

  startTask() {
    console.log('-------task started-------')
    this._taskStarted = true;
    this._interval = setInterval(()=> {
      this.updateCurrentFloor();
      if(this._currentFloor === this._destFloor) {
        clearInterval(this._interval);
        this.events.broadcast('taskArrivedToDest');
        setTimeout(()=> {
          this._onTaskEnd();
        },this._stoppingTime * 1000)
      }
    },this._floorMoveTime * 1000);
  }

  updateCurrentFloor() {
    if(this._currentFloor > this._destFloor) {
      this._currentFloor--;
    } else if(this._currentFloor < this._destFloor) {
      this._currentFloor++;
    } else {
      return;
    }
    this.events.broadcast('currentFloorUpdated',this._currentFloor);
    console.log('-------current floor: '+this._currentFloor+'-------')
  }

  _onTaskEnd() {
    this.events.broadcast('taskEnded',this);
    console.log('-------task ended-------')
    this._taskEnded = true;
  }

}
