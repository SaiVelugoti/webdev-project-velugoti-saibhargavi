import {Component, OnInit} from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {
  userId: string;
  websiteId: string;
  pageId: string;
  pages = [{}];

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.websiteId = params ['websiteId'];
          this.pageId = params ['pageId'];
          this.pageService.findPageByWebsiteId(this.websiteId).subscribe((list: any) => {
            this.pages = list;
          });
        }
      );
  }
}
