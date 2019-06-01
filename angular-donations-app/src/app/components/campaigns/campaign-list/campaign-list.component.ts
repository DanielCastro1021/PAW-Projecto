import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/Campaign';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';
import { Donation } from 'src/app/models/Donation';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[];
  title: string;
  showStatus: boolean;

  constructor(
    public service: RestCampaignsService,
    public service2: RestDonationsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      switch (params['status']) {
        case 'active':
          this.getActiveCampaigns();
          break;
        case 'disabled':
          this.getDisabledCampaigns();
          break;
        case 'all':
          this.getAllCampaigns();
          break;
      }
    });
  }

  getAllCampaigns() {
    this.service.getCampaigns().subscribe((data: Campaign[]) => {
      this.campaigns = [];
      this.campaigns = data;
      this.title = 'All campaigns';
      for (let i = 0; i < this.campaigns.length; i++) {
        this.getCampaignsCurrentAmount(this.campaigns[i]);
      }
      this.showStatus = true;
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
      this.showStatus = false;
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
      this.showStatus = false;
    });
  }

  getCampaignsCurrentAmount(campaign) {
    let amount = 0;
    this.service2
      .getCampaignDonations(campaign._id)
      .subscribe((data: Donation[]) => {
        let donations = data;
        for (let i = 0; i < donations.length; i++) {
          amount += donations[i].amount;
        }
        if (campaign.currentAmount < amount) {
          campaign.currentAmount = amount;
        }
      });
  }
}
