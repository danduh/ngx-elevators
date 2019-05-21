import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElevatorsComponent } from './elevators.component';
import { ElevatorComponent } from './../elevator/elevator.component';

describe('ElevatorsComponent', () => {
    let component: ElevatorsComponent;
    let fixture: ComponentFixture<ElevatorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ElevatorsComponent,
                ElevatorComponent
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ElevatorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
