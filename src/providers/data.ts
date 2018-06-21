import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

@Injectable()
export class DataProvider {
    public shows: any;
    public states: any;

    constructor() {
        this.shows = firebase.database().ref('/shows/');
        this.states = firebase.database().ref('/states/');
    }

}
