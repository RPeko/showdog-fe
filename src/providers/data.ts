import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/database';

@Injectable()
export class DataProvider {
  public shows: any;

    constructor() {
        this.shows = firebase.database().ref('/shows/');

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
