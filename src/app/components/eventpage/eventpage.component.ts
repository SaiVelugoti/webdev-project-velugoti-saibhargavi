import {Component, OnInit} from '@angular/core';
import {EventService} from '../../services/event.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.css']
})
export class EventPageComponent implements OnInit {

  location: string;
  eventsFound: [{}];
  eventsExists: boolean;
  noEventsRetrieved: boolean;
  userId: string;
  eventsForUser: any;

  constructor(private eventService: EventService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.eventsExists = false;
    this.noEventsRetrieved = false;
    this.activatedRoute.params
      .subscribe((params: any) => {
        this.userId = params['userId'];
        this.eventService.findEventsInterested(this.userId)
          .subscribe((eventsInt: any) => {
            this.eventsForUser = eventsInt;
          });
      });
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

  // createWebsite() {
  //   if (this.webCreateForm.value.websiteName === '' && this.webCreateForm.value.webDescription === '') {
  //     this.router.navigate(['/user/', this.userId, 'website']);
  //   } else if (this.webCreateForm.value.websiteName !== '' && this.webCreateForm.value.webDescription !== '') {
  //     const web = {
  //       _id: this.newWebId,
  //       name: this.webCreateForm.value.websiteName,
  //       developerId: this.userId,
  //       description: this.webCreateForm.value.webDescription
  //     };
  //     this.websiteService.createWebsite(this.userId, web).subscribe((site: any) => {
  //       this.router.navigate(['/user', this.userId, 'website']);
  //     });
  //   } else {
  //     this.errorMsg = 'Enter both name and description';
  //     this.errorFlag = true;
  //   }
  // }
  //
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
