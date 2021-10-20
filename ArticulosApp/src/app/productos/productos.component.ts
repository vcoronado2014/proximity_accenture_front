import { Component, OnInit } from '@angular/core';
//AGREAMOS EL ENVIRONMENT
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//para usar jquery
declare var $:any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos: any = [];

  constructor(
    private httpClient: HttpClient,
    ) {

     }

  ngOnInit() {
    this.getProductos().subscribe((data: any) => {
      this.productos = data;
      console.log(this.productos);
      //procesar con jquery
      this.procesarJquery(data);
    },
      error => {
        console.log(error);
      }
    );
  }
  procesarJquery(array){
    //usando grep https://api.jquery.com/jquery.grep/
    //busca los elementos de una matriz que cumplen la función de un filtro
    //la matriz original no se ve afectada

    //usando grep filtraremos todos los elementos que son perfumes
    let arrGrep = array;
    arrGrep = $.grep(arrGrep, function(n){
      return n.categoriaId == 2;
    });
    console.log(arrGrep);
    //--------------------------------------------------------------

    //usando map jquery https://api.jquery.com/jquery.map/
    //nos permite modificar los elementos de una matriz en una nueva matriz

    //en este ejemplo usando map, estamos retornando desde la matriz
    //original una nueva matriz con los elementos modificados
    //agregando un campo descuento
    let arrMap = $.map(array, function(n){
      let nuevo = {
        nombre: n.nombre.toUpperCase(),
        codigo: n.codigo.toUpperCase(),
        descuento: '10%',
        precioUnitario: n.precioUnitario - (n.precioUnitario * 0.1)
      };
      return  nuevo;
    });
    console.log(arrMap);
    //-------------------------------------------------------------------

    //each https://api.jquery.com/each/
    //Itera sobre un objeto JQuery, ejecutando una función para cada elemento coincidente

    //este ejemplo obtiene cada elemento li del dom y escribe por consola sus datos
    $('li').each(function( index ) {
      console.log( index + ": " + $( this ).text() );
    });
    //-----------------------------------------------------------------------------

    //Matriz original
    console.log(array);

  }

  private getProductos() {
    const headers = new Headers;
    headers.append('Access-Control-Allow-Origin', '*');
    let url = environment.API_ENDPOINT + 'Producto';
    let httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
    });
    httpHeaders.set('Access-Control-Allow-Origin', '*');
    let options = { headers: httpHeaders };

    let data = this.httpClient.get(url, options);
    return data;

}

}
