import { ArretComponent } from './admin/arret/arret.component';
import { VoyageComponent } from './agent-de-planification/voyage/voyage.component';
import { ModifierServiceComponent } from './admin/modifier-service/modifier-service.component';
import { ServiceComponent } from './admin/service/service.component';
import { ModifierLigneComponent } from './admin/modifier-ligne/modifier-ligne.component';
import { ModifierVehiculeComponent } from './admin/modifier-vehicule/modifier-vehicule.component';
import { VehiculeComponent } from './admin/vehicule/vehicule.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './user/profil/profil.component';
import { ListUsersComponent } from './admin/list-users/list-users.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { ModifierUserComponent } from './admin/modifier-user/modifier-user.component';
import { LigneComponent } from './admin/ligne/ligne.component';
import { SecureInnerpageGuard } from './Guard/secure-innerpage.guard';
import { AuthGuard } from './Guard/auth.guard';
import { TypeComponent } from './admin/type/type.component';
import { ModifierTypeComponent } from './admin/modifier-type/modifier-type.component';
import { MarqueComponent } from './admin/marque/marque.component';
import { ModifierMarqueComponent } from './admin/modifier-marque/modifier-marque.component';
import { ModifierArretComponent } from './admin/modifier-arret/modifier-arret.component';
import { ListeVehiculesComponent } from './agent-de-planification/liste-vehicules/liste-vehicules.component';
import { VehiculesComponent } from './responsableTechnique/vehicules/vehicules.component';
import { VersementVehiculeComponent } from './reponsableEnergetique/versement-vehicule/versement-vehicule.component';
import { RapportComponent } from './ResponsableRh/rapport/rapport.component';
import { Rapport2Component } from './ResponsableRh/rapport2/rapport2.component';
import { TravailComponent } from './chauffeur/travail/travail.component';
import { Rapport3Component } from './ResponsableRh/rapport3/rapport3.component';


const routes: Routes = [
{ path: 'Inscription', component : RegisterComponent , canActivate:   [SecureInnerpageGuard]},
{ path: 'authentification', component : LoginComponent , canActivate:   [SecureInnerpageGuard]},
{path: 'list-users' , component :ListUsersComponent ,canActivate:[AuthGuard],data: {
  role: ['Admin']}},
{path : "modifier/:id" , component : ModifierUserComponent , canActivate:[AuthGuard] ,data: {
  role: ['Admin']
}},
{path : "modifierVehicule/:id" , component : ModifierVehiculeComponent , canActivate:[AuthGuard] , data: {
  role: ['Admin']
}},
{path : "modifierLigne/:id" , component : ModifierLigneComponent , canActivate:[AuthGuard] ,data: {
  role: ['Admin']
}},
{path : "modifierService/:id" , component : ModifierServiceComponent , canActivate:[AuthGuard] ,data: {
  role: ['Admin']
}},
{path : "modifierType/:id" , component : ModifierTypeComponent , canActivate:[AuthGuard] ,data: {
  role: ['Admin']
}},
{path : "modifierMarques/:id" , component : ModifierMarqueComponent , canActivate:[AuthGuard] ,data: {
  role: ['Admin']
}},

{path : "modifierArret/:id" , component : ModifierArretComponent , canActivate:[AuthGuard] ,data: {
  role: ['Admin']
}},
{path : 'admin' , component : DashboardAdminComponent , canActivate:[AuthGuard] ,data: {
  role: ['Admin']
}},

{path : "profile" , component :ProfilComponent ,canActivate:[AuthGuard],data: {
  role: ['Responsable RH','Admin','Agent de planification' ,'Responsable recette' ,'Responsable énergétique','Responsable technique' , 'Chauffeur']
}},
{path : "home" , component :HomeComponent
},
{path: 'vehicules' , component :VehiculeComponent ,canActivate:[AuthGuard], data: {
 role: ['Admin']
}},
{path: 'lignes' , component :LigneComponent , canActivate:[AuthGuard] ,data: {
 role: ['Admin']
}},
{path: 'types' , component :TypeComponent  , canActivate:[AuthGuard] ,data: {
  role: ['Admin']
 }},

 {path: 'marques' , component :MarqueComponent  , canActivate:[AuthGuard] ,data: {
  role: ['Admin']
 }},
{path: 'services' , component :ServiceComponent , canActivate:[AuthGuard] ,data: {
 role: ['Admin']
}},
{path: 'arrets' , component :ArretComponent , canActivate:[AuthGuard] ,data: {
  role: ['Admin']
 }},
{
  path: 'voyages' , component :VoyageComponent, canActivate:[AuthGuard],data: {
    role: ['Agent de planification' , 'Responsable recette']
   }
},
{path: 'liste_vehicules' , component :ListeVehiculesComponent, canActivate:[AuthGuard],data: {
  role: ['Agent de planification']
 }},
 {path: 'liste_vehicules_en_pannes' , component :VehiculesComponent, canActivate:[AuthGuard],data: {
  role: ['Responsable technique']

}},

{path: 'versements_vehicules' , component :VersementVehiculeComponent, canActivate:[AuthGuard],data: {
  role: ['Responsable énergétique']
 }},
 {path: 'rapports' , component :RapportComponent , canActivate:[AuthGuard] ,data: {
  role: ['Responsable RH']
 }},
 {path: 'rapports_vehicule' , component :Rapport2Component , canActivate:[AuthGuard] ,data: {
  role: ['Responsable RH']
 }},
 {path: 'rapports_recette' , component :Rapport3Component , canActivate:[AuthGuard] ,data: {
  role: ['Responsable RH']
 }},

 {path: 'affectation' , component :TravailComponent , canActivate:[AuthGuard] ,data: {
  role: ['Chauffeur']
 }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
