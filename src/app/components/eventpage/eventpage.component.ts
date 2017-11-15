import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service.client';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.css']
})
export class EventPageComponent implements OnInit {

  location: string;
  eventsFound: [{}];
  eventsExists: boolean;

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.eventsExists = false;
  }

  searchEvents() {
    this.eventService.findEventsByLocation(this.location)
      .subscribe((eventsForLoc: any) => {

          if (eventsForLoc) {
            this.eventsExists = true;
            console.log(eventsForLoc.events);
            console.log(eventsForLoc.events.event);
            this.eventsFound = eventsForLoc.events.event;
            console.log(eventsForLoc['events']);
          }
        }
      );

  }
}
