import {Component, OnInit, Input, SimpleChanges, AfterViewInit, OnChanges} from '@angular/core';
import AppConstants from './../constants';

@Component({
    selector: 'elevator',
    templateUrl: './elevator.component.html',
    styleUrls: ['./elevator.component.scss']
})
export class ElevatorComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() tasks: any[]
    @Input() floor: number;
    @Input() id: number;
    public elementId: string;
    element: any;

    constructor() {
    }

    ngOnInit() {
        this.elementId = 'elevator-' + this.id;
    }

    ngAfterViewInit() {
        this.element = document.getElementById(this.elementId);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['floor']) {
            if (this.element) {
                this.element.style.top = (-this.floor) * (AppConstants.FLOOR_SIZE_IN_PX + AppConstants.FLOOR_MARGIN_IN_PX) + 'px';
            }
        }
    }

}
