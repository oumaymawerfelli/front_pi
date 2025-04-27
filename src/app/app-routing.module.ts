import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';

import { RegisterComponent } from './users/register/register.component';
import { LoginComponent } from './users/login/login.component';
import { BackComponent } from './component/back/back.component';
import { AdminGuard } from './guards/admin.guard';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ProfileComponent } from './users/profile/profile.component';
import { OAuth2RedirectComponent } from './users/oauth2-redirect/oauth2-redirect.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { StatPostComponent } from './stat-post/stat-post.component';

const routes: Routes = [

    // Redirection par défaut vers 'home'
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Default route
  {
    path: 'landing',
    component: LandingComponent,
    children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ],
  }, // /landing route

  {
    path: 'admin',
    component: BackComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'profile', component: ProfileComponent },
      {
        path: 'users',
        component: ListUsersComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'pending-users',
        component: PendingUsersComponent,
        canActivate: [AdminGuard],
      },
    ],
  },

  {
    path: 'home',
    component: HomeComponent,

    children: [
      { path: 'profile', component: ProfileComponent },
      { path: 'post', component: PostComponent },
      { path: 'statPost', component: StatPostComponent }, //  a ajouter dans  backoffice module routing


    ],
  },


  { path: 'oauth2-redirect', component: OAuth2RedirectComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
