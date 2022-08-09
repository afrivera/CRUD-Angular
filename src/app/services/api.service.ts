import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _http: HttpClient
  ) { }

  createProduct( product: any ){
    return this._http.post<any>('http://localhost:3000/productList', product)
  }

  getProduct(){
    return this._http.get<any>('http://localhost:3000/productList')
  }

  updateProduct( product: any, id: number ){
    return this._http.put<any>(`http://localhost:3000/productList/${ id }`, product)
  }

  deleteProduct( id: number ){
    return this._http.delete<any>(`http://localhost:3000/productList/${ id }`)
  }
}
