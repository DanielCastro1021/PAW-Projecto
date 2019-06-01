import { Component, OnInit, Input } from '@angular/core';
declare let L;
import 'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import { Donation } from 'src/app/models/Donation';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() donations: Donation[];
  usernames: string[];
  map;
  constructor(public service: AuthenticationService) {}

  ngOnInit() {
    this.getLocation();
  }

  getLocation(): void {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.createMap(position.coords.latitude, position.coords.longitude);
        },
        failure => {
          if (
            failure.message.indexOf('Only secure origins are allowed') === 0
          ) {
            alert('Only secure origins are allowed by your browser.');
          }
        }
      );
    } else {
      console.log("Your browser doesn't support geolocation");
    }
  }

  createMap(lat, lon) {
    this.map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.getUserNames();
    this.addUsers();
  }

  addUsers() {
    for (let i = 0; i < this.usernames.length; i++) {
      this.service.getUserByUsername(this.usernames[i]).subscribe(
        (user: User) => {
          L.marker([user.coordinates.latitude, user.coordinates.longitude])
            .bindPopup(user.username)
            .openPopup()
            .addTo(this.map);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  getUserNames() {
    this.usernames = [];
    for (let i = 0; i < this.donations.length; i++) {
      this.usernames.push(this.donations[i].username);
    }
    this.deleleDuplicates(this.usernames);
  }

  deleleDuplicates(array) {
    array = array.filter(
      (value, index, array) =>
        !array.filter(
          (v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index
        ).length
    );
  }
}
