import {Injectable} from '@angular/core';
import * as Rx from 'rxjs';
import {from} from 'rxjs/internal/observable/from';

@Injectable()
export class EventsService {
  listeners: any;
  eventsSubject: any;
  events: any;

  constructor() {
    this.listeners = {};
    this.eventsSubject = new Rx.Subject();

    this.events = from(this.eventsSubject);

    this.events.subscribe(
      ({name, args}) => {
        if (this.listeners[name]) {
          for (let listener of this.listeners[name]) {
            listener(...args);
          }
        }
      });
  }

  on(name, listener) {
    if (!this.listeners[name]) {
      this.listeners[name] = [];
    }

    this.listeners[name].push(listener);
  }

  broadcast(name, ...args) {
    this.eventsSubject.next({
      name,
      args
    });
  }
}
