import { Component, Prop, State } from '@stencil/core';
import { MatchResults, RouterHistory } from '@stencil/router';

@Component({
  tag: 'app-page',
  styleUrl: 'app-page.scss'
})
export class AppPage {

  @Prop() match: MatchResults;
  @Prop() history: RouterHistory;

  @State() page: any;

  componentWillLoad(){
    this.getPage();
  }

  getPage(){
    fetch(`https://admin.dlswiki.com/wp-json/wp/v2/pages/${this.history.location.state.id}`)
    .then(function(response) {
      return response.json();
    })
    .then( page => {
      console.log(page);
      this.page = {...this.page, ...page};
    });
  }

  goBack(){
    this.history.goBack();
  }

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='primary'>
            <ion-buttons>
              <ion-button icon-only onClick={this.goBack.bind(this)}>
                Back
              </ion-button>
            </ion-buttons>

            <ion-title innerHTML={this.history.location.state.title}></ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <div innerHTML={this.page ? this.page.content.rendered : ''}></div>
        </ion-content>
      </ion-page>
    );
  }
}
