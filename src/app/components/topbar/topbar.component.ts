import { ClientModel } from './../categories/client/client.model';
import { ClientService } from './../categories/client/client-service/client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  searchForm: FormGroup;
  clients: ClientModel[];

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl(null),
    });
  }

  search(): void{
    console.log('I am searching for .... ', this.searchForm.get('keyword').value);
    this.fetchSearch(this.searchForm.get('keyword').value);
  }


  private fetchSearch(keyword: string): any {
    this.clientService.fetchSearch(keyword).subscribe(arg => {
      this.clients = arg[0];
    });
  }
}
