import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database';
import { AuthService } from './auth-service';

@Injectable()
export class DataProvider {
  public shows: any;
  public states: any;

    constructor(public authService:AuthService) {
        this.shows = firebase.database().ref('/shows/');
        this.states = firebase.database().ref('/states/');
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
