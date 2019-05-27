import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/Campaign';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { RestService } from 'src/app/services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Donation } from 'src/app/models/Donation';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {
  campaign: any;
  donations: any;
  showDetails = false;
  totalDonated: number;

  constructor(
    public service: RestCampaignsService,
    public service2: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCampaign();
    this.getDonations();
  }

  /**
   *
   */
  getCampaign() {
    this.service
      .getActiveCampaign(this.route.snapshot.params['id'])
      .subscribe((data: {}) => {
        this.campaign = data;
      });
  }

  /**
   *
   */
  getDonations() {
    this.service2
      .getDonations(this.route.snapshot.params['id'])
      .subscribe((data: {}) => {
        this.donations = data;
        if (this.donations.length === 0) {
          this.donations = undefined;
        }
      });
  }

  /**
   *
   * @param id
   */
  deleteCampaign(id: string) {
    if (this.donations === undefined) {
      console.log('Deleting ... ');
      this.service.deleteCampaign(id).subscribe(
        res => {
          this.getCampaign();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      console.log('Cant delete this campaign, because it has donations. ');
    }
  }

  /**
   *
   * @param id
   */
  deactivateCampain(id: string) {
    if (this.donations !== undefined) {
      console.log('Deactivating ... ');
      this.campaign.status = 'deactivated';
      console.log(this.campaign);
      this.service.updateCampaign(id, this.campaign).subscribe(
        res => {
          this.router.navigate(['/campaigns']);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      console.log(
        'Cant deactivate this campaign, because it has no donations. '
      );
    }
  }
}
