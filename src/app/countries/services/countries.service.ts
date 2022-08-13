import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { CountriesSmall, Country } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private _regions:  string[]  = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  private _baseUrl:string = 'https://restcountries.com/v2'

  get regions():  string[]{
    return [...this._regions]
  }

  constructor( private http:HttpClient) { }

  getCountriesForRegion(  region:string ): Observable<CountriesSmall[]>{
    const url:string =  `${ this._baseUrl }/region/${ region }?fields=alpha3Code,name`;
    return this.http.get<CountriesSmall[]>( url );
  }

  getCountryForCode( code:string ):Observable<Country | null>{
    if( !code ){
      return of(null);
    }
    const url:string =  `https://restcountries.com/v2/alpha/${code}`;

    return this.http.get<Country>(url);

  }

  getCountryForCodeSmall( code:string ):Observable<CountriesSmall>{

    const url:string =  `https://restcountries.com/v2/alpha/${code}?fields=alpha3Code,name`;

    return this.http.get<CountriesSmall>(url);

  }

  getCountrysForLimits( limits:string []):Observable<CountriesSmall[]>{
    if(!limits){
      return of([]);
    }

    const requests : Observable<CountriesSmall>[] = [];
    limits.forEach(limit =>{
      const request = this.getCountryForCodeSmall(limit);
      requests.push(request);
    })

    return combineLatest( requests )

  }
}
