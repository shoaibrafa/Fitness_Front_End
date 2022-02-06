import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ClientMembershipModel} from './clientmembership.model';

@Injectable({
  providedIn: 'root'
})
export class ClientMembershipService {
  /**
   * Subject is a type of observable (i.e. a stream of data that we can subscribe to
   * like the observable returned from HTTP requests in Angular).
   */
  private  cm: Subject<ClientMembershipModel> = new Subject<ClientMembershipModel>();
  constructor() { }

  /**
   * Below method returns the cm field as an observable to so we can subscribe to it.
   */
  getInsertedClientMembership(): Observable<ClientMembershipModel>{
    return this.cm.asObservable();
  }

  /**
   * This method sets the value of the cm. The value is mainly set from the clientMembershipsForm when a new ClientMembership
   * is created.
   */
  setInsertedClientMembership(cm: ClientMembershipModel): void{
    this.cm.next(cm);
  }
}
