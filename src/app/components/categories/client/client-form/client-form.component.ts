import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {AppService} from '../../../../app-service/app.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm: FormGroup;
  formData: FormData;
  file: File;

  constructor(public activeModal: NgbActiveModal,
              private http: HttpClient,
              private server: AppService) { }

  ngOnInit(): void {
    this.clientForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      lastName: new FormControl(null),
      phone: new FormControl(null),
      joiningDate: new FormControl(null),
      status: new FormControl(null),
      remarks: new FormControl(null),
    });
  }

  onFileSelect(event): void{
    if (event.target.files.length > 0){
      this.file = event.target.files[0];
    }
  }


  onSubmit(): void{
    this.formData = new FormData();
    this.formData.append('id', this.clientForm.get('id').value);
    this.formData.append('name', this.clientForm.get('name').value);
    this.formData.append('lastName', this.clientForm.get('lastName').value);
    this.formData.append('phone', this.clientForm.get('phone').value);
    this.formData.append('joiningDate', this.clientForm.get('joiningDate').value);
    this.formData.append('status', this.clientForm.get('status').value);
    this.formData.append('remarks', this.clientForm.get('remarks').value);
    this.formData.append('photo', this.file);

    this.http.post(this.server.SERVER + '/athletique/restclients/createclient', this.formData).subscribe(response => {
    });
  }
}
