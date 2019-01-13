import {Component, OnInit, Input, SimpleChanges} from '@angular/core';
import AppConstants from './../constants';

@Component({
    selector: 'elevator-task',
    templateUrl: './elevator-task.component.html',
    styleUrls: ['./elevator-task.component.scss']
})
export class ElevatorTaskComponent implements OnInit {
    @Input() id: number;
    @Input() taskTotalTime: number;
    @Input() taskDestFloor: number;
    public elementId: string;
    element: any;

    constructor() {
    }

    ngOnInit() {
        this.elementId = 'elevator-elevator-task-' + this.id;
        let interval = setInterval(() => {
            this.taskTotalTime -= 0.1;
            this.taskTotalTime = Number(this.taskTotalTime.toFixed(2));
            if (this.taskTotalTime < 0) {
                // this.taskTotalTime = null;
                clearInterval(interval);
            }
        }, 100);
    }

    ngAfterViewInit() {
        // this.element = document.getElementById(this.elementId);
        // this.element.style.top = this.taskDestFloor * (AppConstants.FLOOR_SIZE_IN_PX + AppConstants.FLOOR_MARGIN_IN_PX) + 'px';
    }

    ngOnChanges(changes: SimpleChanges): void {

        // if (changes['taskDestFloor']) {
        //     if (this.element) {
        //         this.element.style.top = this.taskDestFloor * (AppConstants.FLOOR_SIZE_IN_PX + AppConstants.FLOOR_MARGIN_IN_PX) + 'px';
        //     }
        // }
    }

}
