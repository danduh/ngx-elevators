import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorsComponent } from './floors.component';

describe('FloorsComponent', () => {
    let component: FloorsComponent;
    let fixture: ComponentFixture<FloorsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                FloorsComponent
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FloorsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });
});
