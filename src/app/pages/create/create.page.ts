import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const CREATE_NOTICE = gql`
  mutation createNotice($notice: NoticeInput) {
    createNotice(notice: $notice) {
      id
      title
      content
      createdAt
    }
  }
`;

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  title: string | undefined;
  content: string | undefined;
  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit() {}

  addNotice() {
    this.apollo
      .mutate({
        mutation: CREATE_NOTICE,
        variables: {
          notice: {
            title: this.title,
            content: this.content,
          },
        },
      })
      .subscribe(
        ({ data }) => {
          console.log(data);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.log('there was an error sending the query', error);
        }
      );
  }
}
