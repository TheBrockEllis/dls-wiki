import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import mixpanel from 'mixpanel-browser';

@Component({
  tag: 'dls-soundboard',
  styleUrl: 'dls-soundboard.scss'
})
export class DLSSoundboard {

  @Prop() navigator:any = navigator;
  @State() hasShareApi:boolean = false;

  @Prop() history: RouterHistory;
  @State() sounds:any = [];
  @State() audioTarget:string = '';

  @State() audio:HTMLAudioElement = document.createElement('audio');

  componentWillLoad(){
    this.getSounds();

    if(typeof this.navigator.share !== undefined) this.hasShareApi = true;

    this.audio.addEventListener("canplaythrough", () => {
      this.audio.play();
    }, true);
  }

  componentDidLoad(){
    mixpanel.init("d8de3b7825c0f49e324a6f164bb34793");
    mixpanel.track(`Soundboard`);
  }

  getSounds(){
    fetch(`https://admin.dlswiki.com/wp-json/wp/v2/media?media_type=audio&per_page=100&orderby=title&order=asc`)
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

  shareFile(url){
    alert('trying to share');
    this.navigator.share({
        title: 'Sounds yo',
        text: 'Let it oooooze into your ears',
        url: url,
    })
    .then( () => alert('Successful share'))
    .catch(() => alert('Error sharing'))
  }

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='secondary'>
            <ion-buttons>
              <ion-button onClick={this.goBack.bind(this)}>
                Back
              </ion-button>
            </ion-buttons>

            <ion-title>Soundboard</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <h1>Thanks to <a href='https://www.twitter.com/justinspas'>@justinspas</a> for the sounds!</h1>

          <ion-list no-margin>
            {
              this.sounds.map( (sound) => {
                return (
                  <ion-item onClick={ () => { this.updateAudioTarget(sound.source_url) }}>
                    <h1 innerHTML={sound.title.rendered}></h1>

                    {
                      this.hasShareApi ?
                        <i slot='end' class='fas fa-download' onClick={ () => { this.shareFile(sound.source_url) }}></i>
                      :
                        <a slot='end' href={sound.source_url} download={`${sound.slug}.${sound.media_details.dataformat}`}>
                          <i class='fas fa-download'></i>
                        </a>
                    }

                  </ion-item>
                )
              })
            }
          </ion-list>

        </ion-content>
      </ion-page>
    );
  }

}
