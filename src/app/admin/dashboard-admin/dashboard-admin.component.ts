import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  page : string = "users";
  ngOnInit(): void {
  }

   PageNavigation(newPage: string) {// utilisé pour mettre à jour la propriété page du composant avec la nouvelle page active.
    this.page = newPage
  }

}

