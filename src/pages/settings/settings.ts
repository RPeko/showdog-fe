import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  states: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataProvider: DataProvider,
              ) {
                this.dataProvider.states.on('value', data => {
                  this.states = data.val();
                  console.log("States: " + JSON.stringify(this.states));
              });
  }
}