import {Component, OnInit} from '@angular/core';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {
  userId: string;
  websiteId: string;
  pageId: string;
  widgets = [{}]
  widWidth: string;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.websiteId = params['websiteId'];
          this.pageId = params['pageId'];
          this.widgetService.findWidgetsByPageId(this.pageId)
            .subscribe((list: any) => {
              this.widgets = list;
            });
        }
      );
  }

  cleanURL(url: any) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  assignWidth(width: string) {
    this.widWidth = width;
  }
}
