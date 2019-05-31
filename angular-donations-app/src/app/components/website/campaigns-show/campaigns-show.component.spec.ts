import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsShowComponent } from './campaigns-show.component';

describe('CampaignsShowComponent', () => {
  let component: CampaignsShowComponent;
  let fixture: ComponentFixture<CampaignsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
