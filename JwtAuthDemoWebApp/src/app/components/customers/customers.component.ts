import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  customers: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/customers')
      .subscribe(response => {
        this.customers = response;
      }, error => {
        console.log(error);
      });
  }

}
