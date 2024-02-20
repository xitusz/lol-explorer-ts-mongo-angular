import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  loggedUser: boolean = false;
  collapsed: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      this.loggedUser = isLoggedIn ? JSON.parse(isLoggedIn) : false;
    }
  }

  handleExiting(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
    }
    this.loggedUser = false;
    this.router.navigate(['/login']);
  }

  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}
