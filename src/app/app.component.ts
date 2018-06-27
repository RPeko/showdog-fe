import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, 
              public statusBar: StatusBar, 
              public splashScreen: SplashScreen,
              public auth: AuthService
            ) {
    this.initApp();
    this.pages = [
       { title: 'Shows', component: 'ShowsPage', icon:'trophy'},
       { title: 'Settings', component: 'SettingsPage', icon:'settings'}
    ];
  }

  initApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.auth.afAuth.authState
				.subscribe(
					user => {
						if (user) {
              this.rootPage = "ShowsPage";
						} else {
							this.rootPage = LoginPage;
						}
					},
					() => {
						this.rootPage = LoginPage;
					}
				);
  }

  login() {
    this.auth.signOut();
		this.nav.setRoot(LoginPage);
  }

  logout() {
		this.auth.signOut();
		this.nav.setRoot(LoginPage).then(data => {
      console.log("logout-then: " + data);
  }, (error) => {
      console.log("logout-err: " + error);
  });
	}
  
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
