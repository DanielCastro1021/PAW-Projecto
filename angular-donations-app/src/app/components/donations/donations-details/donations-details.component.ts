import { Component, OnInit } from '@angular/core';
import { Donation } from 'src/app/models/Donation';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from 'src/app/models/Campaign';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';

@Component({
  selector: 'app-donations-details',
  templateUrl: './donations-details.component.html',
  styleUrls: ['./donations-details.component.css']
})
export class DonationsDetailsComponent implements OnInit {
  donation: Donation = new Donation();
  campaignName: string;

  constructor(
    public service: RestDonationsService,
    public service2: RestCampaignsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceOnInitDonation();
  }

  /**
   * This function gets the information of the current donation, from the REST API.
   */
  serviceOnInitDonation(): void {
    this.service
      .getDonation(this.route.snapshot.params['id'])
      .subscribe((data: Donation) => {
        this.donation = data;
        this.serviceGetCampaignOfDonation();
      });
  }

  /**
   * This function updates the current donation, in the REST API.
   * @param id This is an string with the Object.Id of a donations, stored in the database.
   */
  serviceUpdateDonation(id: string): void {
    this.service.updateDonation(id, this.donation).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/donations']);
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * This function obtains the name that this donation was made to.
   */
  serviceGetCampaignOfDonation(): void {
    this.service2
      .getCampaign(this.donation.campaign)
      .subscribe((data: Campaign) => {
        this.campaignName = data.name;
      });
  }

  /**
   * This function processes a donations.
   * @param id This is an string with the Object.Id of a donations, stored in the database.
   */
  processDonation(id: string): void {
    if (this.donation.status === 'in processing') {
      this.donation.status = 'processed';
      this.serviceUpdateDonation(id);
    } else {
      console.log('Cant process this donation. ');
    }
  }

  /**
   * This function cancels a donations.
   * @param id This is an string with the Object.Id of a donations, stored in the database.
   */
  cancelDonation(id: string): void {
    if (this.donation.status === 'in processing') {
      this.donation.status = 'canceled';
      this.serviceUpdateDonation(id);
    } else {
      console.log('Cant cancel this donation. ');
    }
  }
}
