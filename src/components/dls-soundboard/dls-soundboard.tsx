import { Component, Prop, State } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import firebase from 'firebase';

@Component({
  tag: 'dls-soundboard',
  styleUrl: 'dls-soundboard.css'
})
export class DLSSoundboard {

  @Prop() history: RouterHistory;
  @State() soundsRef:any;

  componentDidLoad(){
    // this.getSounds();

    // Get a reference to the storage service, which is used to create references in your storage bucket
    // var storage = firebase.storage();
    // console.log('storage', storage);

    // Create a storage reference from our storage service
    console.log(firebase);
    var storageRef = firebase.storage().ref();
    console.log('storageRef', storageRef);
  }

  // getSounds(){
  //   // Find a reference to only votes that are for the associated job
  //   this.soundsRef = firebase.storage()
  //   // Attach a listner for changes on this reference
  //   this.votesRef.on('value', (snapshot) => {
  //       // Listen For New Votes, Update Vote Count And Current Vote
  //       console.log('Vote count changed', this.job.company);
  //       let voteCount = 0;
  //       snapshot.forEach( (vote): any => {
  //           let voteValue = vote.val();
  //           voteCount += voteValue.points;
  //           // Could do some other stuff here
  //       });
  //       console.log('voteCount' , voteCount);
  //
  //       this.job.points = voteCount;
  //       this.points = voteCount;
  //    }, (err) => {
  //        console.warn(err);
  //   });
  // }

  goBack(){
    this.history.goBack();
  }

  render() {
    return (
      <ion-page>
        <ion-header>
          <ion-toolbar color='primary'>
            <ion-buttons>
              <ion-button icon-only onClick={this.goBack.bind(this)}>
                Back
              </ion-button>
            </ion-buttons>

            <ion-title>Soundboard</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content>
          <h1>Thanks to person for the sounds!</h1>
        </ion-content>
      </ion-page>
    );
  }

}
