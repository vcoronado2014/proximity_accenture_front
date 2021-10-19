import { Component, OnInit } from '@angular/core';
//AGREAMOS EL ENVIRONMENT
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
    },
      error => {
        console.log(error);
      }
    );
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
