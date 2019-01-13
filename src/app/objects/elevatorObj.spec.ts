/**
 * Created by itay on 01/07/17.
 */
import ElevatorObj from './elevatorObj';
var elevator: ElevatorObj;
const stoppingTime = 2;
const floorMoveTime = 0.5;
const currentFloor = 1;

describe('ElevatorObj', () => {
  beforeEach(() => {
    elevator = new ElevatorObj(1,stoppingTime,floorMoveTime,currentFloor);
  });

  it('should create new elevator object with stopping time, floor move time, current floor', () => {
    expect(elevator).toBeTruthy();
    expect(elevator.getStoppingTime()).toEqual(stoppingTime);
  });

  it('should create a new task', () => {
    let floorNumber = 5;
    let task = elevator._createNewTask(floorNumber,1);
    expect(task.getSourceFloor()).toEqual(currentFloor);
    expect(task.getDestFloor()).toEqual(5);
    floorNumber = 3;
    elevator.setTasks([task]);
    let task2 = elevator._createNewTask(floorNumber,2);
    expect(task2.getSourceFloor()).toEqual(5);
    expect(task2.getDestFloor()).toEqual(3);
  });

  it('add new task', () => {
    let floorNumber = 5;
    elevator.addTask(floorNumber,1);
    expect(elevator.getTasks().length).toEqual(1);
  });

  it('add should return the destination floor correctly', () => {
    expect(elevator.getDestFloor()).toEqual(currentFloor);
    let floorNumber = 5;
    let id = 1;
    elevator.addTask(floorNumber,id);
    expect(elevator.getDestFloor()).toEqual(5);
  });

  it('should calculate the completion time correctly', () => {
    expect(elevator.calculateCompletionTime()).toEqual(0);
    elevator.addTask(5,1);
    elevator.addTask(3,2);
    let completionTime = Math.abs(currentFloor-5) * floorMoveTime + stoppingTime;
    completionTime += Math.abs(3-5) * floorMoveTime + stoppingTime;
    expect(elevator.calculateCompletionTime()).toEqual(completionTime);
  });

  it('should calculate the completion time + new potential task', () => {
    elevator.addTask(5,1);
    let completionTime = Math.abs(currentFloor-5) * floorMoveTime + stoppingTime;
    completionTime += Math.abs(3-5) * floorMoveTime + stoppingTime;
    expect(elevator.calculateCompletionTimeForPotentialTask(3)).toEqual(completionTime);
  });

  it('should add and remove task', () => {
    let task = elevator.addTask(5,1);
    expect(elevator.getTasks().length).toEqual(1);
    elevator.endTask(task);
    expect(elevator.getTasks().length).toEqual(0);

  });



});
