import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { State } from '../../models/state';
import { AuthService } from '../../providers/auth';
import { Userdata } from '../../models/userdata';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  states: State[] = [];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider:DataProvider,
    public authService: AuthService
  ) {
    this.dataProvider.states.on('value', data => {
      this.states = data.val();
      let userdata: Userdata;
      this.authService.getUserdata().on('value', data => {
        userdata = data.val();
        // console.log("Userstates: " + JSON.stringify(userstates));
        if (userdata && userdata.userstates) {
          for (let i=0; i<this.states.length; i++){
            this.states[i].checked = (userdata.userstates.findIndex(us => us == this.states[i].code) !== -1);
          }
        }
      });
      // console.log("States: " + JSON.stringify(this.states));
    });
  }

  updateUserStates() {
    let userstates = [];
    for (let i = 0; i < this.states.length; i++) {
      if (this.states[i].checked) {
        userstates.push(this.states[i].code);
      }
    }
    this.authService.updateUserStates(userstates);
  }
}