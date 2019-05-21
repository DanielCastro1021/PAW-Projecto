import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/Campaign';
import { RestService } from 'src/app/services/rest/rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent implements OnInit {
  campaign: any;
  constructor(
    public service: RestService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.service
      .getCampaign(this.route.snapshot.params['id'])
      .subscribe((data: {}) => {
        console.log(data);
        this.campaign = data;
      });
  }
}
