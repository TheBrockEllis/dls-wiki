import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import mixpanel from 'mixpanel-browser';

import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

@Component({
  tag: 'dls-timeline',
  styleUrl: 'dls-timeline.scss'
})
export class DLSTimeline {

  @Prop() history: RouterHistory;

  componentDidLoad(){
    mixpanel.init("d8de3b7825c0f49e324a6f164bb34793");
    mixpanel.track('Timeline');
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

            <ion-title>Evolution of the Show</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <h1>From the beginning</h1>
          <p>This page will eventually be where the entire history of the show is kept in a timeline format so folks can go back and find out about the large events in the shows history.</p>
        </ion-content>
      </ion-page>
    );
  }

}
