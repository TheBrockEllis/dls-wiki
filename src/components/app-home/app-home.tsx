import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
// import mixpanel from 'mixpanel-browser';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @State() heads: any;

  @Prop({ context: 'isServer' }) private isServer: boolean;
  @Prop({ context: 'mixpanel' }) private mixpanel: any;

  @Prop() history: RouterHistory;
  @State() availableAnimations: string[] = ['tada', 'bounce', 'pulse', 'rubberBand', 'shake', 'jello'];

  /* We can load any 'static' pages here, before we load pages from Wordpress */
  @State() staticPages: any[] = [
    {
      title: 'Soundboard',
      link: '/soundboard'
    },
    {
      title: 'Daily Show Log',
      link: '/showlog'
    },
    {
      title: 'Twitter Polls',
      link: '/twitter'
    },
  ];

  @State() dynamicPages: any[] = [];

  componentDidLoad(){
    // console.log(this.mixpanel);

    this.mixpanel.init();
    this.mixpanel.track("Home");

    this.getPages();
    this.setupAnimations();
  }

  getPages(){
    if(this.isServer === false){
      fetch('https://admin.dlswiki.com/wp-json/wp/v2/pages?exclude=2')
      .then(function(response) {
        return response.json();
      })
      .then( (pages) => {
        pages.map( (page) => {
          page.title = page.title.rendered;
          page.link = `/page/${page.slug}`;
        });

        this.dynamicPages = [...this.dynamicPages, ...pages]
        // console.log("done fetchin' and mergin' pages", this.pages);
      });
    }
  }

  setupAnimations(){
    this.heads = document.getElementsByClassName("floatingHead");
    setInterval(this.toggleAnimations.bind(this), 5000)
  }

  toggleAnimations(){
    for(let i = 0; i < this.heads.length; i++){
      let head = this.heads[i];

      this.availableAnimations.map( animation => {
        head.classList.remove(animation);
      });

      // if a random number is even, add another animation, otherwise let it sit still
      if(Math.floor(Math.random() * 10) % 2 === 0){
        head.classList.add(this.availableAnimations[Math.floor(Math.random() * this.availableAnimations.length)]);
      }
    }
  }

  render() {

    return (
      <ion-page color='primary'>
        <ion-header>
          <ion-toolbar color='secondary'>
            <img src='assets/show-logo.png' />
          </ion-toolbar>
        </ion-header>

        <ion-content>

          <div class='floatingHeads'>
            <img src='assets/dans-head.png' class='floatingHead animated' />
            <p>Wiki</p>
            <img src='assets/stus-head.png' class='floatingHead animated' />
          </div>

          {
            this.staticPages.map( (page) => {
              {/* console.log("page", page); */}
              return <dls-button page={page} history={this.history}></dls-button>
            })
          }

          <img id='long-banner' src='assets/long-banner.png' />

          {
            this.dynamicPages.map( (page) => {
              {/* console.log("page", page); */}
              return <dls-button page={page} history={this.history}></dls-button>
            })
          }

          <p>This website is in no way affiliated, endorsed, or maybe even known by ESPN, The Dan Le Batard Show or anyone else of importance. Please don't sue me.</p>

        </ion-content>
      </ion-page>
    );
  }
}
