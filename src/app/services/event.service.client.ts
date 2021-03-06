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


  findEventsInterested(userId) {
    const url = this.baseUrl + '/api/user/' + userId + '/dashboard/intrstEvents';
    return this._http.get(url).map((response: Response) => {
      return response.json();
    });
  }


  findEventsByLocation(location) {
    const apiKey = environment.api_Key;
    // if (process.env.API_KEY_EVENTFUL) {
    //   apiKey = process.env.API_KEY_EVENTFUL;
    // }
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.eventful.com/json/events/search/?location=' + location + '&app_key=' + apiKey;
    const url = proxyURL + apiURL;
    return this._http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  findEventById(eventId) {
    const apiKey = environment.api_Key;
    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const apiURL = 'http://api.eventful.com/json/events/get?id=' + eventId + '&app_key=' + apiKey;
    const url = proxyURL + apiURL;
    return this._http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  addEventToIntList(userId, event) {
    const url = this.baseUrl + '/api/user/' + userId + '/eventAdd';
    return this._http.post(url, event).map((response: Response) => {
      return response;
      // return response.json();
    });
  }

  removeEveFrmList(userId, eveId) {
    const url = this.baseUrl + '/api/user/' + userId + '/removeEvent/' + eveId;
    return this._http.delete(url).map((response: Response) => {
      return response;
    });
  }

  // Server Call
  // findEventsByLocation(location) {
  //   alert('IN Client');
  //   const url = this.baseUrl + '/api/events/location/' + location;
  //   return this._http.get(url).map((response: Response) => {
  //     return response.json();
  //   });
  // }
}

