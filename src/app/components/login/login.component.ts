import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from './login.service';
import {generateErrorMessage} from 'codelyzer/angular/styles/cssLexer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  wrongCredentials;

  credentials: any = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient,
              private router: Router,
              private service: LoginService) { }

  ngOnInit(): void {
    this.wrongCredentials = false;
    this.loginForm = new FormGroup( {
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  checkLogin(): void{
    this.credentials.username = this.loginForm.get('username').value;
    this.credentials.password = this.loginForm.get('password').value;

    this.service.checkLogin(this.credentials).subscribe(data => {
      this.router.navigateByUrl('/main/(c:client)');
    },
      errorMessage => {
        console.log('Wrong username or password', errorMessage);
        this.wrongCredentials = true;
      });
  }
}
