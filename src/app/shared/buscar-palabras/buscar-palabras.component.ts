import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-buscar-palabras',
  templateUrl: './buscar-palabras.component.html',
  styleUrls: ['./buscar-palabras.component.css']
})
export class BuscarPalabrasComponent implements OnInit {
  search = new FormControl('');
  @Output('search') searchEmiter = new EventEmitter<string>()
  constructor() {}

  ngOnInit(): void {
    this.search.valueChanges.subscribe(value=>this.searchEmiter.emit());
  }
}
