import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AllInformation} from '../../model/all-information.model';
import {Observable} from 'rxjs';

@Injectable()
export class CovidService {

  constructor(private http: HttpClient) {
  }

  getLiveCasesData(): Observable<{ [country: string]: { [city: string]: AllInformation } }> {
    return this.http.get<{ [country: string]: { [city: string]: AllInformation } }>("https://covid-api.mmediagroup.fr/v1/cases");
  }

  getLiveCasesDataByCountry(country: string): Observable<{ [country: string]: { [city: string]: AllInformation } }> {
    return this.http.get<{ [country: string]: { [city: string]: AllInformation } }>("https://covid-api.mmediagroup.fr/v1/cases?country=" + country);
  }

  getVaccinesDataByCountry(country: string): Observable<{ [country: string]: { [city: string]: AllInformation } }> {
    return this.http.get<{ [country: string]: { [city: string]: AllInformation } }>("https://covid-api.mmediagroup.fr/v1/vaccines?country=" + country);
  }

  getHistoryDeathDataByCountry(country: string): Observable<{ [country: string]: { [city: string]: AllInformation } }> {
    return this.http.get<{ [country: string]: { [city: string]: AllInformation } }>("https://covid-api.mmediagroup.fr/v1/history?country=" + country + "&status=deaths");
  }

  getHistoryConfirmedDataByCountry(country: string): Observable<{ [country: string]: { [city: string]: AllInformation } }> {
    return this.http.get<{ [country: string]: { [city: string]: AllInformation } }>("https://covid-api.mmediagroup.fr/v1/history?country=" + country + "&status=confirmed");
  }
}
