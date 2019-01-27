import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { animate, animation, style } from '@angular/animations';
import { select, Store } from '@ngrx/store';
import { getElevatorById } from '../store';
import { ElevatorToBeReleased } from '../store/actions';
import { filter, map, take } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';
import { Elevator } from '../app.types';
import { FLOOR_SIZE, ELEVATOR_RUN_TIME, ELEVATOR_IDLE_TIME } from '../app.constants';

animation([
    style({
        top: '{{ top }}',
    }),
    animate('{{ time }}')
]);

@Component({
    selector: 'app-elevator',
    templateUrl: './elevator.component.html',
    styleUrls: ['./elevator.component.scss'],
})
export class ElevatorComponent implements OnInit {
    @ViewChild('elevElem') elevElem: ElementRef;

    @Input() floor: number;
    @Input() elId: string;

    el: Elevator;
    animation: Animation;

    private timeLeft: number;
    public subscribeTimer;

    public position = 0;

    constructor(private store: Store<any>) {
    }

    ngOnInit() {
        this.getElevatorFromStore();
        this.subscribeToElevatorChanges();
    }


    private endTime() {
        const source = interval(100);

        const abc = source

            .pipe(map(ind => ind * 100))

            .subscribe(val => {
                this.subscribeTimer = this.timeLeft - val;
                if (this.subscribeTimer <= 10) {
                    this.subscribeTimer = 0;
                    abc.unsubscribe();
                }
            });
    }

    getElevatorFromStore() {
        this.store
            .pipe(
                select(getElevatorById(), {id: this.elId}),
                take(1)
            )
            .subscribe((el) => this.el = el)
    }

    subscribeToElevatorChanges() {
        this.store
            .pipe(
                select(getElevatorById(), {id: this.elId}),
                filter(el => el.ordered === true),
            )
            .subscribe(this.sendElevator.bind(this));
    }

    sendElevator(el: Elevator) {

        const runTo = ((el.initFloor - el.destFloor) * FLOOR_SIZE) + this.position;
        const runTime = Math.abs((el.initFloor - el.destFloor) * ELEVATOR_RUN_TIME);
        // this.elevElem.nati veElement.top = runLength + 'px';

        const animeOpts = {
            duration: runTime,
            easing: 'ease-in-out',
            fill: 'forwards'
        };

        const keyframes: Keyframe[] = [
            {transform: `translate(0px, ${this.position}px)`},
            {transform: `translate(0px, ${runTo}px)`}
        ];

        this.position = runTo;
        this.animation = this.elevElem.nativeElement.animate(keyframes, animeOpts);

        this.animation.onfinish = (done) => {
            setTimeout(() => {
                el.ordered = false;
                this.store.dispatch(new ElevatorToBeReleased(el))
            }, ELEVATOR_IDLE_TIME)
        };

        this.timeLeft = el.endTime - Date.now();
        this.endTime();

    }

}
