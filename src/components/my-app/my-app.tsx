import '@ionic/core';
import '@stencil/core';
import '@stencil/router'
import { Component } from '@stencil/core';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.scss'
})
export class MyApp {

  render() {
    return (
      <ion-app>
        <main>

          <stencil-router>
            <stencil-route url='/' component='app-home' exact={true} />
            <stencil-route url='/twitter' component='dls-twitter' />
            <stencil-route url='/soundboard' component='dls-soundboard' />
            <stencil-route url='/showlog' component='dls-showlog' />
            <stencil-route url='/timeline' component='dls-timeline' />
            <stencil-route url='/page/:slug' component='app-page' />
          </stencil-router>

        </main>
      </ion-app>
    );
  }
}
