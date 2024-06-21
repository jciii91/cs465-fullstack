import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css'
})
export class TripCardComponent implements OnInit {
  @Input('trip') trip: any;

  @Output() tripDeleted = new EventEmitter();
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private tripDataService: TripDataService
  ) {}
  
  ngOnInit(): void {

  }

  private isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  private getRole(): string {
    return this.authenticationService.getCurrentUser().role || "";
  }

  public isAdmin(): boolean {
    return this.isLoggedIn() && (this.getRole() == "Admin");
  }

  public isAgent(): boolean {
    return this.isLoggedIn() && (this.getRole() == "Agent");
  }

  public bookTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['book-trip']);
  }

  public editTrip(trip: Trip) {
    localStorage.removeItem('tripCode');
    localStorage.setItem('tripCode', trip.code);
    this.router.navigate(['edit-trip']);
  }

  public deleteTrip(trip: Trip) {
    this.tripDataService.deleteTrip(trip.code)
    .subscribe({
      next: (value: any) => {
        this.tripDeleted.emit();
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }
}