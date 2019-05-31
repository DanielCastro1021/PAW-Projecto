import { Component, OnInit } from '@angular/core';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { Campaign } from 'src/app/models/Campaign';

@Component({
  selector: 'app-campaigns-show',
  templateUrl: './campaigns-show.component.html',
  styleUrls: ['./campaigns-show.component.css']
})
export class CampaignsShowComponent implements OnInit {
  campaigns: Campaign[];

  constructor(public service: RestCampaignsService) {}

  ngOnInit() {
    this.serviceGetActiveCampaigns();
  }

  serviceGetActiveCampaigns(): void {
    this.service.getActiveCampaigns().subscribe((data: Campaign[]) => {
      this.campaigns = data;
    });
  }
}
