import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  @Input() userData: any = {
    username: '',
    password: '',
    fullname: '',
    nif: 0,
    iban: '',
    coordinates: { latitude: 0, longitude: 0 },
    address: ''
  };
  constructor(
    public service: AuthenticationService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.serviceGetProfile();
  }

  getLocation(): void {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.userData.coordinates.latitude = position.coords.latitude;
          this.userData.coordinates.longitude = position.coords.longitude;
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
      console.log('Your browser doesn´t support geolocation.');
    }
  }

  serviceGetProfile() {
    this.service.getMe().subscribe(
      (data: {}) => {
        this.userData = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  serviceUpdateProfile() {
    this.service
      .updateMe(this.route.snapshot.params['id'], this.userData)
      .subscribe(
        res => {
          this.router.navigate(['/profile']);
        },
        err => {
          console.log(err);
        }
      );
  }
}
