import { ClientModel } from './../categories/client/client.model';
import { ClientService } from './../categories/client/client-service/client.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  /**
  * Create a field to hold the clients information.
  */
  clients: ClientModel[];

  constructor(private route: ActivatedRoute,
    private service: ClientService) { }


  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.search(params['searchKeyword']);
    });

  }

  search(searchKeyword: string): void {
    this.service.fetchSearch(searchKeyword).subscribe(data => {
      this.clients = data;
      console.log(data)
    });
  }


  statusStyle(status: string): string {
    if (status === 'Active') {
      return 'text-success';
    } else {
      return 'text-danger';
    }
  }




}
