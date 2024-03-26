import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { Router } from '@angular/router';


@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent {


  loginForm!: FormGroup;
  private formSubmitAttempt: boolean;

  response:any;

  constructor(  
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
    ){
      this.loginForm= this.fb.group({
        employeeId: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit(){
    sessionStorage.clear();
    this.authService.setLoggedIn();
    
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched) ||
      (this.loginForm.get(field)?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (result) => {
          this.router.navigateByUrl('/home');
        });
    
      this.formSubmitAttempt = true;
    }
  }
}
