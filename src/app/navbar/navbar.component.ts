import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../auth/user.model';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  currentUser: User = null;
  userSubscr: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscr = this.authService.currentUserStream$().subscribe(
      (user) => this.currentUser = user
    );
  }

  ngOnDestroy(): void {
    this.userSubscr.unsubscribe();
  }

  handleLogout() {
    this.authService.logout();
  }
}
