import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

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
  text: string;
  rows: string;
  placeholder: string;
  name: string;
  formatted: boolean;

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
              this.text = this.widgetRet['text'];
              this.rows = this.widgetRet['rows'];
              this.formatted = this.widgetRet['formatted'];
              this.placeholder = this.widgetRet['placeholder'];
              this.name = this.widgetRet['name'];
              this.widgetExists = true;
            } else {
              this.text = '';
              this.rows = '';
              this.formatted = false;
              this.placeholder = '';
              this.name = '';
              this.widgetExists = false;
            }
          });
        }
      );
  }

  createEditText() {
    if (this.text === '' || this.rows === '') {
      this.errMsg = 'Enter all values'
      this.errorFlag = true;
    } else if (this.widgetRet) {
      const widgetNew = {
        _id: this.widgetId,
        widgetType: 'TEXT',
        pageId: this.pageId,
        rows: this.rows,
        text: this.text,
        name: this.name,
        placeholder: this.placeholder,
        formatted: this.formatted
      };
      this.widgetService
        .updateWidget(this.widgetId, widgetNew)
        .subscribe((widgets: any) => {
          this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
        });
    } else {
      this.widgetExists = false;
      this.widgetNew = {
        widgetType: 'TEXT', pageId: this.pageId, rows: this.rows,
        text: this.text, formatted: this.formatted, placeholder: this.placeholder, name: this.name
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
