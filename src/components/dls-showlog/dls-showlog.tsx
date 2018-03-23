import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import mixpanel from 'mixpanel-browser';

@Component({
  tag: 'dls-showlog',
  styleUrl: 'dls-showlog.scss'
})
export class DLSShowlog {

  @Prop() history: RouterHistory;

  componentDidLoad(){
    mixpanel.init("d8de3b7825c0f49e324a6f164bb34793");
    mixpanel.track('Showlog');
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

            <ion-title>Daily Show Log</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <h1>Shockular!</h1>
          <p>This eventually will be where we host all of the major plot lines that took place during a daily show.</p>
        </ion-content>
      </ion-page>
    );
  }

}
