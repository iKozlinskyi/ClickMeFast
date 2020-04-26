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

  public setCurrentUser(user: User): void {
    this.currentUser$.next(user);
  }

  public currentUserStream$(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  public getCurrentUser(): User {
    return this.currentUser$.getValue();
  }

  public login(username: string): void {
    const loggedUser = new User(username);
    this.setCurrentUser(loggedUser);
  }

  public logout(): void {
    this.currentUser$.next(null);
    this.router.navigate(['/']);
  }
}
