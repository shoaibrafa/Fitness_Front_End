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
    this.fetchPtTotalBalance();
   }

  ngOnInit(): void { }


  totalMemBalance = 0;
  totalPtBalance = 0;

  private fetchTotalMemBalance(): any {
    this.service.fetchTotalMemBalance().subscribe(data =>{
      this.totalMemBalance = data;
    });
  }


  private fetchPtTotalBalance(): any{
    this.service.fetchTotalPtBalance().subscribe(data => {
      this.totalPtBalance = data;
    });

  }



}
