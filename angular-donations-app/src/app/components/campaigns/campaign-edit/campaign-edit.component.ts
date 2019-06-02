import { Component, OnInit, Input } from '@angular/core';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ValidationService } from 'src/app/services/validation/validation.service';

@Component({
  selector: 'app-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.css']
})
export class CampaignEditComponent implements OnInit {
  private url = 'http://localhost:3000/api/v1/images/upload';
  @Input() campaignData: any = {
    name: '',
    description: '',
    goalAmount: 0,
    iban: '',
    responsibles: []
  };
  logoImage: File = null;

  constructor(
    public service: RestCampaignsService,
    public service2: ValidationService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.serviceInitializeCampaign();
  }
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

            this.updateCampaign(events.body);
          }
        });
    }
  }

  updateCampaign(logoPath): void {
    if (this.validateCampaign()) {
      this.campaignData.logo = logoPath;
      this.service
        .updateCampaign(this.route.snapshot.params.id, this.campaignData)
        .subscribe(
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
   * This function gets the current campaign information, fro the REST API.
   */
  serviceInitializeCampaign(): void {
    this.service
      .getActiveCampaign(this.route.snapshot.params['id'])
      .subscribe((data: {}) => {
        this.campaignData = data;
      });
  }

  /**
   * This function updates the current campaign, in the REST API.
   */
  serviceUpdateCampaign(): void {
    this.service
      .updateCampaign(this.route.snapshot.params['id'], this.campaignData)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/book-details', res._id]);
        },
        err => {
          console.log(err);
        }
      );
  }

  /**
   * This function validates all variables of the campaign to edit.
   */
  validateCampaign(): boolean {
    return (
      this.service2.validateName(this.campaignData.name) &&
      this.service2.validateDescription(this.campaignData.description) &&
      this.service2.validateGoalAmount(this.campaignData.goalAmount) &&
      this.service2.validateIBAN(this.campaignData.iban) &&
      this.service2.validateResponsibles(this.campaignData.responsibles) &&
      this.service2.validateLogo(this.logoImage)
    );
  }
}
