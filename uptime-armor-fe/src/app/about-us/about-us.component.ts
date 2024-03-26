import { Component } from '@angular/core';
import { trigger,state, transition, style, animate } from '@angular/animations';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  animations: [
    trigger('slide', [
      state('0', style({ transform: 'translateX(0)' })),
      state('1', style({ transform: 'translateX(-100%)' })),
      state('2', style({ transform: 'translateX(-200%)' })),
      transition('* => *', animate('200ms ease-out'))
    ])
  ]
})
export class AboutUsComponent  {
  isLoggedIn$: Observable<boolean>;

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  currentIndex = 0;

  constructor(private authService: AuthService) {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % 3;
      // console.log(this.currentIndex);
    }, 6000); 
  }

}