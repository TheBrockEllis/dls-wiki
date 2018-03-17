import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {
  @Prop() history: RouterHistory;

  /* We can load any 'static' pages here, before we load pages from Wordpress */
  @State() pages: any[] = [
    {
      title: 'Daily Show Log',
      link: '/showlog'
    },
    {
      title: 'Twitter Polls',
      link: '/twitter'
    },
  ];

  componentDidLoad(){
    this.getPages();
  }

  getPages(){
    fetch('https://admin.dlswiki.com/wp-json/wp/v2/pages')
    .then(function(response) {
      return response.json();
    })
    .then( pages => {
      pages.map( page => {
        page.title = page.title.rendered;
        page.link = `/page/${page.slug}`;
      });

      this.pages = [...this.pages, ...pages];
    });
  }

  render() {

    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='dark'>
            <ion-title>Dan Lebatard Show Wiki</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <ion-list>

          {
            this.pages.map( page => {
              return (
                <dls-button page={page} history={this.history}></dls-button>
              )
            })
          }

          </ion-list>
        </ion-content>
      </ion-page>
    );
  }
}
