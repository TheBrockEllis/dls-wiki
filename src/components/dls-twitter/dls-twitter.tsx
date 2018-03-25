import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import mixpanel from 'mixpanel-browser';

@Component({
  tag: 'dls-twitter',
  styleUrl: 'dls-twitter.scss'
})
export class DLSTwitter {

  @Prop() history: RouterHistory;

  componentDidLoad(){
    mixpanel.init("d8de3b7825c0f49e324a6f164bb34793");
    mixpanel.track('Twitter');
  }

  goBack(){
    this.history.goBack();
  }

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='secondary'>
            <ion-buttons>
              <ion-button icon-only onClick={this.goBack.bind(this)}>
                Back
              </ion-button>
            </ion-buttons>

            <ion-title>@LebatardShow</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <h1>Guillermo, put it on the polls!</h1>
          <p>This page will eventually be where we embed all of the latest twitter polls and results. End goal would be to get push notifications sent to your phone every time a new poll is added to @LebatardShow</p>
        </ion-content>
      </ion-page>
    );
  }

}
