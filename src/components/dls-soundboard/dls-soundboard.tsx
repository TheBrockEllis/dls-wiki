import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import mixpanel from 'mixpanel-browser';

@Component({
  tag: 'dls-soundboard',
  styleUrl: 'dls-soundboard.scss'
})
export class DLSSoundboard {

  @Prop() history: RouterHistory;
  @State() sounds:any = [];
  @State() audioTarget:string = '';

  @State() audio:HTMLAudioElement = document.createElement('audio');

  componentWillLoad(){
    this.getSounds();

    this.audio.addEventListener("canplaythrough", () => {
      this.audio.play();
    }, true);
  }

  componentDidLoad(){
    mixpanel.init("d8de3b7825c0f49e324a6f164bb34793");
    mixpanel.track(`Soundboard`);
  }

  getSounds(){
    fetch(`https://admin.dlswiki.com/wp-json/wp/v2/media?media_type=audio&per_page=50`)
    .then(function(response) {
      return response.json();
    })
    .then( sounds => {
      this.sounds = sounds;
    });
  }

  goBack(){
    this.history.goBack();
  }

  updateAudioTarget(url){
    this.audio.setAttribute('src', url);
    this.audio.load();
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

            <ion-title>Soundboard</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <h1>Thanks to <a href='https://www.twitter.com/justinspas'>@justinspas</a> for the sounds!</h1>

          <ion-grid>
            <ion-row>
            {
              this.sounds.map( (sound) => {
                return (
                  <ion-col col-6 col-sm col-md-3 col-lg-3 col-xl-3 onClick={ () => { this.updateAudioTarget(sound.source_url) }}>
                    <div id='audioFile' innerHTML={sound.title.rendered}>
                    </div>
                  </ion-col>
                )
              })
            }
            </ion-row>
          </ion-grid>

        </ion-content>
      </ion-page>
    );
  }

}
