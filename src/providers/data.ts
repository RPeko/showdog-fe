import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth-service';

@Injectable()
export class DataProvider {
    public shows: any;
    public states: any;
    // public bgShows: any;
   
    constructor(public authService: AuthService, public db: AngularFireDatabase) {
        this.shows = firebase.database().ref('/shows/');
        this.states = firebase.database().ref('/states/');
    }

    public userstates() {
        let uid = this.authService.getUid();
        return firebase.database().ref('/userstates/' + uid);
    }

    public updateUserStates(userstates: string[]) {
        const userstatesRef = this.db.object('/userstates/' + this.authService.getUid());
        userstatesRef.set(userstates);
    }

   

}
