import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { Show } from '../models/show';

@Injectable()
export class DataProvider {
    public shows: any;
    public states: any;

    constructor() {
        this.shows = firebase.database().ref('/shows/');
        this.states = firebase.database().ref('/states/');
    }

    updateShow(show:Show){}

}
