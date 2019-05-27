import { Component, OnInit, Input } from '@angular/core';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {
  @Input() campaignData: any = {
    name: '',
    description: '',
    goalAmount: 0,
    iban: '',
    responsibles: [],
    logo: ''
  };
  @Input() logo: File;

  showErrorName = false;
  showErrorDescription = false;
  showErrorIBAN = false;
  showErrorGoalAmount = false;
  showErrorResponsible = false;

  constructor(
    public service: RestCampaignsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.serviceInitializeCampaign();
    console.log(this.campaignData);
  }

  /**
   *
   */
  updateCampaign(): void {
    if (this.validateCampaign()) {
      this.serviceUpdateCampaign();
    }
  }

  /**
   *
   */
  serviceInitializeCampaign(): void {
    this.service
      .getActiveCampaign(this.route.snapshot.params['id'])
      .subscribe((data: {}) => {
        console.log(data);
        this.campaignData = data;
      });
  }

  /**
   *
   */
  serviceUpdateCampaign(): void {
    this.service
      .updateCampaign(this.route.snapshot.params['id'], this.campaignData)
      .subscribe(
        result => {
          this.router.navigate(['/campaign-details/' + result.__id]);
        },
        err => {
          console.log(err);
        }
      );
  }

  /**
   *
   */
  validateCampaign(): boolean {
    return (
      this.validateName() &&
      this.validateDescription() &&
      this.validateGoalAmount() &&
      this.validateIBAN() &&
      this.validateResponsibles()
    );
  }

  /**
   *
   */
  validateName(): boolean {
    if (this.campaignData.name === undefined) {
      this.showErrorName = true;
      return false;
    } else {
      this.showErrorName = false;
      return this.campaignData.name.length > 0;
    }
  }

  /**
   *
   */
  validateDescription(): boolean {
    if (this.campaignData.description === undefined) {
      this.showErrorDescription = true;
      return false;
    } else {
      this.showErrorDescription = false;
      return this.campaignData.description.length > 0;
    }
  }

  /**
   *
   */
  validateGoalAmount(): boolean {
    if (this.campaignData.goalAmount === undefined) {
      this.showErrorGoalAmount = true;
      return false;
    } else {
      this.showErrorGoalAmount = false;
      return this.campaignData.goalAmount > 0;
    }
  }

  /**
   *
   */
  validateIBAN(): boolean {
    if (this.campaignData.iban === undefined) {
      this.showErrorIBAN = true;
      return false;
    } else {
      this.showErrorIBAN = false;
      this.campaignData.iban = this.campaignData.iban.toUpperCase();
      return this.campaignData.iban.length > 0;
    }
  }

  /**
   *
   */
  validateResponsibles(): boolean {
    this.removeSpaces();
    if (
      this.campaignData.responsibles === undefined ||
      this.campaignData.length === 0
    ) {
      this.showErrorResponsible = true;
      return false;
    } else {
      this.showErrorResponsible = false;
      return true;
    }
  }

  /**
   *
   */
  removeSpaces(): void {
    this.campaignData.responsibles = this.campaignData.responsibles.filter(
      str => {
        return /\S/.test(str);
      }
    );
    console.log(this.campaignData.responsibles);
  }
}
