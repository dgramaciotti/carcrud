import { Component, OnInit, ViewChild} from '@angular/core';
import {RestActionsService} from '../rest-actions.service'
import {MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.css']
})
export class ViewComponentComponent implements OnInit {
  constructor(private service: RestActionsService){}
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Array<Object>>;
  displayedColumns: string[] = ['id','placa','chassi','renavam','modelo','marca','ano'];

  listaCarros;
  controle;

  ngOnInit(){
    //READ - GET
    this.service.read().subscribe(res => {
      this.listaCarros = res
      this.dataSource = new MatTableDataSource(this.listaCarros);
      this.dataSource.paginator = this.paginator;
    })
    this.controle = 0;
  }
  //Utilizado para substituir entre as funcionalidades
  addClick(){
    this.controle=1;
    document.getElementById('add').classList.add('selected')
    document.getElementById('upd').classList.remove('selected')
    document.getElementById('del').classList.remove('selected')
  }
  updateClick(){
    this.controle=2;
    document.getElementById('add').classList.remove('selected')
    document.getElementById('upd').classList.add('selected')
    document.getElementById('del').classList.remove('selected')
  }
  delClick(){
    this.controle=3;
    document.getElementById('add').classList.remove('selected')
    document.getElementById('upd').classList.remove('selected')
    document.getElementById('del').classList.add('selected')
  }

  addCarro(carro){
    //CREATE - POST - Local e request
    var maxid = 0;
    this.listaCarros.map(function(obj){
      if (obj.id > maxid) maxid = obj.id;
    });
    carro.id = maxid+1;
    this.listaCarros.push(carro);
    this.dataSource.data = this.listaCarros;
    this.table.renderRows();

    this.service.create(carro).subscribe(res => console.log(res));
  }
  delCarro(id){
    //DELETE - Local e request
    console.log(id);
    this.listaCarros = this.listaCarros.filter(aux =>  {
      return aux.id != id;
    })
    this.dataSource.data = this.listaCarros;

    this.service.delete(id).subscribe(res => console.log(res));
  }
  updateCarro(carro){
    //UPDATE - PUT - Local e request
    var posicao = this.listaCarros.findIndex(aux => aux.id == carro.id);
    for (var index in this.listaCarros[posicao]){
      if(carro[index]){
        this.listaCarros[posicao][index] = carro[index];
      }
    }
    this.dataSource.data = this.listaCarros;

    this.service.update(carro).subscribe(res => console.log(res));
  }
}
