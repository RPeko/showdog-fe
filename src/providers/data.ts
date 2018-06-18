import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service';

@Injectable()
export class DataProvider {
  public shows: any;
  public userstates2:  Observable<any>;
  public states: any;

    constructor(public authService:AuthService, public db: AngularFireDatabase) {
        this.shows = firebase.database().ref('/shows/');
        this.states = firebase.database().ref('/states/');
        this.userstates2 = db.object('/userstates/' + this.authService.getUid()).valueChanges();

    }

    public updateUserStates(userstates:string[]){
        const userstatesRef = this.db.object('/userstates/' + this.authService.getUid());
        userstatesRef.set(userstates);
    }

    public userstates(){
        let uid = this.authService.getUid();
        return firebase.database().ref('/userstates/' + uid);
    } 

    public snapshotToArray(snapshot) {
      var returnArr = [];
    
      snapshot.forEach(function(childSnapshot) {
          var item = childSnapshot.val();
          item.key = childSnapshot.key;
    
          returnArr.push(item);
      });
    
      return returnArr;
    };

}
