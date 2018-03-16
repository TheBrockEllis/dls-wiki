import { Component, Prop } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { ToastController } from '@ionic/core';

@Component({
  tag: 'app-page',
  styleUrl: 'app-page.scss'
})
export class AppPage {

  @Prop() match: MatchResults;
  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  //@State() notify: boolean;
  //@State() swSupport: boolean;

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='primary'>
            <ion-title>Ionic PWA Toolkit</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <p>
            Hello! You're trying to view the {this.match.params.slug} page.
          </p>
        </ion-content>
      </ion-page>
    );
  }
}
