import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationHistoryService {
  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects || event.url);
      }
    });
  }

  getPreviousUrl(): string | null {
    return this.history.length > 1 ? this.history[this.history.length - 2] : null;
  }
}
