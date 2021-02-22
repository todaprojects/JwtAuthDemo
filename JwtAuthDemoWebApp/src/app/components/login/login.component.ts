import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  invalidLogin: boolean;

  constructor(private router: Router, private http: HttpClient) {
  }

  login(form: NgForm): void {
    const credentials = {
      username: form.value.username,
      password: form.value.password
    };

    this.http.post('https://localhost:5001/api/auth/login', credentials)
      .subscribe(response => {
        const token = (response as any).token;
        localStorage.setItem('jwt', token);
        this.invalidLogin = false;
        this.router.navigate(['/']);
      }, error => {
        this.invalidLogin = true;
      });
  }
}
