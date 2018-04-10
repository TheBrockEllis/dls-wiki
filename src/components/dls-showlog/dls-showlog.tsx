import { Component, Prop, State, Element } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import mixpanel from 'mixpanel-browser';

@Component({
  tag: 'dls-showlog',
  styleUrl: 'dls-showlog.scss'
})
export class DLSShowlog {
  @Element() el: Element;

  @Prop({ context: 'isServer' }) private isServer: boolean;
  @Prop() history: RouterHistory;
  @State() podcasts:any;

  constructor(){
    if (!this.isServer) {
      this.fetchLogs();
    }
  }

  componentDidLoad(){
    mixpanel.init("d8de3b7825c0f49e324a6f164bb34793");
    mixpanel.track('Showlog');
  }

  goBack(){
    this.history.goBack();
  }

  fetchLogs(){
    fetch('https://crossorigin.me/https://www.espn.com/espnradio/feeds/rss/podcast.xml?id=9941853').then( (results) => {
      return results.text();
    }).then( xmlText => {
      // console.log(xmlText);
      var parser = new DOMParser();
      var doc = parser.parseFromString(xmlText, "application/xml");
      // console.log(doc);

      this.podcasts = doc.querySelectorAll('item');
      // console.log(typeof this.podcasts, this.podcasts);
    });
  }

  render() {
    let displayJsx = [];
    let tmpCollection: any[] = [];
    let lastDay;

    if(this.podcasts && this.podcasts.length > 0){
      [].forEach.call(this.podcasts, function(podcast, index) {
        let pubDate = new Date(podcast.querySelector('pubDate').textContent);

        if(lastDay != pubDate.getDay() && index != 0){

          // create a component from the current list
          // console.log('creating component from tmpcollection', tmpCollection);
          displayJsx.push( <dls-podcast date={pubDate} podcasts={tmpCollection} /> );

          // clear out the tmpCollection
          tmpCollection = [];
        }

        // reset day that we're tracking
        lastDay = pubDate.getDay();

        // add this to our collection- when we're done with the day, we'll post a component with all of these podcasts
        tmpCollection.push(podcast);
      })
    }

    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='secondary'>
            <ion-buttons slot='start'>
              <ion-button icon-only onClick={this.goBack.bind(this)}>
                Back
              </ion-button>
            </ion-buttons>

            <ion-title>Daily Show Log</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          {displayJsx}
        </ion-content>

      </ion-page>
    );
  }

}
