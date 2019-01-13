import {Component, OnInit, Input, SimpleChanges, AfterViewInit, OnChanges, ViewChild, ElementRef} from '@angular/core';
import AppConstants from './../constants';
import {Elevator} from '../elevators.types';
import {select, Store} from '@ngrx/store';
import {getElevatorById} from '../store';
import {distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {ELEV} from '../store/effects';

@Component({
    selector: 'elevator',
    templateUrl: './elevator.component.html',
    styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent implements OnInit, OnChanges {
    @ViewChild('elevElem') elevElem: ElementRef;
    @Input() floor: number;
    @Input() el: Elevator;
    public position: number;

    constructor(private store: Store<any>) {
    }

    ngOnInit() {
        this.store
            .pipe(
                select(getElevatorById(), {id: this.el.id}),
                filter((el) => el.destFloor !== null),
                distinctUntilChanged((ela, elb) => ela.id !== elb.id)
            ).subscribe((el) => {
            if (el.destFloor !== el.initFloor) {
                this.sendElevator(el)
            }
        })
    }

    sendElevator(el: Elevator) {
        const runLength = (el.initFloor - el.destFloor) * ELEV.FLOOR_SIZE;
        const runTime = runLength * ELEV.RUN_TIME;
        this.elevElem.nativeElement.top = runLength + 'px';
        this.position = runLength;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['floor']) {

        }
    }

}
