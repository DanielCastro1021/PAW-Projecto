import { Component, OnInit } from '@angular/core';
import { Donation } from 'src/app/models/Donation';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-donations-details',
  templateUrl: './donations-details.component.html',
  styleUrls: ['./donations-details.component.css']
})
export class DonationsDetailsComponent implements OnInit {
  donation: Donation = new Donation();

  constructor(
    public service: RestDonationsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceOnInitDonation();
  }

  /**
   *
   * @param id
   */
  processDonation(id: string) {
    if (this.donation.status === 'in processing') {
      this.donation.status = 'processed';
      this.serviceUpdateDonation(id);
    } else {
      console.log('Cant process this donation. ');
    }
  }

  /**
   *
   * @param id
   */
  cancelDonation(id: string) {
    if (this.donation.status === 'in processing') {
      this.donation.status = 'canceled';
      this.serviceUpdateDonation(id);
    } else {
      console.log('Cant cancel this donation. ');
    }
  }

  /**
   *
   */
  serviceOnInitDonation() {
    this.service
      .getDonation(this.route.snapshot.params['id'])
      .subscribe((data: Donation) => {
        this.donation = data;
      });
  }

  /**
   *
   * @param id
   */
  serviceUpdateDonation(id: string) {
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
}
