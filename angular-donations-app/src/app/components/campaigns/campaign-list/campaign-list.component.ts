import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/Campaign';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns: any;

  constructor(public service: RestCampaignsService) {}

  ngOnInit() {
    this.getCampaigns();
  }

  /**
   *
   */
  getCampaigns() {
    this.service.getActiveCampaigns().subscribe((data: {}) => {
      this.campaigns = [];
      this.campaigns = data;
    });
  }
}
