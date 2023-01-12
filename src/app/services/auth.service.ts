import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';

const LOGIN = gql`
  query AuthenticateUser($email: String!, $password: String!) {
    authenticateUser(email: $email, password: $password) {
      token
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  token = '';

  constructor(private apollo: Apollo, private router: Router) {
    this.loadToken();
  }

  async loadToken() {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(credentials: object) {
    this.apollo
      .watchQuery({
        query: LOGIN,
        variables: credentials,
      })
      .valueChanges.subscribe((result: any) => {
        const token = result.data.authenticateUser.token;
        localStorage.setItem('AUTH_TOKEN', token);
        this.isAuthenticated.next(true);
        this.router.navigateByUrl('/').then(() => {
          window.location.reload();
        });
      });

    // return this.http.post(`https://reqres.in/api/login`, credentials).pipe(
    // 	map((data: any) => data.token),
    // 	switchMap((token) => {
    // 		return from(Storage.set({ key: TOKEN_KEY, value: token }));
    // 	}),
    // 	tap((_) => {
    // 		this.isAuthenticated.next(true);
    // 	})
    // );
  }

  logout(): void {
    this.isAuthenticated.next(false);
    return localStorage.removeItem('AUTH_TOKEN');
  }
}
