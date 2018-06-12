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
                this.dataProvider.shows.on('value', data => {
                  this.shows = data.val();
              });
  }
}