import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { AdminGuard } from './guards/authentication/admin.guard';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { CampaignListComponent } from './components/campaigns/campaign-list/campaign-list.component';
import { CampaignDetailsComponent } from './components/campaigns/campaign-details/campaign-details.component';
import { CampaignAddComponent } from './components/campaigns/campaign-add/campaign-add.component';
import { CampaignEditComponent } from './components/campaigns/campaign-edit/campaign-edit.component';
import { DonationsListComponent } from './components/donations/donations-list/donations-list.component';
import { DonationsAddComponent } from './components/donations/donations-add/donations-add.component';
import { DonationsDetailsComponent } from './components/donations/donations-details/donations-details.component';
import { CampaignsShowComponent } from './components/website/campaigns-show/campaigns-show.component';
import { CampaignShowDetailsComponent } from './components/website/campaign-show-details/campaign-show-details.component';
import { DashboardComponent } from './components/website/dashboard/dashboard.component';
import { ProfileEditComponent } from './components/user/profile-edit/profile-edit.component';
import { LoggedGuard } from './guards/authentication/logged.guard';

const routes: Routes = [
  {
    path: 'home',
    component: CampaignsShowComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'profile-edit/:id',
    component: ProfileEditComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedGuard]
  },
  {
    path: 'campaigns/:status',
    component: CampaignListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'campaign-add',
    component: CampaignAddComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'campaign-edit/:id',
    component: CampaignEditComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'campaign-details/:id',
    component: CampaignDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'donations/:status',
    component: DonationsListComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'donation-add',
    component: DonationsAddComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'donation-details/:id',
    component: DonationsDetailsComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'campaign-show-details/:id',
    component: CampaignShowDetailsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AdminGuard]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
