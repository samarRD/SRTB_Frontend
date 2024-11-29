import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor() { }
  page = 'users;'

  @Output() pageName = new EventEmitter<string>();//est une propriété de sortie de type EventEmitter<string>. Elle émet le nom de la page lorsque la méthode change est appelée

  ngOnInit(): void {
  }

  change(nom:string){
    this.page = nom;
    this.pageName.emit(this.page) //est utilisée pour émettre le nom de la page active à l'aide de la propriété de sortie pageName

  }

}



