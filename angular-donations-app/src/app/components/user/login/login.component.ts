import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() userData: User = new User();

  constructor(public service: AuthenticationService, private router: Router) {}

  ngOnInit() {}

  /**
   * This function authenticates the credentials of a user.
   */
  login() {
    console.log(this.userData);
    if (this.userData.username === '') {
      alert('Please insert username.');
    } else if (this.userData.password === '') {
      alert('Please insert password.');
    } else {
      this.serviceLogin();
    }
  }

  /**
   * This function authenticates the credentials of a user, in the the REST API.
   */
  serviceLogin(): void {
    this.service
      .login(this.userData.username, this.userData.password)
      .subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/campaigns']);
        },
        err => {
          console.log(err);
          alert(
            'Sorry we could not found you, please check if username and password are correct.'
          );
        }
      );
  }
}
