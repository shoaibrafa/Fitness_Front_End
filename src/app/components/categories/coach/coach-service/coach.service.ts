import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CoachModel} from '../coach.model';
import {AppService} from '../../../../app-service/app.service';

@Injectable({
  providedIn: 'root'
})
export class CoachService {

  /**
   * Server path.
   */
  SERVER = '';

  constructor(private http: HttpClient, server: AppService) {
    this.SERVER = server.SERVER;
  }

  /**
   * This method gets all clients from database. The result is shown in clients component.
   */
  public fetchAllCoaches(): any{
    return this.http.get<CoachModel>(this.SERVER + '/restcoaches/loadcoaches')
      .pipe(
        map(responseData => {
          const coachArray: CoachModel[] = [];
          for (const key in responseData){
            if (responseData.hasOwnProperty(key)){
              coachArray.push(responseData[key]);
            }
          }
          return coachArray;
        })
      );
  }
}
