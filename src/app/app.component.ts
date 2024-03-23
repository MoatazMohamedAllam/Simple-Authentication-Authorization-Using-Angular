import { CommonModule } from '@angular/common';
import { Component, Inject, Injector, inject } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from './user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-authN-authZ';
  authService = inject(AuthService);
  http =inject(HttpClient);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.http.get<{user: UserInterface}>('https://api.realworld.io/api/user')
    .subscribe((res)=>{
      this.authService.currentUserSig.set(res.user)
    }, err => this.authService.currentUserSig.set(null));
  }

  logOut(){
    localStorage.setItem('token', '');
    this.authService.currentUserSig.set(null);
  }
}
