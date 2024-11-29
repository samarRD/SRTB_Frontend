import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './user/login/login.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ModifierUserComponent } from './admin/modifier-user/modifier-user.component';
import { ProfilComponent } from './user/profil/profil.component';
import { HomeComponent } from './home/home.component';
import { VehiculeComponent } from './admin/vehicule/vehicule.component';
import { ModifierVehiculeComponent } from './admin/modifier-vehicule/modifier-vehicule.component';
import { LigneComponent } from './admin/ligne/ligne.component';
import { ModifierLigneComponent } from './admin/modifier-ligne/modifier-ligne.component';
import { ServiceComponent } from './admin/service/service.component';
import { ModifierServiceComponent } from './admin/modifier-service/modifier-service.component';
import { VoyageComponent } from './agent-de-planification/voyage/voyage.component';
import { TypeComponent } from './admin/type/type.component';
import { MarqueComponent } from './admin/marque/marque.component';
import { ModifierTypeComponent } from './admin/modifier-type/modifier-type.component';
import { ModifierMarqueComponent } from './admin/modifier-marque/modifier-marque.component';
import { ArretComponent } from './admin/arret/arret.component';
import { ModifierArretComponent } from './admin/modifier-arret/modifier-arret.component';
import { ListeVehiculesComponent } from './agent-de-planification/liste-vehicules/liste-vehicules.component';
import { VehiculesComponent } from './responsableTechnique/vehicules/vehicules.component';
import { VersementVehiculeComponent } from './reponsableEnergetique/versement-vehicule/versement-vehicule.component';
import { RapportComponent } from './ResponsableRh/rapport/rapport.component';
import { Rapport2Component } from './ResponsableRh/rapport2/rapport2.component';
import { TravailComponent } from './chauffeur/travail/travail.component';
import { Rapport3Component } from './ResponsableRh/rapport3/rapport3.component';

@NgModule({
  declarations: [

    AppComponent,
    RegisterComponent,
    LoginComponent,
    ListUsersComponent,
    SidebarComponent,
    DashboardAdminComponent,
    ModifierUserComponent,
    ProfilComponent,
    HomeComponent,
    VehiculeComponent,
    ModifierVehiculeComponent,
    LigneComponent,
    ModifierLigneComponent,
    ServiceComponent,
    ModifierServiceComponent,
    VoyageComponent,
    TypeComponent,
    MarqueComponent,
    ModifierTypeComponent,
    ModifierMarqueComponent,
    ArretComponent,
    ModifierArretComponent,
    ListeVehiculesComponent,
    VehiculesComponent,
    VersementVehiculeComponent,
    RapportComponent,
    Rapport2Component,
    TravailComponent,
    Rapport3Component,



  ],
  imports: [

    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,FormsModule,HttpClientModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
