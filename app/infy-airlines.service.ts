import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InfyAirlinesService {
  constructor(private http: HttpClient) {}

  getAirlines(): Observable<any> {
    /*
    DONE 
      1.It should send a GET Request to the URL http://localhost:3000/airlines/ 
      2.The API call returns an Observable as a response, and the same value should be 
        returned from the function
    */
    return of(this.http.get('http://localhost:3000/airlines/'));
  }

  bookTicket(bookingObj: any): Observable<any> {
    /* DONE
      1.It should send a POST Request to the URL http://localhost:3000/bookings/ 
        by passing bookingObj as request body
      2.The API call returns an Observable as a response, and the same value should be 
        returned from the function
    */
    return of(this.http.post('http://localhost:3000/bookings/', bookingObj));
  }
}
function Of(): Observable<any> {
  throw new Error('Function not implemented.');
}
