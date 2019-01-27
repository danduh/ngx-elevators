import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { selectElevatorsIDs } from 'app/store';
import { distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
    selector: 'app-elevators',
    templateUrl: './elevators.component.html',
    styleUrls: ['./elevators.component.scss']
})

export class ElevatorsComponent implements OnInit {
    elevators$: Observable<any>;

    constructor(private store: Store<any>) {
    }

    ngOnInit() {
        this.elevators$ = this.store
            .pipe(
                select(selectElevatorsIDs),
                distinctUntilChanged(),
                tap(console.log)
            );
    }
}
