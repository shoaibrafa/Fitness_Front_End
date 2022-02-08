import { DashboardService } from './dashboard.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: DashboardService) {
    this.fetchTotalMemBalance();
   }

  ngOnInit(): void { }


  totalBalance = 0;

  private fetchTotalMemBalance(): any {
    this.service.fetchTotalMemBalance().subscribe(data =>{
      this.totalBalance = data;
    });
  }


}
