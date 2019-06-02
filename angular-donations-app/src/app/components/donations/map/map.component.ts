import { Component, OnInit, Input } from '@angular/core';
declare let L;
import 'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import { Donation } from 'src/app/models/Donation';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { User } from 'src/app/models/User';
var icon = L.icon({
  iconUrl: 'https://image.flaticon.com/icons/svg/447/447031.svg',
  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
  shadowAnchor: [4, 62], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

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
    this.initializeMap();
  }

  /**
   * This function initializes the map.
   */
  initializeMap(): void {
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

  /**
   * This function creates the leaflet map.
   */
  createMap(lat, lon): void {
    this.map = L.map('map').setView([lat, lon], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
    this.getUserNames();
    this.addUsers();
  }

  /**
   * This function add the user location to the leaflet map.
   */
  addUsers(): void {
    for (let i = 0; i < this.usernames.length; i++) {
      this.service.getUserByUsername(this.usernames[i]).subscribe(
        (user: User) => {
          L.marker([user.coordinates.latitude, user.coordinates.longitude], {
            icon: icon
          })
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

  /**
   * This function stores usernames in array, from the donations.
   */
  getUserNames(): void {
    this.usernames = [];
    for (let i = 0; i < this.donations.length; i++) {
      this.usernames.push(this.donations[i].username);
    }
    this.deleleDuplicates(this.usernames);
  }

  /**
   * This function remove the duplicate values in a array.
   * @param array This is an array.
   */
  deleleDuplicates(array): void {
    array = array.filter(
      (value, index, array) =>
        !array.filter(
          (v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index
        ).length
    );
  }
}
