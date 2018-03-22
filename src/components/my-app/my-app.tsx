import '@ionic/core';
import '@stencil/core';
import '@stencil/router'
import { Component, Prop, Listen } from '@stencil/core';
import { ToastController } from '@ionic/core';
import firebase from 'firebase';
import 'firebase/storage'

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  @Prop({ connect: 'ion-toast-controller' }) toastCtrl: ToastController;

  componentWillLoad(){
    this.configureFirebase();
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

  configureFirebase(){
    var config = {
      apiKey: "AIzaSyCgBUYMD685kMZ8Uc3gNqt4jgACtcMAqK8",
      authDomain: "dlswiki-showkiller.firebaseapp.com",
      databaseURL: "https://dlswiki-showkiller.firebaseio.com",
      projectId: "dlswiki-showkiller",
      storageBucket: "dlswiki-showkiller.appspot.com",
      messagingSenderId: "535675309627"
    };

    firebase.initializeApp(config);
  }

  @Listen('body:ionToastWillDismiss')
  reload() {
    window.location.reload();
  }

  render() {
    return (
      <ion-app>
        <main>
          <stencil-router>
            <stencil-route url='/' component='app-home' exact={true}>
            </stencil-route>

            <stencil-route url='/twitter' component='dls-twitter'>
            </stencil-route>

            <stencil-route url='/soundboard' component='dls-soundboard'>
            </stencil-route>

            <stencil-route url='/page/:slug' component='app-page'>
            </stencil-route>
          </stencil-router>
        </main>
      </ion-app>
    );
  }
}
