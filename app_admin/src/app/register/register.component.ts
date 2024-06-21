import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.url.subscribe(urlSegments => {
      const lastSegment = urlSegments[urlSegments.length - 1].path;
      this.credentials.role = this.getRegistrationRole(lastSegment);
    });
  }
  
  public onRegisterSubmit(): void {
    this.formError = '';
    if (!this.credentials.name || !this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doRegister();
    }
  }

  private doRegister(): void {
    this.authenticationService.register(this.credentials)
    .then(() => this.router.navigateByUrl('list-trips'))
    .catch((message) => this.formError = message);
  }

  private getRegistrationRole(endOfPath: string): string {
    switch (endOfPath) {
      case 'agent':
        return 'Agent';
      case 'admin':
        return 'Admin';
      default:
        return 'Traveler';
    }
  }
}
