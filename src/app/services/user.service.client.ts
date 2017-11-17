import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class UserService {

  // Asgn 6
  options: RequestOptions = new RequestOptions();
  baseUrl = environment.baseUrl;

  constructor(private _http: Http) {
  }

  findUsers() {
    const url = this.baseUrl + '/api/users/';
    return this._http.get(url).map((response: Response) => {
    });
  }

  findUsersFollowing(userId) {
    const url = this.baseUrl + '/api/user/' + userId + '/dashboard/following';
    return this._http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  findUserFollowedBy(userId) {
    const url = this.baseUrl + '/api/user/' + userId + '/dashboard/followedBy';
    return this._http.get(url).map((respoonse: Response) => {
      return respoonse.json();
    });
  }

  addUserToFollow(userId, followingId) {
    const url = this.baseUrl + '/api/user/' + userId + 'following' + followingId;
    return this._http.post(url, followingId).map((response, Response) => {
      return response.json();
    });
  }


  // Asgn 6
  register(username, password) {
    const url = 'http://localhost:3100/api/register';
    const credentials = {
      username: username,
      passwrod: password
    };
    this.options.withCredentials = true;

  }

  login() {
  }

  createUser(user: any) {
    const url = this.baseUrl + '/api/user/';
    return this._http.post(url, user)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserById(userId: string) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByUsername(username: string) {
    const url = this.baseUrl + '/api/user?username=' + username;
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  updateUser(userId, user) {
    user.id = userId;
    const url = this.baseUrl + '/api/user/' + userId;
    return this._http.put(url, user)
      .map((response: Response) => {
        return response.json();
      });
  }

  deleteUser(userId) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this._http.delete(url)
      .map((response: Response) => {
        return response.json();
      });
  }

  findUserByCredentials(username, password) {
    const url = this.baseUrl + '/api/user?username=' + username + '&password=' + password;
    return this._http.get(url)
      .map((response: Response) => {
        return response.json();
      });
  }
}
