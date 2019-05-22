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

  ngOnInit() {}

  register() {
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
}
