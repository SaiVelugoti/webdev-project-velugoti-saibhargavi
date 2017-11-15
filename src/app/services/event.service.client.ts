import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class EventService {

  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {
  }

  findEventsByLocation(location) {
    // const url = 'http://eventful.com/events?l=' + location;
    const url = 'https://api.eventful.com/json/events/search?location=' + location + '&app_key=MkD6G4ptdWk8dbPr';
    return this._http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  // findEventsByLocation(location) {
  //   const url = this.baseUrl + '/api/events/location/' + location;
  //   return this._http.get(url).map((response: Response) => {
  //   });
  // }
}

