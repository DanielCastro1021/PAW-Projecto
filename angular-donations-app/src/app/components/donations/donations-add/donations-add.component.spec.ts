import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationsAddComponent } from './donations-add.component';

describe('DonationsAddComponent', () => {
  let component: DonationsAddComponent;
  let fixture: ComponentFixture<DonationsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonationsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
