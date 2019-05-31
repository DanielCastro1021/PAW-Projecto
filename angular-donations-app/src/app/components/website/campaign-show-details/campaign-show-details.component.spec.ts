import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignShowDetailsComponent } from './campaign-show-details.component';

describe('CampaignDetailsComponent', () => {
  let component: CampaignShowDetailsComponent;
  let fixture: ComponentFixture<CampaignShowDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignShowDetailsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
