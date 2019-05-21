import { Component, OnInit, Input } from '@angular/core';
import { RestService } from 'src/app/services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Campaign } from 'src/app/models/Campaign';

@Component({
  selector: 'app-campaign-add',
  templateUrl: './campaign-add.component.html',
  styleUrls: ['./campaign-add.component.css']
})
export class CampaignAddComponent implements OnInit {
  @Input() campaignData: Campaign = new Campaign();

  constructor(
    public service: RestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}

  addProduct() {
    this.service.addCampaign(this.campaignData).subscribe(
      result => {
        this.router.navigate(['/product-details/' + result.__id]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
