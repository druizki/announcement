import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}

  public isLoggedIn() {
    const token = localStorage.getItem('AUTH_TOKEN');
    return token ? true : false;
  }
}
