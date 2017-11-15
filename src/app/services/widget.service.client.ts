import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()

export class WidgetService {
  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {
  }
  createWidget(pageId: string, widget: any) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this._http.post(url, widget)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWidgetsByPageId(pageId) {
    const url = this.baseUrl + '/api/page/' + pageId + '/widget';
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findWidgetById(widgetId) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateWidget(widgetId, widget) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this._http.put(url, widget)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteWidget(widgetId) {
    const url = this.baseUrl + '/api/widget/' + widgetId;
    return this._http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }
}
