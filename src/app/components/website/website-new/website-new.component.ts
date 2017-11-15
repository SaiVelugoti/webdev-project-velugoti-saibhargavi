import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {
  @ViewChild('f') webCreateForm: NgForm;
  userId: string;
  wid: string;
  websiteName: string;
  webDescription: string;
  websites = [{}];
  errorFlag: boolean;
  errorMsg: string;
  website: any;
  newWebId: string;
  @ViewChild('f') webeditForm: NgForm;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private websiteService: WebsiteService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['userId'];
        this.websiteService.findWebsitesByUser(this.userId).subscribe((websites: any) => {
          this.websites = websites;
        });
      }
    );
  }

  createWebsite() {
    if (this.webCreateForm.value.websiteName === '' && this.webCreateForm.value.webDescription === '') {
      this.router.navigate(['/user/', this.userId, 'website']);
    } else if (this.webCreateForm.value.websiteName !== '' && this.webCreateForm.value.webDescription !== '') {
      const web = {
        _id: this.newWebId,
        name: this.webCreateForm.value.websiteName,
        developerId: this.userId,
        description: this.webCreateForm.value.webDescription
      };
      this.websiteService.createWebsite(this.userId, web).subscribe((site: any) => {
        this.router.navigate(['/user', this.userId, 'website']);
      });
    } else {
      this.errorMsg = 'Enter both name and description';
      this.errorFlag = true;
    }
  }
}
