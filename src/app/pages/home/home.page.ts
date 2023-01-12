import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { filter, map, take } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Notice } from 'src/app/components/list-announcement/list-announcement.component';
import { AuthService } from 'src/app/services/auth.service';

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
  isAuthenticated = false;
  token = '';
  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchNotices();
    this.checkAuth();
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

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

  async checkAuth() {
    // const token = localStorage.getItem('AUTH_TOKEN');
    const token = this.authService.token;
    if (token) {
      this.token = token;
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }

    // this.authService.isAuthenticated.pipe(
    //   filter((val) => val !== null),
    //   take(1),
    //   map((isAuthenticated) => {
    //     this.isAuthenticated = isAuthenticated;
    //     this.token = this.authService?.token;
    //   })
    // );

    console.log(this.isAuthenticated, this.token);
  }
}
