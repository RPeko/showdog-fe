import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  constructor(public navCtrl: NavController, 
              private auth: AuthService
            ) {
 
  }

  loginWithGoogle() {
    this.auth.signInWithGoogle()
      .then(
        user => {
          console.log("User: " + JSON.stringify(user));
          this.navCtrl.setRoot("ShowsPage");
        },
        error => console.log(error.message)
      );
    }
  
    loginWithFB() {
      this.auth.signInWithFB()
        .then(
          user => {
            console.log("User: " + JSON.stringify(user));
            this.navCtrl.setRoot("ShowsPage")
          },
          error => console.log(error.message)
        );
      }
  

  loginAsGuest(){
    this.navCtrl.setRoot("ShowsPage");
  }
}