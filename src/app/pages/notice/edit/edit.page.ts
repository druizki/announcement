import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
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

const UPDATE_NOTICE = gql`
  mutation createNotice($notice: NoticeUpdateInput) {
    updateNotice(notice: $notice) {
      id
      title
      content
    }
  }
`;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  id: number | undefined;
  title: string | undefined;
  content: string | undefined;
  constructor(
    private apollo: Apollo,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    let id = parseInt(
      this.activatedRoute.snapshot.paramMap.get('id') as string
    );
    this.id = id;
    this.apollo
      .watchQuery({
        query: GET_NOTICE,
        variables: {
          id,
        },
      })
      .valueChanges.subscribe((result: any) => {
        const notice = result?.data?.getNotice;
        this.title = notice.title;
        this.content = notice.content;
      });
  }

  editNotice() {
    this.apollo
      .mutate({
        mutation: UPDATE_NOTICE,
        variables: {
          notice: {
            title: this.title,
            content: this.content,
            id: this.id,
          },
        },
      })
      .subscribe(
        ({ data }) => {
          this.router.navigate(['/']);
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }
}
