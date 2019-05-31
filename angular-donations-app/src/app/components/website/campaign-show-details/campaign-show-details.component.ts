import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/Campaign';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    public service: RestCampaignsService,
    public service2: RestDonationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceGetActiveCampaign();
  }

  /**
   *
   */
  serviceGetActiveCampaign() {
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
   *
   */
  serviceGetDonations() {
    this.service2
      .getCampaignDonations(this.route.snapshot.params['id'])
      .subscribe((data: Donation[]) => {
        if (data.length !== 0) {
          this.donations = data;
          this.getCampaignsCurrentAmount(this.campaign);
        }
      });
  }

  getCampaignsCurrentAmount(campaign) {
    let amount = 0;
    for (let i = 0; i < this.donations.length; i++) {
      amount += this.donations[i].amount;
    }
    if (campaign.currentAmount < amount) {
      campaign.currentAmount = amount;
    }
  }
}
