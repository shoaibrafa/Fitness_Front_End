import { map } from 'rxjs/operators';
import { AppService } from './../../app-service/app.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  SERVER ='';

  constructor(private http: HttpClient,
              private server: AppService) {
    this.SERVER = server.SERVER;
  }

  public fetchTotalMemBalance(): any {
    return this.http.get(this.SERVER + '/dashboard/membalance')
    .pipe(map(data =>{
      console.log(data);
      return data;
    }));
  }

}
