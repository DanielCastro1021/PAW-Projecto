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
  logoImage: File = null;

  private url = 'http://localhost:3000/api/v1/images/upload';

  constructor(
    public service: RestCampaignsService,
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
    if (this.validateLogo()) {
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
      this.validateName() &&
      this.validateDescription() &&
      this.validateGoalAmount() &&
      this.validateIBAN() &&
      this.validateResponsible() &&
      this.validateLogo()
    );
  }

  /**
   * This function validate the logo, of the campaign to add.
   */
  validateLogo(): boolean {
    if (this.logoImage === null) {
      alert('Please, insert a logo.');
      return false;
    } else {
      return true;
    }
  }

  /**
   * This function validate the name, of the campaign to add.
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
   * This function validate the description, of the campaign to add.
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
   * This function validate the goal amount set, for the campaign to add.
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
   * This function validates the iban, of the campaign to add.
   */
  validateIBAN(): boolean {
    if (this.campaignData.iban === undefined) {
      alert('IBAN must be filled!!!');
      return false;
    } else if (!this.isValidIBANNumber(this.campaignData.iban)) {
      alert('IBAN must be valid!!!');
      return false;
    } else {
      this.campaignData.iban = this.campaignData.iban.toUpperCase();
      return true;
    }
  }

  /**
   * This function validates the array of responsibles, of the campaign to add.
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
   * This function removes the empty values of the responsibles.
   */
  removeSpaces(): void {
    this.responsibles = this.responsibles.filter(str => {
      return /\S/.test(str);
    });
  }

  /**
   *
   * @param input
   */
  isValidIBANNumber(input): boolean {
    let CODE_LENGTHS = {
      AD: 24,
      AE: 23,
      AT: 20,
      AZ: 28,
      BA: 20,
      BE: 16,
      BG: 22,
      BH: 22,
      BR: 29,
      CH: 21,
      CR: 21,
      CY: 28,
      CZ: 24,
      DE: 22,
      DK: 18,
      DO: 28,
      EE: 20,
      ES: 24,
      FI: 18,
      FO: 18,
      FR: 27,
      GB: 22,
      GI: 23,
      GL: 18,
      GR: 27,
      GT: 28,
      HR: 21,
      HU: 28,
      IE: 22,
      IL: 23,
      IS: 26,
      IT: 27,
      JO: 30,
      KW: 30,
      KZ: 20,
      LB: 28,
      LI: 21,
      LT: 20,
      LU: 20,
      LV: 21,
      MC: 27,
      MD: 24,
      ME: 22,
      MK: 19,
      MR: 27,
      MT: 31,
      MU: 30,
      NL: 18,
      NO: 15,
      PK: 24,
      PL: 28,
      PS: 29,
      PT: 25,
      QA: 29,
      RO: 24,
      RS: 22,
      SA: 24,
      SE: 24,
      SI: 19,
      SK: 24,
      SM: 27,
      TN: 24,
      TR: 26
    };

    let iban = input.toUpperCase().replace(/[^A-Z0-9]/g, ''),
      code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/),
      digits;

    if (!code || iban.length !== CODE_LENGTHS[code[1]]) {
      return false;
    }

    digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, letter => {
      return letter.charCodeAt(0) - 55;
    });

    return this.mod97(digits) === 1;
  }

  /**
   *
   * @param string
   */
  mod97(string: any): number {
    let checksum = string.slice(0, 2),
      fragment;

    for (let offset = 2; offset < string.length; offset += 7) {
      fragment = checksum + string.substring(offset, offset + 7);
      checksum = parseInt(fragment, 10) % 97;
    }

    return checksum;
  }
}
