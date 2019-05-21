import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ElevatorsComponent } from './elevators/elevators.component';
import { ElevatorComponent } from './elevator/elevator.component';
import { FloorsComponent } from './floors/floors.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { ExpertsEffects } from './store/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';

@NgModule({
    declarations: [
        AppComponent,
        ElevatorsComponent,
        ElevatorComponent,
        FloorsComponent,
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([ExpertsEffects]),
        StoreDevtoolsModule.instrument({
            maxAge: 25, // Retains last 25 states
            // logOnly: environment.production // Restrict extension to log-only mode
        }),
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
