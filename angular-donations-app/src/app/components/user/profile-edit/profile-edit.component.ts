import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation/validation.service';

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

  coordinatesToggle: boolean;
  addressToggle: boolean;

  constructor(
    public service: AuthenticationService,
    public service2: ValidationService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.serviceGetProfile();
  }

  /**
   * This updates the user information.
   */
  update(): void {
    if (
      this.service2.validateFullName(this.userData.fullname) &&
      this.service2.validateIBAN(this.userData.iban) &&
      this.service2.validateNIF(this.userData.nif) &&
      this.validateLocation()
    ) {
      this.serviceUpdateProfile();
    }
  }

  /**
   * This show the address inputs if checked option to show.
   */
  toggleAddress(): void {
    if (this.addressToggle === true) {
      this.addressToggle = false;
    } else {
      this.userData.coordinates.latitude = 0;
      this.userData.coordinates.longitude = 0;
      this.addressToggle = true;
      this.coordinatesToggle = false;
    }
  }

  /**
   * This show the coordinates inputs if checked option to show.
   */
  toggleCoordinatinates(): void {
    if (this.coordinatesToggle === true) {
      this.coordinatesToggle = false;
    } else {
      this.userData.address = '';
      this.coordinatesToggle = true;
      this.addressToggle = false;
      this.service2.getLocation((lat, lon) => {
        this.userData.coordinates.latitude = lat;
        this.userData.coordinates.longitude = lon;
      });
    }
  }

  /**
   * This function validate the user location.
   */
  validateLocation(): boolean {
    if (this.addressToggle === false && this.coordinatesToggle === false) {
      alert('Must choose your location !!!');
      return false;
    } else {
      return this.service2.validateLocation(
        this.userData.coordinates,
        this.userData.address
      );
    }
  }

  /**
   * This function gets the information of the current user, from the REST API.
   */
  serviceGetProfile(): void {
    this.service.getMe().subscribe(
      (data: {}) => {
        this.userData = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * This function updates the current user, in the REST API.
   */
  serviceUpdateProfile(): void {
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
