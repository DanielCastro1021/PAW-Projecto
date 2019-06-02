import { Component, OnInit, Input } from '@angular/core';
import { Donation } from 'src/app/models/Donation';
import { RestDonationsService } from 'src/app/services/rest/rest-donations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { debug } from 'util';

@Component({
  selector: 'app-donations-add',
  templateUrl: './donations-add.component.html',
  styleUrls: ['./donations-add.component.css']
})
export class DonationsAddComponent implements OnInit {
  @Input() donationData: Donation = new Donation();

  constructor(
    public service: RestDonationsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  /**
   * This function creates a donation and stores it in the database.
   */
  donate(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (this.validateInput()) {
      alert('You must donate something.');
    } else if (this.validateAmount()) {
      alert('Must donate at least 0.1 $');
      this.donationData.amount = undefined;
    } else if (currentUser) {
      this.donationData.campaign = this.route.snapshot.params['id'];
      this.donationData.username = currentUser.username;

      this.serviceAddDonation();
    } else {
      alert('To donate you need to be logged.');
    }
  }

  /**
   * This function saves the donation in the database using the RestDonationsService.
   */
  serviceAddDonation(): void {
    this.service.addDonation(this.donationData).subscribe(
      result => {
        this.router.navigate(['/donation-details/' + result._id]);
      },
      err => {
        console.log(err);
      }
    );
  }

  /**
   * This function validates if the amount in the input is filled.
   */
  validateInput(): boolean {
    return this.donationData.amount === undefined;
  }

  /**
   * This function validates if the amount is valid.
   */
  validateAmount(): boolean {
    return this.donationData.amount === 0;
  }
}
