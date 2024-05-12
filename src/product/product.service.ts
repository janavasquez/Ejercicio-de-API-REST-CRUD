import { Injectable } from '@nestjs/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.entity';

@Injectable({
    providedIn: 'root',
})
export class ProductService {

    constructor(private httpClient: HttpClient) { }

    holaMundo(): string{
        return "Hola mundo";
      }
    
      obtenerProducto1(): Observable<Product> {
        return this.httpClient.get<Product>('http://localhost:3000/products/1');
      }
    
      // Obtener todos los productos:
      findAll(): Observable<Product[]> {
        return this.httpClient.get<Product[]>('http://localhost:3000/products');
      }
      // Obtener un producto por su id como parámetro:
      findById(id: number | string): Observable<Product> {
        // return this.httpClient.get<Product>(`https://fakestoreapi.com/products/${id}`);
        return this.httpClient.get<Product>('http://localhost:3000/products/' + id);
      }
    
      // Método create para enviar un producto al API REST
      // Esto crearía un nuevo producto en base de datos
      create(product: Product): Observable<Product> {
        return this.httpClient.post<Product>('http://localhost:3000/products', product);
      }
    
      // Método para actualizar un producto en el API REST
      update(id: number | string, product: Product): Observable<Product> {
        return this.httpClient.put<Product>('http://localhost:3000/products/' + id, product);
      }
    
      // Método para borrar un producto
      deleteById(id: number | string) {
        return this.httpClient.delete('http://localhost:3000/products/' + id);
      }

}
