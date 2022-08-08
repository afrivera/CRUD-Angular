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
}
