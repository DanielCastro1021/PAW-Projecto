import { Component, OnInit } from '@angular/core';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  campaignsStatus: any;
  campaignsCount: number;

  donationsStatus: any;
  donationsCount: number;

  usersStatus: any;
  usersCount: number;

  constructor(
    public service: RestCampaignsService,
    public service2: RestDonationsService,
    public service3: AuthenticationService
  ) {}

  ngOnInit() {
    this.serviceGetCampaignsStatus();
    this.serviceGetCampaignsCount();
    this.service2GetDonationsStatus();
    this.service2GetDonationsCount();
    this.service3GetUsersCount();
  }

  /**
   * This function obtains the campaigns count, by status, from REST API.
   */
  serviceGetCampaignsStatus(): void {
    this.service.getCampaignStatusSummary().subscribe(
      (data: {}) => {
        this.campaignsStatus = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * This function obtains the campaigns count, from REST API.
   */
  serviceGetCampaignsCount(): void {
    this.service.getCampaignCount().subscribe(
      (data: {}) => {
        this.campaignsCount = data[0].total;
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * This function obtains the donations count, by status, from REST API.
   */
  service2GetDonationsStatus(): void {
    this.service2.getDonationsStatusSummary().subscribe(
      (data: {}) => {
        this.donationsStatus = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * This function obtains the donations count, from REST API.
   */
  service2GetDonationsCount(): void {
    this.service2.getDonationsCount().subscribe(
      (data: {}) => {
        this.donationsCount = data[0].total;
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * This function obtains the user count, by role, from REST API.
   */
  service3GetUsersCount(): void {
    this.service3.getUserRoles().subscribe(
      (data: {}) => {
        this.usersStatus = data;
        this.countUsers(this.usersStatus);
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   *  This function calculates the total amount of users registered.
   * @param data
   */
  countUsers(data: any): void {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i].total;
    }
    this.usersCount = sum;
  }
}
