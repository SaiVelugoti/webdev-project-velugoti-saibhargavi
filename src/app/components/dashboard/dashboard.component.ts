import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../services/event.service.client';
import {UserService} from '../../services/user.service.client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  regUserId: string;
  usersFollowing: [{}];
  followedBy: [{}];
  eventsInterestedIn: [{}];
  otherUsers: [{}];

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private eventService: EventService, private userService: UserService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: any) => {
        this.regUserId = params['userId'];
        this.userService.findUserById(this.regUserId).subscribe((user: any) => {
          this.followedBy = user.followedBy;
        });
        this.userService.findUserById(this.regUserId).subscribe((users: any) => {
          this.usersFollowing = users.followingUsers;
        });
        this.userService.findUsers().subscribe((users: any) => {
          this.otherUsers = users;
        });
        this.eventService.findEventsInterested(this.regUserId).subscribe((eventsInterested: any) => {
          this.eventsInterestedIn = eventsInterested;
        });
      }
    );
  }

  addToFollow(userId) {
    this.userService.addUserToFollow(this.regUserId, userId).subscribe((response: any) => {
        // window.location.reload();
        // this.router.navigate(['/user', this.regUserId, 'dashboard']);
      }
    );
    this.userService.addUserToFollowedBy(this.regUserId, userId).subscribe((response: any) => {
      // window.location.reload();
      // this.router.navigate(['/user', this.regUserId, 'dashboard']);
    });
    window.location.reload();

  }

  unFollow(userId) {
    this.userService.removeUserFromFollow(this.regUserId, userId).subscribe((response: any) => {
        // window.location.reload();
        // this.router.navigate(['/user', this.regUserId, 'dashboard']);
      }
    );
    this.userService.removeUserFromFollowedBy(this.regUserId, userId).subscribe((response: any) => {
    });
    window.location.reload();
  }

  removeFromWishList(eveId) {
    this.eventService.removeEveFrmList(this.regUserId, eveId).subscribe((response: any) => {
      window.location.reload();
    });
  }
}
