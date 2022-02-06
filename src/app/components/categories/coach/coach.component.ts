import { Component, OnInit } from '@angular/core';
import {CoachService} from './coach-service/coach.service';
import {CoachModel} from './coach.model';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent implements OnInit {

  coaches: CoachModel[];
  constructor(private coachService: CoachService) { }

  ngOnInit(): void {
    this.fetchCoaches();
  }

  /**
   * This method gets all coaches from database. The result is shown in coaches component.
   */
  fetchCoaches(): any{
    this.coachService.fetchAllCoaches().subscribe(response => {
      this.coaches = response;
    });
  }
}
