import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/Campaign';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';
import { ActivatedRoute } from '@angular/router';
import { Donation } from 'src/app/models/Donation';

@Component({
  selector: 'app-show-ampaign-details',
  templateUrl: './campaign-show-details.component.html',
  styleUrls: ['./campaign-show-details.component.css']
})
export class CampaignShowDetailsComponent implements OnInit {
  campaign: Campaign;
  donations: Donation[];
  showDetails = false;
  totalDonated: number;
  progress: number;
  currentUser;

  constructor(
    public service: RestCampaignsService,
    public service2: RestDonationsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.serviceGetCampaign();
  }

  /**
   * This function gets the information of the current campaign, from the REST API.
   */
  serviceGetCampaign(): void {
    this.service
      .getActiveCampaign(this.route.snapshot.params['id'])
      .subscribe((data: Campaign) => {
        this.campaign = data;
        this.progress =
          (this.campaign.currentAmount / this.campaign.goalAmount) * 100;
        this.serviceGetDonations();
      });
  }

  /**
   * This function gets the donations of the current campaign, from the REST API.
   */
  serviceGetDonations(): void {
    this.service2
      .getCampaignDonations(this.route.snapshot.params['id'])
      .subscribe((data: Donation[]) => {
        if (data.length !== 0) {
          this.donations = data;
          this.getCampaignsCurrentAmount(this.campaign);
        }
      });
  }

  /**
   * This function calculates the current amount of a campaign
   * @param campaign This is a campaign.
   */
  getCampaignsCurrentAmount(campaign: Campaign): void {
    let amount = 0;
    for (let i = 0; i < this.donations.length; i++) {
      amount += this.donations[i].amount;
    }
    if (campaign.currentAmount < amount) {
      campaign.currentAmount = amount;
    }
  }
}
