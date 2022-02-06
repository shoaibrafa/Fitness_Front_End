import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IdService} from '../../client-service/id.service';

@Component({
  selector: 'app-client-cafe',
  templateUrl: './client-cafe.component.html',
  styleUrls: ['./client-cafe.component.css']
})
export class ClientCafeComponent implements OnInit {

  constructor(private router: ActivatedRoute, private id: IdService) {
  }

  ngOnInit(): void {
  }

}
