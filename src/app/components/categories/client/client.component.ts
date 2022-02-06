import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ClientModel} from './client.model';
import {IdService} from './client-service/id.service';
import {ClientService} from './client-service/client.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import {ClientFormComponent} from './client-form/client-form.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  // modalOptions: NgbModalOptions;
  /**
   * Create a field to hold the clients information.
   */
  clients: ClientModel[];
  /**
   * This field holds the total number of clients and the pagination on the template uses this number
   * to calculate the total pages required to display the data.
   */
  totalClients: number;
  /**
   * This field holds the current page number. This field is populated from the service inside
   * ngOnInit method.
   */
  pageNumber = 0;
  /**
   * Constructor the initialize the required fields and call the fetchClients method.
   */
  constructor(private http: HttpClient,
              private id: IdService,
              private clientService: ClientService,
              private modalService: NgbModal) {
    this.fetchClients();
  }
  /**
   * Sets the current page number from the ClientService.
   */
  ngOnInit(): void {
  }
  /**
   * This method gets all clients from Api and sets the totalClients number. This method is called from
   * inside the constructor.
   */
  private fetchClients(): any{
    this.clientService.fetchAllClients(this.pageNumber).subscribe(response => {
        this.clients = response[0];
        this.totalClients = response[3];
    });
  }
  /**
   * This method sets the current client id and the current page number with the help of service.
   * The client id and the current page are used latter in client-info component.
   */
  setServiceClientId(id: string, page: number): void{
    this.id.setId(id);
    this.pageNumber = page;
  }
  /**
   * This method opens a form to add or register new client.
   */
  open(): void{
    this.modalService.open(ClientFormComponent);
  }
  /**
   * This method filters clients based on their status (Active, Inactive)
   */
  filter(filter): void{
    console.log(filter.target.value);
  }
  /**
   * This method sets the style of the client status.
   */
  statusStyle(status: string): string{
    if (status === 'Active'){
      return 'text-success';
    }else{
      return 'text-danger';
    }
  }

  /**
   * This method is fired every time the page number is changed.
   * @param event receives the page number from the template.
   */
  pageChanged(event): void{
    this.pageNumber = event;
    this.fetchClients();
  }
}
