import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widtype: string;
  widText: string;
  size: string;
  errorFlag: boolean;
  errMsg: string;
  widgetRet: {};
  widgetNew: {};
  widgetExists: boolean;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.errorFlag = false;
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['userId'];
          this.websiteId = params['websiteId'];
          this.pageId = params['pageId'];
          this.widgetId = params['widgetId'];
          this.widtype = params['widtype'];
          // this.widgetRet = this.widgetService.findWidgetById(this.wgid);
          this.widgetService.findWidgetById(this.widgetId).subscribe((widget: any) => {
            this.widgetRet = widget;
            // if (this.widgetRet !== null) {
            if (this.widgetRet) {
              this.widText = this.widgetRet['text'];
              this.size = this.widgetRet['size'];
              this.widgetExists = true;
            } else {
              this.widText = '';
              this.size = '';
              this.widgetExists = false;
            }
          });
        }
      );
  }

  createEditHeader() {
    if (this.widText === '' || this.size === '') {
      this.errMsg = 'Enter all values'
      this.errorFlag = true;
    } else if (this.widgetRet) {
      const widgetNew = {
        _id: this.widgetId,
        widgetType: 'HEADING',
        pageId: this.pageId,
        size: this.size,
        text: this.widText
      };
      this.widgetService
        .updateWidget(this.widgetId, widgetNew)
        .subscribe((widgets: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    } else {
      this.widgetExists = false;
      this.widgetNew = {
        widgetType: 'HEADING', pageId: this.pageId, size: this.size, text: this.widText
      };
      this.widgetService.createWidget(this.pageId, this.widgetNew)
        .subscribe((widgets: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    }
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId)
      .subscribe((widgets: any) => {
        this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
      });
  }
}
