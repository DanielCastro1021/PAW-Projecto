import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication/authentication.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { CampaignListComponent } from './components/campaigns/campaign-list/campaign-list.component';
import { CampaignDetailsComponent } from './components/campaigns/campaign-details/campaign-details.component';
import { CampaignAddComponent } from './components/campaigns/campaign-add/campaign-add.component';
import { CampaignEditComponent } from './components/campaigns/campaign-edit/campaign-edit.component';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'campaigns',
    component: CampaignListComponent
  },
  {
    path: 'campaign-add',
    component: CampaignAddComponent
  },
  {
    path: 'campaign-edit',
    component: CampaignEditComponent
  },
  {
    path: 'campaign-detail',
    component: CampaignDetailsComponent
  },
  { path: '**', redirectTo: 'campaigns' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}