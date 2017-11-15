import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  @ViewChild('f') pageCreateForm: NgForm;
  userId: string;
  websiteId: string;
  pageName: string;
  description: string;
  pages = [{}];
  errorFlag: boolean;
  errorMsg: string;
  newPageId: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private pageService: PageService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['userId'];
        this.websiteId = params['websiteId'];
        this.pageService.findPageByWebsiteId(this.websiteId).subscribe((pages: any) => {
          this.pages = pages;
        });
      }
    );
  }

  createPage() {
    if (this.pageCreateForm.value.pageName === '' && this.pageCreateForm.value.description === '') {
      this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page']);
    } else if (this.pageCreateForm.value.pageName !== '' && this.pageCreateForm.value.description !== '') {
      // this.newPageId = Math.random().toString();
      const page = {
        // _id: this.newPageId,
        name: this.pageCreateForm.value.pageName,
        websiteId: this.websiteId,
        description: this.pageCreateForm.value.description
      };
      this.pageService.createPage(this.websiteId, page).subscribe((pages: any) => {
        this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page']);
      });
    } else {
      this.errorMsg = 'Enter both name and description';
      this.errorFlag = true;
    }
  }
}
