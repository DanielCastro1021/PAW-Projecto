import { Component, OnInit, Input } from '@angular/core';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/models/Campaign';

@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.component.html',
  styleUrls: ['./campaign-add.component.css']
})
export class CampaignAddComponent implements OnInit {
  @Input() campaignData: Campaign = new Campaign();

  responsibles: any = [];

  private showErrorName = false;
  private showErrorDescription = false;
  private showErrorIBAN = false;
  private showErrorGoalAmount = false;
  private showErrorResponsible = false;
  fileData: File = null;
  constructor(public service: RestCampaignsService, private router: Router) {}

  ngOnInit() {}

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }
  saveCampaign(): void {
    if (this.validateCampaign()) {
      this.campaignData.responsibles = this.responsibles;
      this.service.addCampaign(this.campaignData).subscribe(
        result => {
          this.router.navigate(['/campaign-details/' + result._id]);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  validateCampaign(): boolean {
    return (
      this.validateName() &&
      this.validateDescription() &&
      this.validateGoalAmount() &&
      this.validateIBAN() &&
      this.validateResponsible()
    );
  }

  validateName(): boolean {
    if (this.campaignData.name === undefined) {
      this.showErrorName = true;
      return false;
    } else {
      this.showErrorName = false;
      return this.campaignData.name.length > 0;
    }
  }

  validateDescription(): boolean {
    if (this.campaignData.description === undefined) {
      this.showErrorDescription = true;
      return false;
    } else {
      this.showErrorDescription = false;
      return this.campaignData.description.length > 0;
    }
  }

  validateGoalAmount(): boolean {
    if (this.campaignData.goalAmount === undefined) {
      this.showErrorGoalAmount = true;
      return false;
    } else {
      this.showErrorGoalAmount = false;
      return this.campaignData.goalAmount > 0;
    }
  }

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

  validateResponsible(): boolean {
    this.removeSpaces();
    if (this.responsibles === undefined || this.responsibles.length === 0) {
      this.showErrorResponsible = true;
      return false;
    } else {
      this.showErrorResponsible = false;
      return true;
    }
  }

  removeSpaces(): void {
    this.responsibles = this.responsibles.filter(str => {
      return /\S/.test(str);
    });
  }
}
