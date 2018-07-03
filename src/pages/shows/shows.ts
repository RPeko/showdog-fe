import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Show } from '../../models/show';
import { DataProvider } from '../../providers/data';
import { AuthService } from '../../providers/auth';
import { Userdata } from '../../models/userdata';


@IonicPage()
@Component({
  selector: 'page-shows',
  templateUrl: 'shows.html',
})

export class ShowsPage {
  stateshows: { state: string, shows: Show[] }[];
  monthshows: { month: string, shows: Show[] }[];
  groupBy = 2;
  admin = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public authService: AuthService
  ) {
  
  }

  ionViewWillEnter(){
    this.authService.getUserdata().on('value', data => {
      let userdata: Userdata;
      this.stateshows = [];
      this.monthshows = [];
      userdata = data.val();
      console.log("data.val: " + JSON.stringify(userdata));
      if (userdata) {
        if (userdata.admin) {
          this.admin = userdata.admin;
        }
        if (userdata.userstates){
          userdata.userstates.forEach(userstate => {
            this.dataProvider.shows
              .orderByChild("/statecode/")
              .equalTo(userstate)
              .on('value', data => {
                let showsarray = this.dataProvider.snapshotToArray(data);
                showsarray.forEach(show => {
                  // console.log("show " + show.key + ":  " + JSON.stringify(show));
                    if (show !== null) {
                      this.groupByState(show);
                      this.groupByMonth(show);
                    }
                  });
              });
          });
        }
      } else {
        this.dataProvider.shows
            .on('value', data => {
              let showsarray = this.dataProvider.snapshotToArray(data);
              showsarray.forEach(show => {
                  if (show !== null) {
                    this.groupByState(show);
                    this.groupByMonth(show);
                  }
                });
            });
      }
    });
  }

  groupByState(show:Show){
    let index = this.stateshows.findIndex(ss => ss.state == show.statecode);
    if (index > -1){
      this.stateshows[index].shows.push(show);
    } else {
      this.stateshows.push({state: show.statecode, shows: [show]});
    }
  }

  groupByMonth(show:Show){
    let index = this.monthshows.findIndex(ms => ms.month == show.date.slice(0, 7));
    if (index > -1){
      this.monthshows[index].shows.push(show);
    } else {
      this.monthshows.push({month: show.date.slice(0, 7), shows: [show]});
    }
  }

  open(show:Show){
    this.navCtrl.setRoot("ShowPage", {show:show});
  }

}