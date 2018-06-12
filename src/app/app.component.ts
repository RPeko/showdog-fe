import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';


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
             private auth: AuthService
            ) {
    this.initApp();
    // used for an example of ngFor and navigation
    this.pages = [
      // { title: 'Login', component: LoginPage },
       { title: 'Shows', component: 'ShowsPage', icon:'trophy'}
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
		this.nav.setRoot("ShowsPage");
	}
  
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
