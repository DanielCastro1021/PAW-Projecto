import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor } from './helper/jwt.interceptor';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { DonationsListComponent } from './components/donations/donations-list/donations-list.component';
import { DonationsAddComponent } from './components/donations/donations-add/donations-add.component';
import { DonationsDetailsComponent } from './components/donations/donations-details/donations-details.component';
import { CampaignListComponent } from './components/campaigns/campaign-list/campaign-list.component';
import { CampaignAddComponent } from './components/campaigns/campaign-add/campaign-add.component';
import { CampaignDetailsComponent } from './components/campaigns/campaign-details/campaign-details.component';
import { CampaignEditComponent } from './components/campaigns/campaign-edit/campaign-edit.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    CampaignListComponent,
    CampaignAddComponent,
    CampaignDetailsComponent,
    CampaignEditComponent,
    DonationsListComponent,
    DonationsAddComponent,
    DonationsDetailsComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
