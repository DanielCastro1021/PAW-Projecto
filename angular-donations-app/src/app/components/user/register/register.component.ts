import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/User';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() userData: User = new User();

  constructor(
    public service: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getLocation();
  }

  register() {
    console.log(this.userData);
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

  getLocation(): void {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.userData.coordinates.latitude = position.coords.latitude;
          this.userData.coordinates.longitude = position.coords.longitude;
        },
        failure => {
          if (failure.message.indexOf('Only secure origins are allowed') == 0) {
            alert('Only secure origins are allowed by your browser.');
          }
        }
      );
    } else {
      console.log("Your browser doesn't support geolocation");
    }
  }
}
