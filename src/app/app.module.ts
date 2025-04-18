import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MarketplaceComponent } from './marketplace/marketplace.component';
import { PanierComponent } from './panier/panier.component';
import { FrontComponent } from './component/front/front.component';
import { BackComponent } from './component/back/back.component';
import { UsersModule } from './users/users.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthService } from './core/services/auth.service';
import { AdminGuard } from './guards/admin.guard';
import { PendingUsersComponent } from './pending-users/pending-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
    AppComponent,
    MarketplaceComponent,
    PanierComponent,
    FrontComponent,
    BackComponent,
    UnauthorizedComponent,
    PendingUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    UsersModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSnackBarModule
  ],
  providers: [AuthService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
