import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/Campaign';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';
import { Donation } from 'src/app/models/Donation';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[];
  title: string;

  constructor(
    public service: RestCampaignsService,
    public service2: RestDonationsService
  ) {}

  ngOnInit() {
    this.getActiveCampaigns();
  }

  getAllCampaigns() {
    this.service.getCampaigns().subscribe((data: Campaign[]) => {
      this.campaigns = [];
      this.campaigns = data;
      this.title = 'All campaigns';
      for (let i = 0; i < this.campaigns.length; i++) {
        this.getCampaignsCurrentAmount(this.campaigns[i]);
      }
    });
  }

  /**
   *
   */
  getActiveCampaigns() {
    this.service.getActiveCampaigns().subscribe((data: Campaign[]) => {
      this.campaigns = [];
      this.campaigns = data;
      this.title = 'All active campaigns';
      for (let i = 0; i < this.campaigns.length; i++) {
        this.getCampaignsCurrentAmount(this.campaigns[i]);
      }
    });
  }

  /**
   *
   */
  getDisabledCampaigns() {
    this.service.getDisabledCampaigns().subscribe((data: Campaign[]) => {
      this.campaigns = [];
      this.campaigns = data;
      this.title = 'All disabled campaigns';
      for (let i = 0; i < this.campaigns.length; i++) {
        this.getCampaignsCurrentAmount(this.campaigns[i]);
      }
    });
  }

  getCampaignsCurrentAmount(campaign) {
    campaign.currentAmount = 0;
    this.service2
      .getCampaignDonations(campaign._id)
      .subscribe((data: Donation[]) => {
        let donations = data;
        for (let i = 0; i < donations.length; i++) {
          campaign.currentAmount += donations[i].amount;
        }
      });
  }
}
