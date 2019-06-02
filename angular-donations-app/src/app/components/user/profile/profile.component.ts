import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/User';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';
import { Donation } from 'src/app/models/Donation';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { Campaign } from 'src/app/models/Campaign';

@Component({
  selector: 'app-home',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  donations: Donation[];
  totalSpent: number;

  constructor(
    public service: AuthenticationService,
    public service2: RestDonationsService,
    public service3: RestCampaignsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceGetProfile();
  }

  /**
   * This function deletes the current user.
   */
  delete(): void {
    this.service.deleteMe(this.user._id).subscribe();
    this.logOut();
  }

  /**
   * This function make the logout for current user.
   */
  logOut(): void {
    this.service.logout().subscribe();
    this.router.navigate(['/login']);
  }

  /**
   * This function gets the user informations made, from the REST API.
   */
  serviceGetProfile(): void {
    this.service.getMe().subscribe(
      data => {
        this.user = data;
        this.serviceGetUserDonations();
      },
      err => {
        console.log(err);
        this.router.navigate(['/login']);
      }
    );
  }

  /**
   * This function gets the donations made, by the current user, from the REST API.
   */
  serviceGetUserDonations(): void {
    this.service2.getUserDonations(this.user.username).subscribe(
      (donations: Donation[]) => {
        this.donations = [];
        this.donations = donations;
        this.getCalculateAmountSpentInDonations();
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   *  This function calculates the total amount spent, by this current user.
   */
  getCalculateAmountSpentInDonations(): void {
    this.totalSpent = 0;
    for (let i = 0; i < this.donations.length; i++) {
      this.service3.getCampaign(this.donations[i].campaign).subscribe(
        (campaign: Campaign) => {
          this.donations[i].campaign = campaign.name;
          this.totalSpent += this.donations[i].amount;
        },
        err => {
          console.log(err);
        }
      );
    }
  }
}
