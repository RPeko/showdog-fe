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

  shows: Show[] = [];
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
      this.shows = [];
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
                      this.shows.push(show);
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
                    this.shows.push(show);
                  }
                });
            });
      }
    });
  }

  open(show:Show){
    this.navCtrl.setRoot("ShowPage", {show:show});
  }

}