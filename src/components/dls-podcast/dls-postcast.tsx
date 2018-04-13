import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'dls-podcast',
  styleUrl: 'dls-podcast.scss'
})
export class DLSPostcast {

  @Prop() history: RouterHistory;
  @Prop() podcasts: any[];
  @Prop() date: Date;

  componentDidLoad(){
    // this.publishDate = new Date(this.podcast.querySelector('pubDate').textContent);
  }

  handleClick() {
    // console.log('Received the button click!', this);
    // this.history.push(`${this.page.link}`, {title: this.page.title, id: this.page.id});
  }

  render() {
    let markup :string = '';

    [].forEach.call(this.podcasts, (podcast) => {
      let link = podcast.querySelector('enclosure').getAttribute('url');
      markup += `
        <h2 class='title'>${podcast.querySelector('title').textContent}</h2>
        <p class='description'>
          ${podcast.querySelector('description').textContent}
          <a href='${link}'>[Listen]</a>
        </p>
      `;
    });

    return (
      <ion-card>
        <ion-card-header>
          <h1 class='day'>{this.date.getFullYear()}-{this.date.getMonth() + 1}-{this.date.getDate()}</h1>
        </ion-card-header>
        <ion-card-content innerHTML={markup}>

        </ion-card-content>
        <ion-card-footer></ion-card-footer>
      </ion-card>
    );
  }
}
