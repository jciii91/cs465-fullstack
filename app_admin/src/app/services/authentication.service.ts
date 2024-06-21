import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private router: Router,
    private tripDataService: TripDataService
  ) { };

  public getToken(): string {
    const token = this.storage.getItem('travlr-token');
    if (token)
      return token;
    else
      return '';
  }
  
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public login(user: User): Promise<any> {
    return this.tripDataService.login(user)
    .then((authResp: AuthResponse) =>
      this.saveToken(authResp.token));
  }

  public register(user: User): Promise<any> {
    return this.tripDataService.register(user)
    .then((authResp: AuthResponse) =>
      this.saveToken(authResp.token));
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
    this.router.navigateByUrl('list-trips');
  }
  
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name, role, membershipID } = JSON.parse(atob(token.split('.')[1]));
      return { email, name, role, membershipID } as User;
    }
    else
      return new User;
  }
}