import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

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

  constructor(private apollo: Apollo) {}

  ngOnInit() {}

  login() {
    this.apollo
      .watchQuery({
        query: LOGIN,
        variables: this.loginForm,
      })
      .valueChanges.subscribe((result: any) => {
        const token = result.data.authenticateUser.token;
        localStorage.setItem('AUTH_TOKEN', token);
      });
  }
}
