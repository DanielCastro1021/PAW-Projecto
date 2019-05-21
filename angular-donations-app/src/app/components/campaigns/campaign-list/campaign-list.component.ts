import { Component, OnInit } from '@angular/core';
import { Campaign } from 'src/app/models/Campaign';
import { RestService } from 'src/app/services/rest/rest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign-list',
  templateUrl: './campaign-list.component.html',
  styleUrls: ['./campaign-list.component.css']
})
export class CampaignListComponent implements OnInit {
  campaigns: any = [];

  constructor(
    public service: RestService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCampaigns();
  }

  getCampaigns() {
    this.campaigns = [];
    this.service.getCampaigns().subscribe((data: {}) => {
      console.log(data);
      this.campaigns = data;
    });
  }
  add() {
    this.router.navigate(['/campaign-add']);
  }

  delete(id) {
    this.service.deleteCampaign(id).subscribe(
      res => {
        this.getCampaigns();
      },
      err => {
        console.log(err);
      }
    );
  }
}
