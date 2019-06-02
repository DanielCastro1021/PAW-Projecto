import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  /**
   * This This function registers the user
   */
  register(): void {
    if (
      this.validateUsername() &&
      this.validatePassword() &&
      this.validateFullName() &&
      this.validateIBAN() &&
      this.validateNIF() &&
      this.validateLocation()
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
      this.coordinatesToggle = true;
      this.addressToggle = false;
      this.getLocation();
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
   * This function validate the user username.
   */
  validateUsername(): boolean {
    if (this.userData.username === undefined) {
      alert('Username must be filled!!!');
      return false;
    } else {
      return true;
    }
  }

  /**
   * This function validate the user password.
   */
  validatePassword(): boolean {
    if (this.userData.password === undefined) {
      alert('Password must be filled!!!');
      return false;
    } else {
      return true;
    }
  }

  /**
   * This function validate the user full name.
   */
  validateFullName(): boolean {
    if (this.userData.fullname === undefined) {
      alert('Full name must be filled!!!');
      return false;
    } else {
      return true;
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
      if (
        this.userData.coordinates.latitude === undefined &&
        this.userData.coordinates.latitude === undefined &&
        this.userData.address === undefined
      ) {
        alert('Your option must be filled!!!');
        return false;
      } else {
        return true;
      }
    }
  }

  /**
   * This function validate the IBAN´s user.
   */
  validateIBAN(): boolean {
    if (this.userData.iban === undefined) {
      alert('IBAN must be filled!!!');
      return false;
    } else if (!this.isValidIBANNumber(this.userData.iban)) {
      alert('IBAN must be valid!!!');
      return false;
    } else {
      this.userData.iban = this.userData.iban.toUpperCase();
      return true;
    }
  }

  /**
   * This function validate the NIF´s user.
   */
  validateNIF(): boolean {
    if (this.userData.nif === undefined) {
      alert('NIF must be filled!!!');
      return false;
    } else if (this.userData.nif < 100000000 || this.userData.nif > 999999999) {
      alert('NIF must be 9 digits!!!');
      return false;
    } else if (this.isNIFValid(this.userData.nif)) {
      alert('NIF must be valid!!!');
      return false;
    } else {
      return true;
    }
  }

  /**
   * This function validates a NIF.
   * @param value
   */
  isNIFValid(value): boolean {
    const nif = typeof value === 'string' ? value : value.toString();
    const validationSets = {
      one: ['1', '2', '3', '5', '6', '8'],
      two: [
        '45',
        '70',
        '71',
        '72',
        '74',
        '75',
        '77',
        '79',
        '90',
        '91',
        '98',
        '99'
      ]
    };

    if (nif.length !== 9) {
      return false;
    }

    if (
      !validationSets.one.includes(nif.substr(0, 1)) &&
      !validationSets.two.includes(nif.substr(0, 2))
    ) {
      return false;
    }
    const total =
      nif[0] * 9 +
      nif[1] * 8 +
      nif[2] * 7 +
      nif[3] * 6 +
      nif[4] * 5 +
      nif[5] * 4 +
      nif[6] * 3 +
      nif[7] * 2;
    const modulo11 = Number(total) % 11;
    const checkDigit = modulo11 < 2 ? 0 : 11 - modulo11;
    return checkDigit === Number(nif[8]);
  }

  /**
   * This function validates a IBAN number.
   * @param input This is a string with an iban.
   */
  isValidIBANNumber(input: any): boolean {
    let CODE_LENGTHS = {
      AD: 24,
      AE: 23,
      AT: 20,
      AZ: 28,
      BA: 20,
      BE: 16,
      BG: 22,
      BH: 22,
      BR: 29,
      CH: 21,
      CR: 21,
      CY: 28,
      CZ: 24,
      DE: 22,
      DK: 18,
      DO: 28,
      EE: 20,
      ES: 24,
      FI: 18,
      FO: 18,
      FR: 27,
      GB: 22,
      GI: 23,
      GL: 18,
      GR: 27,
      GT: 28,
      HR: 21,
      HU: 28,
      IE: 22,
      IL: 23,
      IS: 26,
      IT: 27,
      JO: 30,
      KW: 30,
      KZ: 20,
      LB: 28,
      LI: 21,
      LT: 20,
      LU: 20,
      LV: 21,
      MC: 27,
      MD: 24,
      ME: 22,
      MK: 19,
      MR: 27,
      MT: 31,
      MU: 30,
      NL: 18,
      NO: 15,
      PK: 24,
      PL: 28,
      PS: 29,
      PT: 25,
      QA: 29,
      RO: 24,
      RS: 22,
      SA: 24,
      SE: 24,
      SI: 19,
      SK: 24,
      SM: 27,
      TN: 24,
      TR: 26
    };

    let iban = input.toUpperCase().replace(/[^A-Z0-9]/g, ''),
      code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/),
      digits;

    if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
      return false;
    }

    digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, letter => {
      return letter.charCodeAt(0) - 55;
    });

    return this.mod97(digits) === 1;
  }

  /**
   * This function suport the function of validation of the  an IBAN.
   */
  mod97(string: any): number {
    let checksum = string.slice(0, 2),
      fragment;

    for (let offset = 2; offset < string.length; offset += 7) {
      fragment = checksum + string.substring(offset, offset + 7);
      checksum = parseInt(fragment, 10) % 97;
    }

    return checksum;
  }

  /**
   * This obtains the current coordinates of the user.
   */
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
      alert('Your browser doesn´t support geolocation.');
    }
  }
}
