import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: { [key: string]: { name: string; symbol: string } };
  languages: { [key: string]: {name:string;symbol:string} };
  borders: string[];
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countriesUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.countriesUrl);
  }

  getCountry(name: string): Observable<Country> {
    return new Observable<Country>(observer => {
      this.getCountries().subscribe(
        countries => {
          const country = countries.find(c => c.name.toLowerCase() === name.toLowerCase());
          if (country) {
            observer.next(country);
          } else {
            observer.error('Country not found');
          }
          observer.complete();
        },
        error => observer.error(error)
      );
    });
  }
}