import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Apollo, gql } from 'apollo-angular';
import { utc } from 'moment';
import { AuthService } from 'src/app/services/auth.service';

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
  isAuthenticated = false;

  constructor(
    private apollo: Apollo,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkAuth();
  }

  isIos() {
    const win = window as any;
    return win && win.Ionic && win.Ionic.mode === 'ios';
  }

  dateFormat(date: Date) {
    return utc(date).fromNow();
  }

  async presentActionSheet(
    noticeId: number,
    router = this.router,
    alertCtrl = this.alertCtrl,
    apollo = this.apollo
  ) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Manage Notice',
      // subHeader: 'Example subheader',
      buttons: [
        {
          icon: 'trash',
          text: 'Delete',
          role: 'destructive',
          async handler() {
            console.log(noticeId);
            const alert = await alertCtrl.create({
              header: 'Delete',
              subHeader: 'Are you sure?',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel',
                  handler: () => {},
                },
                {
                  text: 'OK',
                  role: 'confirm',
                  handler: () => {
                    const DELETE_NOTICE = gql`
                      mutation DeleteNotice($deleteNoticeId: Int!) {
                        deleteNotice(id: $deleteNoticeId)
                      }
                    `;
                    apollo
                      .mutate({
                        mutation: DELETE_NOTICE,
                        variables: {
                          deleteNoticeId: noticeId,
                        },
                      })
                      .subscribe(
                        ({ data }) => {
                          console.log(data);
                          router.navigate(['/']).then(() => {
                            window.location.reload();
                          });
                        },
                        (error) => {
                          console.log(
                            'there was an error sending the query',
                            error
                          );
                        }
                      );
                  },
                },
              ],
            });

            await alert.present();
          },
        },
        {
          icon: 'pencil',
          text: 'Edit',
          handler() {
            router.navigate(['/edit', noticeId]);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
  }

  async checkAuth() {
    const token = this.authService.token;
    if (token) {
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }
}
