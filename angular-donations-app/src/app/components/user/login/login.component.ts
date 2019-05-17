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

  constructor(
    public service: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    this.service.login(this.userData.email, this.userData.password).subscribe(
      result => {
        console.log(result);
        this.router.navigate(['/profile']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
