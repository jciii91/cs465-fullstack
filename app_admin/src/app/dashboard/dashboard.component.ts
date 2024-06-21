import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { User } from '../models/user';
import { Trip } from '../models/trip';
import { Booking } from '../models/booking';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';

import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, TripCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [TripDataService]
})
export class DashboardComponent implements OnInit {

  tripsMap: Map<string, Trip> = new Map();
  bookings!: Booking[];
  user!: User;
  selectedUser: String = '';
  message: String = '';
  travelerIDs!: String[];
  selectedTravelerID: String = '';

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.user = this.getUser();
      this.getBookings();
    } else {
      this.router.navigate(['']);
    }
  }

  private isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private getUser(): User {
    return this.authenticationService.getCurrentUser();
  }

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public isAgent(): boolean {
    return this.user.role == 'Agent';
  }

  public getBookings(): void {
    this.tripDataService.getBookings()
    .pipe(
      switchMap((value: any) => {
        if (value.length > 0) {
          this.bookings = value;
          this.travelerIDs = Array.from(new Set(value.map((booking: any) => booking.travelerID)));

          const tripCodes = value.map((booking: any) => booking.tripCode);
          this.message = 'There are ' + value.length + ' trips booked.';
          console.log(this.message);

          // Return the second GET request observable
          return this.tripDataService.getTripsByCodes(tripCodes);
        } else {
          this.message = 'There were no booked trips retrieved from the database';
          console.log(this.message);
          // Return an empty observable to avoid making another GET request
          return [];
        }
      })
    )
    .subscribe({
      next: (trips: Trip[]) => {
        trips.forEach(trip => {
          this.tripsMap.set(trip.code, trip);
        });
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  public shouldDisplayTraveler(traveler: any): boolean {
    if (this.user.role === 'Traveler'){
      return traveler === this.user.membershipID;
    } else {
      return this.selectedTravelerID === '' || traveler === this.selectedTravelerID;
    }
  }

  public shouldDisplayBooking(travelerID: String, bookingTravelerID: string): boolean {
    return travelerID === bookingTravelerID;
  }
}
