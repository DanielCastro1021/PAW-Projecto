import { Component, OnInit, Input } from '@angular/core';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/models/Campaign';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.component.html',
  styleUrls: ['./campaign-add.component.css']
})
export class CampaignAddComponent implements OnInit {
  @Input() campaignData: Campaign = new Campaign();
  responsibles: any = [];
  logoImage: File = null;

  private url = 'http://localhost:3000/api/v1/images/upload';

  constructor(
    public service: RestCampaignsService,
    public service2: ValidationService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  /**
   * This function stores the select logo in the variable fileData.
   * @param event This represents the event of selecting a logo for the campaign.
   */
  fileProgress(event: any): void {
    this.logoImage = event.target.files[0] as File;
  }

  /**
   * This function saves in the REST API, the new campaign and the respective logo.
   */
  onSubmit(): void {
    if (this.service2.validateLogo(this.logoImage)) {
      const formData = new FormData();
      formData.append('file', this.logoImage);
      console.log(formData);
      this.http
        .post(this.url, formData, {
          reportProgress: true,
          observe: 'events'
        })
        .subscribe(events => {
          if (events.type === HttpEventType.UploadProgress) {
            console.log(
              'Upload progress: ',
              Math.round((events.loaded / events.total) * 100) + '%'
            );
          } else if (events.type === HttpEventType.Response) {
            console.log(events);

            this.saveCampaign(events.body);
          }
        });
    }
  }

  /**
   * This function saves the variables of the new campaign in the REST API.
   */
  saveCampaign(logoPath): void {
    if (this.validateCampaign()) {
      this.campaignData.logo = logoPath;
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

  /**
   * This function validates all variables of the campaign to add.
   */
  validateCampaign(): boolean {
    return (
      this.service2.validateName(this.campaignData.name) &&
      this.service2.validateDescription(this.campaignData.description) &&
      this.service2.validateGoalAmount(this.campaignData.goalAmount) &&
      this.service2.validateIBAN(this.campaignData.iban) &&
      this.service2.validateResponsibles(this.responsibles) &&
      this.service2.validateLogo(this.logoImage)
    );
  }
}
