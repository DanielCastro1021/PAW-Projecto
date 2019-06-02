import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() userData: User = new User();
  coordinatesToggle: boolean;
  addressToggle: boolean;

  constructor(
    public service: AuthenticationService,
    public service2: ValidationService,
    private router: Router
  ) {}

  ngOnInit() {}

  /**
   * This This function registers the user
   */
  register(): void {
    if (
      this.service2.validateUsername(this.userData.username) &&
      this.service2.validatePassword(this.userData.password) &&
      this.service2.validateFullName(this.userData.fullname) &&
      this.service2.validateIBAN(this.userData.iban) &&
      this.service2.validateNIF(this.userData.nif) &&
      this.service2.validateLocation(
        this.userData.coordinates,
        this.userData.address
      )
    ) {
      this.serviceRegisterUser();
    }
  }

  /**
   * This show the address inputs if checked option to show.
   */
  toggleAddress(): void {
    if (this.addressToggle === true) {
      this.addressToggle = false;
    } else {
      this.userData.coordinates.latitude = undefined;
      this.userData.coordinates.longitude = undefined;
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
   * This function posts the user, in the REST API.
   */
  serviceRegisterUser(): void {
    this.service.register(this.userData).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    );
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
}
