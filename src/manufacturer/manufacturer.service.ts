import { Injectable } from '@nestjs/common';
import { Manufacturer } from './manufacturer.entity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ManufacturerService {

    constructor(private httpClient: HttpClient) { }

  // metodos
  holaMundo(): string{
    return "Hola mundo";
  }

  obtenerProducto1(): Observable<Manufacturer> {
    return this.httpClient.get<Manufacturer>('https://fakestoreapi.com/Manufacturer/1');
  }

  // Obtener todos los productos:
  findAll(): Observable<Manufacturer[]> {
    return this.httpClient.get<Manufacturer[]>('https://fakestoreapi.com/Manufacturer');
  }
  // Obtener un producto por su id como parámetro:
  findById(id: number | string): Observable<Manufacturer> {
    // return this.httpClient.get<Product>(`https://fakestoreapi.com/products/${id}`);
    return this.httpClient.get<Manufacturer>('https://fakestoreapi.com/manufacturer/' + id);
  }

  // Método create para enviar un producto al API REST
  // Esto crearía un nuevo producto en base de datos
  create(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.httpClient.post<Manufacturer>('https://fakestoreapi.com/manufacturer', manufacturer);
  }

  // Método para actualizar un producto en el API REST
  update(id: number | string, manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.httpClient.put<Manufacturer>('https://fakestoreapi.com/manufacturer/' + id, manufacturer);
  }

  // Método para borrar un producto
  deleteById(id: number | string) {
    return this.httpClient.delete('https://fakestoreapi.com/manufacturer/' + id);
  }

}
