import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserInterface } from '../user.interface';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb=inject(FormBuilder);
  http=inject(HttpClient);
  authService=inject(AuthService);
  router=inject(Router);
  
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(){
    this.http.post<{user: UserInterface}>('https://api.realworld.io/api/users', {
      user: this.form.getRawValue(),
    }).subscribe((res)=>{
      localStorage.setItem('token', res.user.token);
      this.authService.currentUserSig.set(res.user);
      this.router.navigateByUrl('/');
    });
  }

}
