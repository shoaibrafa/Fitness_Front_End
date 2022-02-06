import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IdService} from '../../client-service/id.service';
import {ClientService} from '../../client-service/client.service';
import {ClientPtModel} from './clientPt.model';

@Component({
  selector: 'app-client-pt',
  templateUrl: './client-pt.component.html',
  styleUrls: ['./client-pt.component.css']
})
export class ClientPtComponent implements OnInit {
  clientPts: ClientPtModel[];
  isDataLoaded = false;

  constructor(private router: ActivatedRoute, private clientservice: ClientService) { }

  ngOnInit(): void {
    this.fetchClientPt();
  }

  fetchClientPt(): any {
    this.clientservice.fetchClientPt().subscribe(response => {
      this.clientPts = response;
      this.isDataLoaded = true;
    });
  }
}
