import { Component, OnInit } from '@angular/core';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { Campaign } from 'src/app/models/Campaign';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';
import { Donation } from 'src/app/models/Donation';

@Component({
  selector: 'app-campaigns-show',
  templateUrl: './campaigns-show.component.html',
  styleUrls: ['./campaigns-show.component.css']
})
export class CampaignsShowComponent implements OnInit {
  campaigns: Campaign[];

  constructor(
    public service: RestCampaignsService,
    public service2: RestDonationsService
  ) {}

  ngOnInit() {
    this.serviceGetActiveCampaigns();
  }

  serviceGetActiveCampaigns(): void {
    this.service.getActiveCampaigns().subscribe((data: Campaign[]) => {
      this.campaigns = data;
      for (let i = 0; i < this.campaigns.length; i++) {
        this.getCampaignsCurrentAmount(this.campaigns[i]);
      }
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
