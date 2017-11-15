import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {
  @ViewChild('f') webEditForm: NgForm;
  userId: string;
  websiteId: string;
  websiteName: string;
  webDescription: string;
  websites: [{}];
  errorFlag: boolean;
  errorMsg: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private websiteService: WebsiteService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['userId'];
        this.websiteId = params['websiteId'];
        // this.websites = this.websiteService.findWebsitesByUser(this.userId)
        this.websiteService.findWebsitesByUser(this.userId).subscribe((websites: any) => {
          this.websites = websites;
        });
        this.websiteService.findWebsiteById(this.websiteId).subscribe((editweb: any) => {
          // this.websiteName = editweb['name'];
          // this.webDescription = editweb['description'];
          this.websiteName = editweb.name;
          this.webDescription = editweb.description;
        });
      }
    );
  }

  updateWebsite() {
    if (this.websiteName === '' || this.webDescription === '') {
      this.errorMsg = 'Enter both name and description';
      this.errorFlag = true;
    } else {
      const web = {
        _id: this.websiteId,
        name: this.webEditForm.value.websiteName,
        developerId: this.userId,
        description: this.webEditForm.value.webDescription
      };
      this.websiteService.updateWebsite(this.websiteId, web).subscribe((websites: any) => {
        this.router.navigate(['/user', this.userId, 'website']);
      });
    }
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId).subscribe((website: any) => {
      this.router.navigate(['/user', this.userId, 'website']);
    });
  }
}
