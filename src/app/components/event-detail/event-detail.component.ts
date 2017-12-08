import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  location: string;
  eventsFound: [{}];
  eventsExists: boolean;
  noEventsRetrieved: boolean;
  userId: string;
  eventsForUser: any;
  displayEventDetails: boolean;
  description: any;
  eventId: any;
  eventDetail: any;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.eventId = params['id'];
          this.eventService.findEventById(this.eventId)
            .subscribe((eventDetail: any) => {
              if (eventDetail) {
                this.eventDetail = eventDetail;
              }
            });
        });

    console.log('IN Init -> event detail');
    console.log(this.description);
  }

  displayEventDetail(eventFromList) {
    console.log('Entered display function');
    this.displayEventDetails = true;
    this.description = eventFromList['description'];
    console.log('In evetpage  -display', this.description);
    this.eventService.findEventById(eventFromList['id'])
      .subscribe((eventDetail: any) => {
        if (eventDetail) {
          this.description = eventDetail['description'];
        }
      });
    // window.location.reload();
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
          } else {
            this.noEventsRetrieved = true;
          }
        }
      );

  }

  addEventAsInterested(eventToAdd) {
    const eventI = {
      regUserId: this.userId,
      eventName: eventToAdd['title'],
      eventURL: eventToAdd['url'],
      eve_id: eventToAdd['id']
    };
    console.log('EventPage TS ->' + eventI);
    this.eventService.addEventToIntList(this.userId, eventI)
      .subscribe((ev: any) => {
        // this.router.navigate(['/user', this.userId, 'dashboard']);

      });

  }
}
