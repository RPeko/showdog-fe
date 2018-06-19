import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Show } from '../../models/show';
import { DataProvider } from '../../providers/data';


@IonicPage()
@Component({
  selector: 'page-shows',
  templateUrl: 'shows.html',
})
export class ShowsPage {

  shows: Show[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
  ) {
    this.dataProvider.userstates().on('value', userstates => {
      console.log("Userstates:  " + JSON.stringify(userstates));
      userstates.forEach(userstate => {
        this.dataProvider.shows.orderByChild("state/code")
          .equalTo(JSON.stringify(userstate))
          .on('value', data => {
            console.log("Shows for " + JSON.stringify(userstate) + ": " + JSON.stringify(data));
            this.shows.concat(data.val());
          });
      });
    });
  }
}