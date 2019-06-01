import { Component, OnInit, Input } from '@angular/core';
import { RestCampaignsService } from 'src/app/services/rest/rest-campaigns.service';
import { Router } from '@angular/router';
import { Campaign } from 'src/app/models/Campaign';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.component.html',
  styleUrls: ['./campaign-add.component.css']
})
export class CampaignAddComponent implements OnInit {
  @Input() campaignData: Campaign = new Campaign();
  responsibles: any = [];
  private url = 'http://localhost:3000/api/v1/images/upload';

  constructor(
    public service: RestCampaignsService,
    private router: Router,
    private http: HttpClient
  ) {}
  fileData: File = null;

  ngOnInit() {}

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.fileData);
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

  /**
   *
   */

  saveCampaign(filePath): void {
    const formData = new FormData();
    if (this.validateCampaign()) {
      this.campaignData.logo = filePath;
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
   *
   */
  validateCampaign(): boolean {
    return (
      this.validateName() &&
      this.validateDescription() &&
      this.validateGoalAmount() &&
      this.validateIBAN() &&
      this.validateResponsible() &&
      this.fileData !== null
    );
  }

  /**
   *
   */
  validateName(): boolean {
    if (this.campaignData.name === undefined) {
      alert('Name parameter must be filled!!!');
      return false;
    } else {
      return this.campaignData.name.length > 0;
    }
  }

  /**
   *
   */
  validateDescription(): boolean {
    if (this.campaignData.description === undefined) {
      alert('Description parameter must be filled!!!');
      return false;
    } else {
      return this.campaignData.description.length > 0;
    }
  }

  /**
   *
   */
  validateGoalAmount(): boolean {
    if (this.campaignData.goalAmount === undefined) {
      alert('Goal amount parameter must be filled!!!');
      return false;
    } else {
      return this.campaignData.goalAmount > 0;
    }
  }

  /**
   *
   */
  validateIBAN(): boolean {
    if (this.campaignData.iban === undefined) {
      alert('IBAN  parameter must be filled!!!');
      return false;
    } else {
      this.campaignData.iban = this.campaignData.iban.toUpperCase();
      return this.campaignData.iban.length > 0;
    }
  }

  /**
   *
   */
  validateResponsible(): boolean {
    this.removeSpaces();
    if (this.responsibles === undefined || this.responsibles.length === 0) {
      alert('I must exist at least on responsible of this campaign!!!');
      return false;
    } else {
      return true;
    }
  }

  /**
   *
   */
  removeSpaces(): void {
    this.responsibles = this.responsibles.filter(str => {
      return /\S/.test(str);
    });
  }
}
