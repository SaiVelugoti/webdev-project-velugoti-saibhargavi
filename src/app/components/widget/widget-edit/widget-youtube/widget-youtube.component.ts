import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {
  @ViewChild('f') ytForm: NgForm;

  userId: string;
  websiteId: string;
  pageId: string;
  widgetId: string;
  widtype: string;
  name: string;
  width: string;
  url: string;
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
          this.widgetService.findWidgetById(this.widgetId).subscribe((widget: any) => {
            this.widgetRet = widget;
            if (this.widgetRet) {
              this.url = this.widgetRet['url'];
              this.name = this.widgetRet['name'];
              this.width = this.widgetRet['width'];
              this.widgetExists = true;
            } else {
              this.url = '';
              this.name = '';
              this.width = '';
              this.widgetExists = false;
            }
          });
        }
      );
  }

  createEditYoutube() {

    if (this.name === '' || this.width === '' || this.url === '') {
      this.errMsg = 'Enter all values'
      this.errorFlag = true;
    } else if (this.widgetRet) {
      this.widgetExists = true;
      this.widgetNew = {
        _id: this.widgetId, widgetType: 'YOUTUBE', pageId: this.pageId, width: this.ytForm.value.width,
        url: this.ytForm.value.url, name: this.ytForm.value.name
      };
      this.widgetService.updateWidget(this.widgetId, this.widgetNew)
        .subscribe((widget: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    } else {
      this.widgetExists = false;
      this.widgetNew = {
        // _id: newId,
        widgetType: 'YOUTUBE', pageId: this.pageId, width: this.ytForm.value.width,
        url: this.ytForm.value.url, name: this.ytForm.value.name
      };
      this.widgetService.createWidget(this.pageId, this.widgetNew)
        .subscribe((widget: any) => {
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
