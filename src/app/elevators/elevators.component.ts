import { Component, OnInit } from '@angular/core';
import {ElevatorsService} from '../services/elevators.service';
import ElevatorObj from '../objects/elevatorObj';
import AppConstants from '../constants';

@Component({
  selector: 'elevators',
  templateUrl: './elevators.component.html',
  styleUrls: ['./elevators.component.scss'],
  providers: [ElevatorsService]
})

export class ElevatorsComponent implements OnInit {

  elevatorsJson: any[];
  elevatorsServiceEvents: any;

  constructor(protected elevatorsService: ElevatorsService) {
    this.elevatorsServiceEvents = elevatorsService.getEvents();
    this.elevatorsServiceEvents.on('elevatorsChanged',this.onElevatorsChanged.bind(this))
    this.elevatorsServiceEvents.on('taskArrivedToDest',this.onTaskArrivedToDest.bind(this))
  }

  ngOnInit() {
    this.elevatorsJson = this.elevatorsService.getElevatorsJson();
  }

  onElevatorsChanged(elvatorsJson) {
    this.elevatorsJson = elvatorsJson;
  }

  onTaskArrivedToDest() {
    this._playDing();
  }

  _playDing() {
    let audio = new Audio(AppConstants.ASSETS_URL+'ding.mp3');
    audio.play();
  }

}
