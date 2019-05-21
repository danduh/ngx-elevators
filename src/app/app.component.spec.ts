import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { ElevatorsComponent } from './elevators/elevators.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { FloorsComponent } from './floors/floors.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                ElevatorsComponent,
                ElevatorComponent,
                FloorsComponent
            ],
        })
            .compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

});
