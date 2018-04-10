import '@ionic/core';
import '@stencil/core';
import '@stencil/router'
import { Component, Prop } from '@stencil/core';
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

            <stencil-route url='/showlog' component='dls-showlog'>
            </stencil-route>

            <stencil-route url='/timeline' component='dls-timeline'>
            </stencil-route>

            <stencil-route url='/page/:slug' component='app-page'>
            </stencil-route>

          </stencil-router>

        </main>
      </ion-app>
    );
  }
}
