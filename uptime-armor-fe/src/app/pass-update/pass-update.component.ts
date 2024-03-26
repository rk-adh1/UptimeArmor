import { Component } from '@angular/core';
import { UserPassUpdate } from '../auth/user';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { NavigationHistoryService } from '../navigation-history.service';

@Component({
  selector: 'app-pass-update',
  templateUrl: './pass-update.component.html',
  styleUrls: ['./pass-update.component.css']
})
export class PassUpdateComponent {
  userPassUpdate : UserPassUpdate = new UserPassUpdate();
  reEnterNewPassword: string;
  passwordsMatch: boolean;
  constructor(
    private authService:AuthService, 
    private router: Router, 
    private nhs: NavigationHistoryService){
  
  }

  onSubmit(){
    //console.log("inside Submit Button");
    this.passwordsMatch = this.userPassUpdate.newPassword === this.reEnterNewPassword;
    if (this.passwordsMatch) {
      this.authService.updatePassword(this.userPassUpdate).subscribe(data => {
        alert(data);
      });
      this.router.navigateByUrl("/home")
    }
    
  }

  password: string = '';
  passwordStrength: string = '';

  checkPasswordStrength(password: string) {
  
    const lengthScore = password.length >= 8 ? 1 : 0;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[$@$!%*?&]/;
  
    let complexityScore = 0;
    if (lowercaseRegex.test(password)) complexityScore++;
    if (uppercaseRegex.test(password)) complexityScore++;
    if (numberRegex.test(password)) complexityScore++;
    if (specialCharRegex.test(password)) complexityScore++;
  
    const strength = (lengthScore + complexityScore) * 25;
    if (strength === 0) {
      this.passwordStrength = 'Very Weak';
    } else if (strength <= 50) {
      this.passwordStrength = 'Weak';
    } else if (strength <= 75) {
      this.passwordStrength = 'Fair';
    } else if (strength <= 100) {
      this.passwordStrength = 'Strong';
    } else if (strength === 125) {
      this.passwordStrength = 'Very Strong';
    }
  }

  cancel(){
    const previousUrl = this.nhs.getPreviousUrl();
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
    } else {
      this.router.navigateByUrl('home');
    }
  }
}


