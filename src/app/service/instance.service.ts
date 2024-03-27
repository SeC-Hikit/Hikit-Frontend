import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { components } from 'src/binding/Binding';

export type InstanceInfoDto = components["schemas"]["InstanceInfoDto"];

@Injectable({
  providedIn: 'root'
})


export class InstanceService {

  baseUrl = "api/instance";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient) { }


  get(): Observable<InstanceInfoDto> {
    return this.httpClient.get<InstanceInfoDto>(this.baseUrl)
      .pipe(
        tap(),
        catchError(this.handleError<InstanceInfoDto>('get instance info', null))
      );
  }

  /**
* Handle Http operation that failed.
* Let the app continue.
* @param operation - name of the operation that failed
* @param result - optional value to return as the observable result
*/
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
