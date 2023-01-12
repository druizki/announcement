import { Component, Input, OnInit } from '@angular/core';
import { utc } from 'moment';

export interface Notice {
  id: number;
  title: string;
  desc: string;
  content: string;
  label: string;
  banner: string;
  isDraft: boolean;
  totalViews: number;
  createdAt: Date;
}

@Component({
  selector: 'app-list-announcement',
  templateUrl: './list-announcement.component.html',
  styleUrls: ['./list-announcement.component.scss'],
})
export class ListAnnouncementComponent implements OnInit {
  @Input()
  notice!: Notice;

  constructor() {}

  ngOnInit() {}

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }

  dateFormat(date: Date) {
    return utc(date).fromNow();
  }
}
