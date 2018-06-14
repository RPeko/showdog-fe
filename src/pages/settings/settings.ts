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
  states: any[] = [];
  userstates: any[] = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dataProvider: DataProvider,
              ) {
                this.dataProvider.states.on('value', data => {
                  this.states = data.val();
                  this.dataProvider.userstates().on('value', data => {
                    this.userstates = data.val();
                    console.log("Userstates: " + JSON.stringify(this.userstates));
                    if (this.userstates){
                      this.states.forEach(state => state.checked = (this.userstates.findIndex(us => us == state.id) !== -1));
                    }
                });
                  console.log("States: " + JSON.stringify(this.states));
              });
  }

  update(state:State){
    if (state.checked){

    } else {

    }   
  }
}