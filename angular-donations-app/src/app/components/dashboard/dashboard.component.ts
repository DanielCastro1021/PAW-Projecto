import { Component, OnInit } from '@angular/core';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';

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

  constructor(
    public service: RestCampaignsService,
    public service2: RestDonationsService
  ) {}

  ngOnInit() {
    this.serviceGetCampaignsStatus();
    this.serviceGetCampaignsCount();
    this.service2GetDonationsStatus();
    this.service2GetDonationsCount();
  }

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

  service2GetDonationsStatus(): void {
    this.service2.getDonationsStatusSummary().subscribe(
      (data: {}) => {
        console.log(data);
        this.donationsStatus = data;
      },
      err => {
        console.log(err);
      }
    );
  }

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
}
