import { Injectable } from '@angular/core';
import {User} from './user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser$ = new BehaviorSubject<User>(null);

  constructor(private router: Router) { }

  setCurrentUser(user: User): void {
    this.currentUser$.next(user);
  }

  currentUserStream$(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  getCurrentUser(): User {
    return this.currentUser$.getValue();
  }

  login(username: string): void {
    const loggedUser = new User(username);
    this.setCurrentUser(loggedUser);
  }

  logout() {
    this.currentUser$.next(null);
    this.router.navigate(['/']);
  }
}
