import {Component, OnInit} from '@angular/core';
import {ElevatorsService} from '../services/elevators.service';
import AppConstants from '../constants';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs/internal/Observable';
import {selectAll, selectAllElevators, selectElevatorsIDs, selectElevatorsTotal} from 'app/store';
import {distinctUntilChanged, filter, map, mergeMap, tap} from 'rxjs/operators';

@Component({
    selector: 'elevators',
    templateUrl: './elevators.component.html',
    styleUrls: ['./elevators.component.scss'],
    providers: [ElevatorsService]
})

export class ElevatorsComponent implements OnInit {
    elevators$: Observable<any>;
    elevatorsJson: any[];
    elevatorsServiceEvents: any;

    constructor(protected elevatorsService: ElevatorsService,
                private store: Store<any>) {
    }

    ngOnInit() {
        this.elevators$ = this.store
            .pipe(
                select(selectElevatorsIDs),
                distinctUntilChanged(),
                tap(console.log)
            );

        this.elevatorsJson = this.elevatorsService.getElevatorsJson();
    }

    updateElevatorsList() {

    }

    onElevatorsChanged(elvatorsJson) {
        this.elevatorsJson = elvatorsJson;
    }

    onTaskArrivedToDest() {
        this._playDing();
    }

    _playDing() {
        let audio = new Audio(AppConstants.ASSETS_URL + 'ding.mp3');
        audio.play();
    }

}
