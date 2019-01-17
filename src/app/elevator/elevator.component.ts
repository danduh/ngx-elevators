import {Component, OnInit, Input, SimpleChanges, AfterViewInit, OnChanges, ViewChild, ElementRef, ChangeDetectorRef} from '@angular/core';
import AppConstants from './../constants';
import {Elevator} from '../elevators.types';
import {select, Store} from '@ngrx/store';
import {getElevatorById} from '../store';
import {distinctUntilChanged, filter, map, take, takeUntil} from 'rxjs/operators';
import {ELEV} from '../store/effects';
import {animate, animation, AnimationKeyframesSequenceMetadata, style} from '@angular/animations';
import {ElevatorReleased, ElevatorToBeReleased} from '../store/actions';
import {timer} from 'rxjs/internal/observable/timer';
import {interval} from 'rxjs/internal/observable/interval';

animation([
    style({
        top: '{{ top }}',
    }),
    animate('{{ time }}')
]);

@Component({
    selector: 'elevator',
    templateUrl: './elevator.component.html',
    styleUrls: ['./elevator.component.scss'],
})
export class ElevatorComponent implements OnInit, OnChanges {
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

        // this.store
        //     .pipe(
        //         select(getElevatorById(), {id: this.elId}),
        //         filter(el => el.ordered === false && el.que.length > 0),
        //     )
        //     .subscribe((el) => {
        //         console.log('edded or removed', el.que)
        //     })
    }

    sendElevator(el: Elevator) {

        const runTo = ((el.initFloor - el.destFloor) * ELEV.FLOOR_SIZE) + this.position;
        const runTime = Math.abs((el.initFloor - el.destFloor) * ELEV.RUN_TIME);
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
            }, ELEV.IDLE_TIME)
        }

        this.timeLeft = el.endTime - Date.now();
        this.endTime();

    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if (changes['floor']) {

        }
    }

}
