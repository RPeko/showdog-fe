import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Show } from '../../models/show';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../../providers/data';

@IonicPage()
@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {
  show: Show;
  showForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private formBuilder: FormBuilder, 
              public dataProvider: DataProvider) {

    this.show = this.navParams.get("show");
    console.log("Show: " + JSON.stringify(this.show));
    if (!this.show || !this.show.name) {
      this.show = new Show();
      this.show.date = new Date();
    }
      this.showForm = this.formBuilder.group({
        'name': ['', Validators.required],
        'description': [''],
        'place': [''],
        'type': [''],
        'statecode': [''],
        'date': [''],
        'lat': [''],
        'lon': [''],
      });
    }

    ionViewDidLoad() {
      this.showForm.setValue({
        name: this.show.name || "",
        description: this.show.description || "",
        place: this.show.place || "",
        type: this.show.type || "",
        statecode: this.show.statecode || "",
        date: this.show.date || "",
        lat: this.show.lat || "",
        lon: this.show.lon || "",
      });
    }


    submitShow() {
      this.show.name = this.showForm.value.name;
      this.show.description = this.showForm.value.description;
      this.show.place = this.showForm.value.place;
      this.show.type = this.showForm.value.type;
      this.show.statecode = this.showForm.value.statecode;
      this.show.date = this.showForm.value.date;
      this.show.lat = this.showForm.value.lat;
      this.show.lon = this.showForm.value.lon;
      this.dataProvider.updateShow(this.show);
    }

  }
