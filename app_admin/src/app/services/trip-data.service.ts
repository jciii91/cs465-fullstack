import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Trip } from '../models/trip';
import { User } from '../models/user';
import { Booking } from '../models/booking';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

import { Observable, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}
  
  baseUrl = 'http://localhost:3000/api/';
  tripsUrl = `${this.baseUrl}trips`;
  bookedTripsUrl = `${this.baseUrl}booked-trips`;
  bookingsUrl = `${this.baseUrl}bookings`;

  getTrips() : Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrips')
    return this.http.get<Trip[]>(this.tripsUrl);
  }

  getTripsByCodes(tripCodes: string[]) : Observable<Trip[]> {
    let params = new HttpParams();
    tripCodes.forEach(code => {
      params = params.append('code', code);
    });

    return this.http.get<Trip[]>(this.bookedTripsUrl, { params });
  }

  getBookings() : Observable<Booking[]> {
    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Booking[]>(
      this.bookingsUrl,
      { headers }
    );
  }

  addTrip(formData: Trip) : Observable<Trip> {
    // console.log('Inside TripDataService::addTrip')

    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Trip>(
      this.tripsUrl, 
      formData,
      { headers }
    );
  }

  getTrip(tripCode: string) : Observable<Trip[]> {
    // console.log('Inside TripDataService::getTrip')
    return this.http.get<Trip[]>(this.tripsUrl + '/' + tripCode);
  }

  updateTrip(formData: Trip) : Observable<Trip> {
    // console.log('Inside TripDataService::updateTrip')
    
    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<Trip>(
      this.tripsUrl + '/' + formData.code, 
      formData,
      { headers }
    );
  }

  deleteTrip(tripCode: string) : Observable<Trip> {
    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<Trip>(
      this.tripsUrl + '/' + tripCode,
      { headers }
    );
  }

  bookTrip(formData: FormData) : Observable<Booking> {
    const token = this.storage.getItem('travlr-token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Booking>(
      this.bookingsUrl, 
      formData,
      { headers }
    );
  }

  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }
   
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }
   
  private makeAuthApiCall(urlPath: string, user: User):
  Promise<AuthResponse> {
    const url: string = `${this.baseUrl}/${urlPath}`;
    const response = this.http.post(url, user);
    return lastValueFrom(response) as Promise<AuthResponse>;
  }  
}
