import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { utc } from 'moment';
import { Notice } from 'src/app/components/list-announcement/list-announcement.component';

const GET_NOTICE = gql`
  query GetNotice($id: Int!) {
    getNotice(id: $id) {
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
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public notice!: Notice;

  constructor(private apollo: Apollo, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    let id = parseInt(
      this.activatedRoute.snapshot.paramMap.get('id') as string
    );
    this.apollo
      .watchQuery({
        query: GET_NOTICE,
        variables: {
          id,
        },
      })
      .valueChanges.subscribe((result: any) => {
        this.notice = result?.data?.getNotice;
      });
  }

  dateFormat(date: Date) {
    return utc(date).fromNow();
  }
}
