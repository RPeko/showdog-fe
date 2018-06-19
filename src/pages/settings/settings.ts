import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { State } from '../../models/state';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  states: State[] = [];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
  ) {
    this.dataProvider.states.on('value', data => {
      this.states = data.val();
      let userstates = [];
      this.dataProvider.userstates().on('value', data => {
        userstates = data.val();
        // console.log("Userstates: " + JSON.stringify(userstates));
        if (userstates) {
          for (let i=0; i<this.states.length; i++){
            this.states[i].checked = (userstates.findIndex(us => us == this.states[i].code) !== -1);
          }
        }
      });
      console.log("States: " + JSON.stringify(this.states));
    });
  }

  updateUserStates() {
    let userstates = [];
    for (let i = 0; i < this.states.length; i++) {
      if (this.states[i].checked) {
        userstates.push(this.states[i].code);
      }
    }
    this.dataProvider.updateUserStates(userstates);
  }
}