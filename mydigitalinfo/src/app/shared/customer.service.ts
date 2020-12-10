import { Injectable } from '@angular/core';
import { CustomerInfo } from './customerinfo';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_PATH = "customer"
const API_GATEWAY_URL = "http://Digitalinfoservice-env.eba-iqbgt94i.us-east-1.elasticbeanstalk.com"
const API_URL = `${API_GATEWAY_URL}/${BASE_PATH}`
@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  addCustomerInfo(customerInfo: CustomerInfo): Observable<any> {
    console.log(customerInfo.firstName);
    return this.http.post<CustomerInfo>(API_URL, customerInfo, this.httpOptions)
      .pipe(
        catchError(this.handleError<CustomerInfo>('Adding-CustomerInfo'))
      );
  }

  getCustomerInfo(id): Observable<CustomerInfo[]> {
    return this.http.get<CustomerInfo[]>(API_URL +"/" +id)
      .pipe(
        tap(_ => console.log(`CustomerInfo fetched: ${id}`)),
        catchError(this.handleError<CustomerInfo[]>(`Get CustomerInfo By id=${id}`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}