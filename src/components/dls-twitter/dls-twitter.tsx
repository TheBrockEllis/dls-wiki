import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'dls-twitter',
  styleUrl: 'dls-twitter.css'
})
export class DLSTwitter {

  @Prop() history: RouterHistory;

  componentDidLoad(){
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

            <ion-title>@LebatardShow</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <h1>Guerillmo, put it on the polls!</h1>
        </ion-content>
      </ion-page>
    );
  }

}
