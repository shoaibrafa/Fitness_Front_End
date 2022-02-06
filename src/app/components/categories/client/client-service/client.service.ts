import { ClientModel } from './../client.model';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MembershipModel} from '../../membership/membership.model';
import {map} from 'rxjs/operators';
import {ClientMembershipModel} from '../client-info/client-membership/clientmembership.model';
import {Observable} from 'rxjs';
import {ClientPtModel} from '../client-info/client-pt/clientPt.model';
import {AppService} from '../../../../app-service/app.service';
import {LoginService} from '../../../login/login.service';
import { Key } from 'protractor';
import { resourceUsage } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  /**
   * Server path.
   */
  SERVER = '';
  /**
   * This field sets the current page of the pagenation to 1.
   */
  // curPage = 1;
  /**
   * Constructor to create HttpClient object and initialize the client id.
   */
  constructor(private http: HttpClient,
              private server: AppService) {
    this.SERVER = server.SERVER;
  }

  /**
   * This method gets all membership types from database and populates the drop down list
   * in client-membership-form component.
   */
  public fetchAllMemberships(): any {
    return this.http.get<{ [key: string]: MembershipModel }>(this.SERVER + '/allmemberships/')
      .pipe(map(data => {
        const memberships: MembershipModel[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            memberships.push(data[key]);
          }
        }
        return memberships;
      })
    );
  }

  /**
   * This method gets all clients from database. The result is shown in clients component.
   */
  public fetchAllClients(page: number): any{
    return this.http.get<{[key: string]: ClientModel}>(this.SERVER + '/restclients/loadclients/' + page)
      .pipe(
        map(responseData => {
          const clientsArray: ClientModel[] = [];
          for (const key in responseData){
            if (responseData.hasOwnProperty(key)){
              clientsArray.push(responseData[key]);
            }
          }
          return clientsArray;
        })
      );
  }

  /**
   * This method retrieves a client by its id and displays the result on the client-info component.
   */
  public fetchClientById(): any{
    const clientId = window.localStorage.getItem('clientId');
    return this.http.get<{[key: string]: ClientModel}>(this.SERVER + '/restclients/loadclient/' + clientId)
      .pipe(
        map(responseData => {
          const clientsArray: ClientModel[] = [];
          for (const key in responseData){
            if (responseData.hasOwnProperty(key)){
              clientsArray.push(responseData[key]);
            }
          }
          return clientsArray;
        })
      );
  }

  /**
   * This method gets a keyword from the user and searches the database
   * based on that keyword;
   */

  public fetchSearch(keyword:string): any {
    console.log(keyword);
    return this.http.get<{[Key: string]: ClientModel}>(this.SERVER +'/restclients/search/' + keyword )
    .pipe(
      map(responseData => {
        const clientArray: ClientModel[] = [];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            clientArray.push(responseData[key]);
          }
        }
        return clientArray;
      })
    )
  }

  /**
   * This method retrieves all memberships of a client (client membership history)
   * by its id and displays the result on the client-membership component.
   */
  public fetchClientMembershipsById(): any {
    const clientId = window.localStorage.getItem('clientId');
    return this.http.get <{ [key: string]: ClientMembershipModel }>(
      this.SERVER + '/restclients/client_membership/' + clientId).pipe(
        map(data => {
        const clientmembership: ClientMembershipModel[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            clientmembership.push(data[key]);
          }
        }
        return clientmembership;
      })
    );
  }
  /**
   * This method gets the image of the client.
   */
  loadProfileImage(): Observable<any> {
    const clientId = window.localStorage.getItem('clientId');
    return this.http.get(this.SERVER + '/restclients/clientimage/' + clientId);
  }

  /**
   * This method retrieves all Clients' Personal Trainings
   * by its id and displays the result on the client-pt component.
   */
  fetchClientPt(): any {
    const clientId = window.localStorage.getItem('clientId');
    return this.http.get <{[key: string]: ClientPtModel}>(this.SERVER + '/restclients/pt/' + clientId)
      .pipe(
        map(data => {
          const clientPt: ClientPtModel[] = [];
          for (const key in data){
            if (data.hasOwnProperty(key)){
              clientPt.push(data[key]);
            }
          }
          return clientPt;
        })
      );
  }

  /**
   * This method retrieves personal training balance as integer. The value is used
   * in client-info component.
   */
  fetchClientPtBalance(): any {
    const clientId = window.localStorage.getItem('clientId');
    return this.http.get <number>(this.SERVER + '/restclients/ptbalance/' + clientId)
      .pipe(
        map(data => {
          const ptBalance = data;
          return ptBalance;
        })
      );
  }

  /**
   * This method creates new client membership. It is used inside client-membership-form component (.ts) file.
   */
  createMembership(clientMembershipFormValue): any {
    return this.http.post(this.SERVER + '/restclients/client_membership/create', clientMembershipFormValue);
  }
  /**
   * This method uploads the client image to the server. This method is used when the client image is uploaded after
   * the membership is created.
   */
  uploadClientImage(data): any{
    return this.http.post(this.SERVER + '/restclients/changeClientImage', data);
  }
}
