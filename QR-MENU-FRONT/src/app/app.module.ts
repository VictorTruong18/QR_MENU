import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './pages/menu/menu.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { RegisterComponent } from './pages/register/register.component';
import {FormsModule} from '@angular/forms';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { ChoixAbonnementComponent } from './pages/choix-abonnement/choix-abonnement.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RestaurantComponent } from './pages/restaurant/restaurant.component';
import { ErrorComponent } from './pages/error/error.component';
 

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    RegisterComponent,
    EmailConfirmationComponent,
    ChoixAbonnementComponent,
    DashboardComponent,
    RestaurantComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
