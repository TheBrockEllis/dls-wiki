import { Component, Element, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
// import mixpanel from 'mixpanel-browser';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss'
})
export class AppHome {

  @Element() el: Element;

  @State() heads: any;
  @State() adnan: any;

  @Prop({ context: 'isServer' }) private isServer: boolean;
  @Prop({ context: 'mixpanel' }) private mixpanel: any;

  @Prop() history: RouterHistory;
  @State() availableAnimations: string[] = ['tada', 'bounce', 'pulse', 'rubberBand', 'shake', 'jello'];

  /* We can load any 'static' pages here, before we load pages from Wordpress */
  @State() dynamicPages: any;
  @State() staticPages: Array<any> = [
    {
      title: 'Soundboard',
      link: '/soundboard',
      comingSoon: false
    },
    {
      title: 'Daily Show Log',
      link: '/showlog',
      comingSoon: false
    },
    {
      title: 'Twitter Polls',
      link: '/twitter',
      comingSoon: true
    },
    {
      title: 'Show Timeline',
      link: '/timeline',
      comingSoon: false
    },
  ];

  componentWillLoad(){
    // console.log('Is server: ', this.isServer);

    this.mixpanel.init();
    this.mixpanel.track("Home");

    if(!this.isServer) {
      // console.log('not pre-rendered, getting pages');
      this.getPages();
    }
  }

  componentDidLoad(){
    this.setupAnimations();
  }

  getPages(){
    fetch('https://admin.dlswiki.com/wp-json/wp/v2/pages?exclude=2&orderby=menu_order&order=asc')
      .then(function(response) {
        return response.json();
      })
      .then( (pages) => {
        var modifiedPages = pages.map( (page) => {
          page.title = page.title.rendered;
          page.link = `/page/${page.slug}`;
          return page;
        });

        return modifiedPages;
        // this.dynamicPages = [...this.dynamicPages, ...pages]
        // console.log("done fetchin' and mergin' pages", this.pages);
      }).then(pages => {
        this.dynamicPages = pages;
        // console.log("done fetchin' and mergin' pages", pages, this.dynamicPages);
        // console.log('this', this);
      });
  }

  setupAnimations(){
    this.heads = this.el.getElementsByClassName("floatingHead");
    this.adnan = this.el.querySelector('#adnan');
    setInterval(this.toggleAnimations.bind(this), 5000);
    setInterval(this.toggleAdnan.bind(this), 10000);
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

  toggleAdnan(){
    //adnan peekaboo
    this.adnan.classList.toggle('peekaboo');
  }

  render() {

    return (
      <ion-page>
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
              return <dls-button page={page} history={this.history}></dls-button>
            })
          }

          <img id='long-banner' src='assets/long-banner.png' />

          {
            !this.isServer && this.dynamicPages ?
            this.dynamicPages.map((page) => {
              return <dls-button page={page} history={this.history}></dls-button>
            }) : undefined
          }

          <div id='azaria'>
            <h2>Miami Jewish Health Systems</h2>

            <div>
              <img id='duff' src='assets/duff_man.png' />
              <p>Hank Azaria, most widely known for his voicework on the Simpsons and from his critically aclaimed show Brockmire (IFC), donated many hours to recording lines for 2018 March Sadness Tournament. In return, all he asked is that the show raise awareness for Miami Jewish Heath Systems...so go check it out and donate.</p>
            </div>

            <img id='mjhs' src='assets/mjhs.png' />

            <div id='cta'>
              <a href='http://miamijewishhealthsystems.org '>Check Out MJHS Now</a>
            </div>
          </div>

          <p>This website is in no way affiliated, endorsed, or maybe even known by ESPN, The Dan Le Batard Show or anyone else of importance. Please don't sue me.</p>

        </ion-content>

        <img id='adnan' src='assets/adnan.png' />

      </ion-page>
    );
  }
}
