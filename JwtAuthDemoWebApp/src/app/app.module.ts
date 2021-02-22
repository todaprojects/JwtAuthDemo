import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CustomersComponent } from './components/customers/customers.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HttpRequestService } from './services/http-request.service';
import { HeaderComponent } from './components/layout/header/header.component';

export function tokenGetter(): string {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    CustomersComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', component: HomeComponent},
      {path: 'login', component: LoginComponent},
      {path: 'customers', component: CustomersComponent, canActivate: [AuthGuardService]}
    ]),
    // JwtModule provides an HttpInterceptor which automatically attaches a JSON Web Token to HttpClient requests.
    JwtModule.forRoot({
      config: {
        // Populate tokenGetter property with the tokenGetter function
        // and include token to any http request executed by the HttpClientModule (this means, we don't to do it manually).
        tokenGetter,
        // Additionally we add the service URI allowed domain list, required by JwtModule.
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: []
      }
    }),
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuardService, HttpRequestService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
