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


@NgModule({
  declarations: [
    AppComponent,
    MarketplaceComponent,
    PanierComponent,
    FrontComponent,
    BackComponent,
    UnauthorizedComponent,
    PendingUsersComponent,
    LoanManagementComponent,
    LoanApplicationComponent,
    LoanInfoComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    UsersModule,
    FormsModule
  ],
  providers: [AuthService, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
