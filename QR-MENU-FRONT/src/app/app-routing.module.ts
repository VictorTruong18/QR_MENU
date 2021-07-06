import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoixAbonnementComponent } from './pages/choix-abonnement/choix-abonnement.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'confirmationEmail', component: EmailConfirmationComponent},
  {path: 'choixAbonnement', component: ChoixAbonnementComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
