import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();

  constructor(
    public service: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.service.getMe().subscribe(
      data => {
        console.log(data);
        this.user = data;
      },
      err => {
        console.log(err);
        this.router.navigate(['/login']);
      }
    );
  }

  logOut() {
    this.service.logout().subscribe();
    this.router.navigate(['/login']);
  }
}
