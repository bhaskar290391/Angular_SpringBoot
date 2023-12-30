import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country } from '../common/country';
import { State } from '../common/state';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  countriesUrl:string=environment.ecommerceBaseUrl+"/countries";
  stateUrl:string=environment.ecommerceBaseUrl+"/states";

  constructor(private httpClient:HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {

    let data: number[] = [];

    for (let index = startMonth; index <= 12; index++) {
      data.push(index);
    }

    return of(data);

  }

  getCreditCardYears(): Observable<number[]> {

    let data: number[] = []
    let currentYear: number = new Date().getFullYear();
    let endYears: number = currentYear + 10;

    for (let index = currentYear; index <= endYears; index++) {
      data.push(index);
    }

    return of(data);
  }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetCountryResponse>(this.countriesUrl).pipe(
      map(
        response=> response._embedded.countries
      )
    );
  }

  getStates(CountryCode:any): Observable<State[]>{
    return this.httpClient.get<GetStateResponse>(this.stateUrl+"/search/findByCountryCode?code="+CountryCode).pipe(
      map(
        response=> response._embedded.states
      )
    );
  }

}

interface GetCountryResponse{
  "_embedded": {
    "countries":Country[];
  }
}


interface GetStateResponse{
  "_embedded": {
    "states":State[]
  }
}
