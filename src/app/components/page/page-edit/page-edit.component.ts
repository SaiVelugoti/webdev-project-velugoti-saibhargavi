import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../../../services/page.service.client';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  @ViewChild('f') pageEditForm: NgForm;
  userId: string;
  websiteId: string;
  pageId: string;
  pageName: string;
  description: string;
  pages = [{}];
  errorFlag: boolean;
  errorMsg: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private pageService: PageService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: any) => {
        this.userId = params['userId'];
        this.websiteId = params['websiteId'];
        this.pageId = params ['pageId'];
        this.pageService.findPageByWebsiteId(this.websiteId).subscribe((pages: any) => {
          this.pages = pages;
        });
        this.pageService.findPageById(this.pageId)
          .subscribe((editpage: any) => {
            if (editpage != null) {
              this.pageName = editpage.name;
              this.description = editpage.description;
            }
          });
      }
    );
  }

  updatePage() {
    if (this.pageName === '' || this.description === '') {
      this.errorMsg = 'Enter both name and description';
      this.errorFlag = true;
    } else {
      const page = {
        _id: this.pageId,
        name: this.pageEditForm.value.pageName,
        websiteId: this.websiteId,
        description: this.pageEditForm.value.description
      };
      this.pageService.updatePage(this.pageId, page)
        .subscribe((pageVal: any) => {
          this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page']);
        });
    }
  }

  deletePage() {
    this.pageService.deletePage(this.pageId)
      .subscribe((pages: any) => {
        this.router.navigate(['/user/', this.userId, 'website', this.websiteId, 'page']);
      });
  }
}
