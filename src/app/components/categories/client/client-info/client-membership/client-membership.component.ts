import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientMembershipModel} from './clientmembership.model';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ClientMembershipFormComponent} from './client-membership-form/client-membership-form.component';
import {ClientService} from '../../client-service/client.service';
import {ClientMembershipService} from './client-membership.service';



@Component({
  selector: 'app-client-membership',
  templateUrl: './client-membership.component.html',
  styleUrls: ['./client-membership.component.css']
})
export class ClientMembershipComponent implements OnInit {
  /**
   * This field emits the totalBalance of all clients memberships to the parent
   * component which is the client-info component. The totalBalance is calculated inside
   * the calculateMembershipBalance method below.
   */
  @Output() emitTotalBalance: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Creating a ClientMembership array from the ClientMembership model. This field holds
   * clients membership information.
   */
  clientMemberships: ClientMembershipModel[];
  /**
   * This field creates the Modal window that hold the form for creating new client membership.
   */
  form: NgbModalOptions;
  /**
   * This field checks if the data is loaded from the service called inside the ngOnInit. Its default
   * value is false so the template is not showing any data and is wiating until the job of the
   * ngOnInit is finished.
   */
  isDataLoaded = false;
  /**
   * Constructor creates an instance of the service and the NgbModal.
   */
  constructor(private appservice: ClientService,
              private modalService: NgbModal,
              private cms: ClientMembershipService){
    this.form = {
      backdrop: 'static',
      backdropClass: 'customBackdrop'
    };
  }

  /**
   * ngOnInit method fetches client membership data and when the data is ready it changes the isDataLoaded field
   * to true to signal the template that the data is ready. It also calls the calculateMembershipBalance method.
   */
  ngOnInit(): void {
    this.appservice.fetchClientMembershipsById().subscribe( response => {
      this.clientMemberships = response;
      this.isDataLoaded = true;
      this.calculateMembershipBalance();
      /**
       * below code is looking at ClientMembershipsService and if the value changes it fetches
       * the value and pushes it to the clientMemberships filed.
       * the calulateMembershipBalance is called to update the view if there is a change in the
       * value.
       */
      this.cms.getInsertedClientMembership().subscribe(res => {
        this.clientMemberships.push(res);
        this.calculateMembershipBalance();
      });
    });
  }
  /**
   * This method opens the ClientMembershipFormComponent as a modal window.
   */
  open(): void {
    this.modalService.open(ClientMembershipFormComponent);
  }
  /**
   * This method calculates clients membership balance and emits the result to the parent component, which is
   * the Client-info component.
   */
  calculateMembershipBalance(): void{
    let totalBalance = 0;
    this.clientMemberships.forEach(element => {
      totalBalance = totalBalance + element.balance;
    });
    this.emitTotalBalance.emit(totalBalance);
  }
}
