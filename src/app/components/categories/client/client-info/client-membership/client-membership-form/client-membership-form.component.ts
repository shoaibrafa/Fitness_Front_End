import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {ClientService} from '../../../client-service/client.service';
import {MembershipModel} from '../../../../membership/membership.model';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {IdService} from '../../../client-service/id.service';
import {ClientMembershipService} from '../client-membership.service';


@Component({
  selector: 'app-client-membership-form',
  templateUrl: './client-membership-form.component.html',
  styleUrls: ['./client-membership-form.component.css']
})
export class ClientMembershipFormComponent implements OnInit {

  /**
   * This field stores all membership types (Anually, monthly ..etc) to show them in the drop down menu
   * of the form.
   */
  allMemberships: MembershipModel[];
  /**
   * Storing the client id based on which new client memberships are registered.
   */
  clientId: string;
  /**
   * A FormGroup to store the data retrieved from the form.
   */
  clientMembershipForm: FormGroup;

  /**
   *
   * @param http constructing HttpClient to connect to the remote server
   * @param activeModal a bootstrap modal window that displays the from.
   * @param clientService constructing ClientService to call the fetchAllMemberships method.
   * @param cId to get the client id from local storage.
   * @param cm ClientMembershipService is used to share the new registered clientMembership from form
   * with clientMembership component.
   */
  constructor(private http: HttpClient,
              public activeModal: NgbActiveModal,
              private clientService: ClientService,
              private cId: IdService,
              private cm: ClientMembershipService){
  }

  /**
   * Gets the clientId from the localstorage with the help of IdService.
   * Fetches all membership types to list in the drop down menu inside the form.
   * Creates the FormGroup and all the required fields and validators.
   */
  ngOnInit(): void {
    this.clientId = this.cId.getId();
    this.clientService.fetchAllMemberships().subscribe(response => {
      this.allMemberships = response;
    });

    this.clientMembershipForm = new FormGroup({
      client: new FormGroup({id: new FormControl(this.clientId)}),
      membership: new FormGroup({type: new FormControl(null)}),
      start_date: new FormControl(null),
      end_date: new FormControl(null),
      payment: new FormControl(null),
      balance: new FormControl(null),
      payment_method: new FormControl(null),
      payment_date: new FormControl(null),
    });
  }

  /**
   * This method saves the form data to the database and then sends that data to the
   * ClientMembershipService service. The service then informs the ClientMembership component
   * to update the view.
   */
  onSubmit(): void {
    this.clientService.createMembership(this.clientMembershipForm.value).subscribe(response => {
      this.cm.setInsertedClientMembership(response);
      this.activeModal.close();
    });
  }
}
