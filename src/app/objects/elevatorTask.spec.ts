/**
 * Created by itay on 01/07/17.
 */
import ElevatorTask from './elevatorTask';
var task: ElevatorTask;
const stoppingTime = 2;
const floorMoveTime = 0.5;
const sourceFloor = 1;
const destFloor = 5;
const startingTime = 0;

describe('ElevatorObj', () => {
  beforeEach(() => {
    task = new ElevatorTask(1,stoppingTime,floorMoveTime,sourceFloor,destFloor,startingTime);
  });

  it('should create new elevator object with stopping time, floor move time, current floor', () => {
    expect(task).toBeTruthy();
  });

  it('should calculate the completion time', () => {
    let completionTime = Math.abs(sourceFloor-destFloor) * floorMoveTime + stoppingTime;
    expect(task.calculateCompletionTime()).toEqual(completionTime);
  });

  // it('should update the current floor', () => {
  //   task.startTask();
  //   setTimeout(()=> {
  //     expect(task.getCurrentFloor()).toEqual(sourceFloor+1);
  //   },floorMoveTime)
  // });

});
