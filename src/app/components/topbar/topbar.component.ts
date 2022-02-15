import { ClientModel } from './../categories/client/client.model';
import { ClientService } from './../categories/client/client-service/client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  searchForm: FormGroup;
  clients: ClientModel[];
  keyword: any;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      keyword: new FormControl(''),
    });
  }

  search(): void{
    this.router.navigate(['/main',{outlets: {c: ['search',this.searchForm.get('keyword').value]}}]);
  }
}
