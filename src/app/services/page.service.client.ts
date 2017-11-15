import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class PageService {

  baseUrl = environment.baseUrl;
  api = {
    'createPage': this.createPage,
    'findPageByWebsiteId': this.findPageByWebsiteId,
    'findPageById': this.findPageById,
    'updatePage': this.updatePage,
    'deletePage': this.deletePage
  };

  constructor(private _http: Http) {
  }

  createPage(websiteId, page) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this._http.post(url, page)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPageByWebsiteId(websiteId) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findPageById(pageId) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updatePage(pageId, page) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this._http.put(url, page)
      .map((response: Response) => {
        return response.json();
      });
  }

  deletePage(pageId) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this._http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }
}
