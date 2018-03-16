import { Component, State } from '@stencil/core';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {
  @State() pages: any[] = [];

  componentDidLoad(){
    this.getPages();
  }

  getPages(){
    fetch('http://www.sharproot.com/wp-json/wp/v2/pages')
    .then(function(response) {
      return response.json();
    })
    .then( pages => {
      this.pages = [...this.pages, ...pages];;
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

          { console.log(this.pages) }

          {
            this.pages.map( (page) => {
              console.log("This is a page", page);
              return (
                <stencil-route-link url={page.slug}>
                  <ion-button>
                    { page.title.rendered }
                  </ion-button>
                </stencil-route-link>
              )
            })
          }


        </ion-content>
      </ion-page>
    );
  }
}
