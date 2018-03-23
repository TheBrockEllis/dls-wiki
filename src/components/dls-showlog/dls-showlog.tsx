import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'dls-showlog',
  styleUrl: 'dls-showlog.scss'
})
export class DLSShowlog {

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
