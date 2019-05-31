import { Component, OnInit, Input } from '@angular/core';
declare let L;
import 'node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js';
import { Donation } from 'src/app/models/Donation';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() donations: Donation[];
  map;
  constructor() {}

  ngOnInit() {}

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
  }

  addUsers() {
    L.circle([46, -8], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    })
      .bindPopup('My Location')
      .addTo(this.map);
  }
}
