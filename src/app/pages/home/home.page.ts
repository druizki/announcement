import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Notice } from 'src/app/components/list-announcement/list-announcement.component';

const GET_NOTICES = gql`
  query GetAllNotices {
    getAllNotices {
      id
      title
      desc
      content
      label
      banner
      isDraft
      totalViews
      createdAt
    }
  }
`;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notices: any[] = [];
  loading = true;
  error: any;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.fetchNotices();
  }

  getNotices(): Notice[] {
    return this.notices;
  }

  fetchNotices(): void {
    this.apollo
      .watchQuery({
        query: GET_NOTICES,
      })
      .valueChanges.subscribe((result: any) => {
        this.notices = result?.data?.getAllNotices;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
