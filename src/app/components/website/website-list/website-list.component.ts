import {Component, OnInit} from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service.client';

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})

export class WebsiteListComponent implements OnInit {

  userId: String;
  websites = [{}];

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.websiteService.findWebsitesByUser(this.userId).subscribe((websites: any) => {
            this.websites = websites;
          });
        }
      );
  }
}
