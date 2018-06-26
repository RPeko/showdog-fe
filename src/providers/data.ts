import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Show } from '../models/show';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DataProvider {
    public shows: any;
    public states: any;

    constructor(public db: AngularFireDatabase) {
        this.shows = firebase.database().ref('/shows/');
        this.states = firebase.database().ref('/states/');
    }

    upsetShow(show:Show){
        if (!show.key || show.key == '' || show.key == 'undefined'){
            show.key = this.shows.push().key;
        } 
        const showRef = this.db.object('/shows/' + show.key);
        return showRef.update(show);

    }

    snapshotToArray(snapshot) {
        var returnArr = [];
    
        snapshot.forEach(function(childSnapshot) {
            var item = childSnapshot.val();
            item.key = childSnapshot.key;
    
            returnArr.push(item);
        });
    
        return returnArr;
    };
    

}
