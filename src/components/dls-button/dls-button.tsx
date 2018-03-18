import { Component, Prop } from '@stencil/core';
import { RouterHistory } from '@stencil/router';

@Component({
  tag: 'dls-button',
  styleUrl: 'dls-button.scss'
})
export class DLSButton {

  @Prop() history: RouterHistory;
  @Prop() page: any;

  componentDidLoad(){
  }

  handleClick() {
    // console.log('Received the button click!', this);
    this.history.push(`${this.page.link}`, {title: this.page.title, id: this.page.id});
  }

  render() {
    return (
      <div class='dls-button-box' innerHTML={this.page.title} onClick={this.handleClick.bind(this)}>
      </div>

      // <ion-item tappable innerHTML={this.page.title} onClick={this.handleClick.bind(this)}>
      // </ion-item>
    );
  }
}
