import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../common/product';
import { ProductCategory } from "../common/product-category"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl: string = environment.ecommerceBaseUrl+"/products";
  productCategoryUrl = environment.ecommerceBaseUrl+"/product-category";

  constructor(private httpClient: HttpClient) { }

  getProduct(value: number): Observable<Product> {

    const url = this.baseUrl + "/" + value;
    return this.httpClient.get<Product>(url);

  }

  getProductList(categoryId: number): Observable<Product[]> {

    const search = this.baseUrl + "/search/findByCategoryId?id=" + categoryId;
    return this.getProducts(search);
  }

  getProductListByPaginate(thePageNumber: number, categoryId: number, thePageSize: number): Observable<GetResponse> {
    const search = this.baseUrl + "/search/findByCategoryId?id=" + categoryId + "&page=" + thePageNumber + "&size=" + thePageSize;
    return this.httpClient.get<GetResponse>(search);
  }



  searchProductByKeyword(value: string): Observable<Product[]> {
    const keyword = this.baseUrl + "/search/findByNameContaining?keyword=" + value;
    return this.getProducts(keyword);
  }

  searchProductByKeywordPaginate(thePageNumber: number, thePageSize: number,keyword: any): Observable<GetResponse> {
    const thekeyword = this.baseUrl + "/search/findByNameContaining?keyword=" + keyword + "&page=" + thePageNumber + "&size=" + thePageSize;
    return this.httpClient.get<GetResponse>(thekeyword);
  }

  getProductCategoryMenu(): Observable<ProductCategory[]> {


    return this.httpClient.get<GetResponseProductCategory>(this.productCategoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  private getProducts(search: string): Observable<Product[]> {
    return this.httpClient.get<GetResponse>(search).pipe(
      map(response => response._embedded.products)
    );
  }

}

export interface GetResponse {
  "_embedded": {
    "products": Product[]
  },
  "page": {
    "size": number,
    "totalElements": number,
    "totalPages": number,
    "number": number
  }
}

export interface GetResponseProductCategory {
  "_embedded": {
    "productCategory": ProductCategory[]
  }
}


