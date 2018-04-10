import '@ionic/core';
import '@stencil/core';
import '@stencil/router'
import { Component, Prop, Listen } from '@stencil/core';
import { ToastController } from '@ionic/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  componentWillLoad(){
  }

  componentDidLoad() {
    /*
      Handle service worker updates correctly.
      This code will show a toast letting the
      user of the PWA know that there is a
      new version available. When they click the
      reload button it then reloads the page
      so that the new service worker can take over
      and serve the fresh content
    */
    window.addEventListener('swUpdate', () => {
      this.toastCtrl.create({
        message: 'New version available',
        showCloseButton: true,
        closeButtonText: 'Reload'
      }).then((toast) => {
        toast.present();
      });
    })
  }

  @Listen('body:ionToastWillDismiss')
  reload() {
    window.location.reload();
  }

  render() {
    return (
      <ion-app>
        <main>

          <ion-router useHash={false}>
            <ion-route url='/' component='app-home'>
            </ion-route>

            <ion-route url='/twitter' component='dls-twitter'>
            </ion-route>

            <ion-route url='/soundboard' component='dls-soundboard'>
            </ion-route>

            <ion-route url='/showlog' component='dls-showlog'>
            </ion-route>

            <ion-route url='/timeline' component='dls-timeline'>
            </ion-route>

            <ion-route url='/page/:slug' component='app-page'>
            </ion-route>

            <ion-nav></ion-nav>
          </ion-router>

        </main>
      </ion-app>
    );
  }
}
