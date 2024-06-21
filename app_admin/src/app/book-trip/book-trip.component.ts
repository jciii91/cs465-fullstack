import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-book-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-trip.component.html',
  styleUrl: './book-trip.component.css'
})

export class BookTripComponent implements OnInit {
  public bookForm!: FormGroup;
  trip!: Trip;
  submitted = false;
  message : string = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripDataService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() : void {

    // Retrieve stashed trip ID
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    this.bookForm = this.formBuilder.group({
      _id: [],
      tripCode: [tripCode, Validators.required],
      travelerID: ['', Validators.required],
      agentID: [this.authenticationService.getCurrentUser().membershipID, Validators.required]
    })
    this.tripDataService.getTrip(tripCode)
    .subscribe({
      next: (value: any) => {
        this.trip = value;

        if (!value) {
            this.message = 'No Trip Retrieved!';
        } else {
          // Fix date string format
          value[0]["start"] = value[0]["start"].split('T')[0];

          // Populate our record into the form
          this.bookForm.patchValue(value[0]);

          this.message = 'Trip: ' + tripCode + ' retrieved';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
  }

  public onSubmit() {
    this.submitted = true;
    if(this.bookForm.valid) {
      this.tripDataService.bookTrip(this.bookForm.value)
      .subscribe({
        next: (value: any) => {
          this.router.navigate(['list-trips']);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
    }
  }

  // get the form short name to access the form fields
  get f() { return this.bookForm.controls; }
}
