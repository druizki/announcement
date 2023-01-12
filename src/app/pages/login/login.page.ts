import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AuthService } from 'src/app/services/auth.service';

const LOGIN = gql`
  query AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm = {
    email: '',
    password: '',
  };

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  async login() {
    await this.authService.login(this.loginForm);

    // this.apollo
    //   .watchQuery({
    //     query: LOGIN,
    //     variables: this.loginForm,
    //   })
    //   .valueChanges.subscribe((result: any) => {
    //     const token = result.data.authenticateUser.token;
    //     localStorage.setItem('AUTH_TOKEN', token);
    //     this.router.navigateByUrl('/').then(() => {
    //       window.location.reload();
    //     });
    //   });
  }
}
