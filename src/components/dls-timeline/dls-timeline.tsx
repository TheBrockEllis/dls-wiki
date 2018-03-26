import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import mixpanel from 'mixpanel-browser';

@Component({
  tag: 'dls-timeline',
  styleUrl: 'dls-timeline.scss'
})
export class DLSTimeline {

  @Prop() history: RouterHistory;
  @State() events:any[] = [];

  componentWillLoad(){
    this.getEvents();
  }

  componentDidLoad(){
    mixpanel.init("d8de3b7825c0f49e324a6f164bb34793");
    mixpanel.track('Timeline');
  }

  goBack(){
    this.history.goBack();
  }

  getEvents(){
    fetch(`https://admin.dlswiki.com/wp-json/wp/v2/posts?category=timeline&order=asc`)
    .then(function(response) {
      return response.json();
    })
    .then( events => {
      this.events = events.map( (event) => {
        let dateObj = new Date(event.date);
        event.displayDate = dateObj.toLocaleDateString();
        return event;
      });
    });
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

          {
            this.events.map( (event) => {
              return (
                <section class="cd-timeline js-cd-timeline">
                  <div class="cd-timeline__container">

                    <div class="cd-timeline__block js-cd-block">

                       <div class="cd-timeline__img cd-timeline__img--picture js-cd-img">
                          <img src={event.timeline_image_source[0]} alt='Event Featured Image' />
                       </div>

                       <div class="cd-timeline__content js-cd-content">
                          <h2>{event.title.rendered}</h2>
                          <p innerHTML={event.content.rendered}></p>
                          <a href={event.timeline_read_more[0]} class="cd-timeline__read-more">Read more</a>
                          <span class="cd-timeline__date">{event.timeline_date}</span>
                       </div>

                    </div>

                  </div>
                </section>
              )
            })
          }

        </ion-content>
      </ion-page>
    );
  }

}
