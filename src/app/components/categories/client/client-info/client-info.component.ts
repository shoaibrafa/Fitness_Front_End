import { Component, OnInit } from '@angular/core';
import {ClientMembershipModel} from './client-membership/clientmembership.model';
import {ClientService} from '../client-service/client.service';
import {ClientModel} from '../client.model';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  /**
   * This is set to true to show client-membership component as default.
   */
  showMembership = true;
  /**
   * showPt and showCafe are set to false so they are hidden and
   * instead the client-membership component is shown.
   */
  showPt = false;
  showCafe = false;
  /**
   * This field is set to false so the template is waiting for the data to be loaded.
   * When the data is loaded and is ready this flield becomes true and the template
   * renders the data.
   */
  isDataLoaded = false;
  /**
   * client id is used on different parts of this component.
   */
  clientId = null;
  /**
   * A field to store clients profile photo.
   */
  clientPhoto: any = null;
  /**
   * This readonly field sets the type of the client profile image.
   */
  readonly imageType: string = 'data:image/jpg;base64,';
  /**
   * This field stores the membership balance of the client.
   */
  totalMembershipBalance: number;
  /**
   * This field stores the personal training balance of the client. The value of this field is
   * retrieved speratly from api, because the value of this field is required on client-info component.
   */
  totalPtBalance: number;
  /**
   * This field stores all data of the client.
   */
  public clientInfo: ClientModel[];
  /**
   * The constructor to create instance of required classes.
   */
  constructor(private clientService: ClientService, public http: HttpClient, private sanitizer: DomSanitizer) {
  }
  /**
   * Calling the required methods.
   */
  ngOnInit(): void {
    this.getClientInfo();
    this.loadClientPhoto();
    this.getClientPtBalance();
  }
  /**
   * This method shows the client-membership component and hides the other two.
   */
  show_Membership(): void{
    this.showMembership = true;
    this.showCafe = false;
    this.showPt = false;
  }
  /**
   * This method shows the client-Pt component and hides the other two.
   */
  show_Pt(): void{
    this.showPt = true;
    this.showMembership = false;
    this.showCafe = false;
  }
  /**
   * This method shows the client-cafe component and hides the other two.
   */
  show_Cafe(): void{
    this.showCafe = true;
    this.showMembership = false;
    this.showPt = false;
  }
  /**
   * This method uploads the profile image of a client from the client-info component.
   */
  uploadImage(event): any{
    if (event.target.files.length > 0){
      const photo = event.target.files[0];
      this.onSubmit(photo);
    }
  }

  /**
   * This method retrieves single client information based on its id.
   */
  getClientInfo(): any{
    this.clientId = window.localStorage.getItem('clientId');
    this.clientService.fetchClientById().subscribe(response => {
      this.clientInfo = response;
      this.isDataLoaded = true;
    });
  }

  /**
   * This method retrieves the balance of client's personal training.
   */
  getClientPtBalance(): void{
    this.clientService.fetchClientPtBalance().subscribe(response => {
      this.totalPtBalance = response;
    });
  }
  /**
   * This method posts the new client id and image to the api.
   */
  onSubmit(photo: File): any{
    const data = new FormData();
    data.append('id', this.clientId);
    data.append('photo', photo);
    this.clientService.uploadClientImage(data).subscribe(response => {
      this.loadClientPhoto();
    });
  }
  /**
   * This method loads the client image from api.
   */
  loadClientPhoto(): void{
    this.clientService.loadProfileImage().subscribe(response => {
      this.clientPhoto = this.sanitizer.bypassSecurityTrustUrl(this.imageType + response.content);
    });
  }
  /**
   * This method shows the client-membership balance. The totalBalance value is passed from child component
   * (client-membership component) via @Output.
   */
  getTotalMembershipBalance(totalBalance): void{
    this.totalMembershipBalance = totalBalance;
  }

  /**
   * This method checks the value of the totalmembershipBalance and based on some conditions returns a color for background
   * of the card.
   */
  getMembershipBalanceColor(): string{
    if (this.totalMembershipBalance < 500){
      return 'bg-success';
    }
    else if (this.totalMembershipBalance > 500 && this.totalMembershipBalance < 1200){
      return 'bg-warning';
    }
    else{
      return 'bg-danger';
    }
  }
  /**
   * This method checks the value of the totalPtBalance and based on some conditions returns a color for background
   * of the card.
   */
  getPtBalanceColor(): string{
    if (this.totalPtBalance < 500){
      return 'bg-success';
    }
    else if (this.totalPtBalance > 500 && this.totalPtBalance < 1200){
      return 'bg-warning';
    }
    else{
      return 'bg-danger';
    }
  }
}
