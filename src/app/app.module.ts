import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CafeComponent } from './components/categories/cafe/cafe.component';
import { ClientComponent } from './components/categories/client/client.component';
import { CoachComponent } from './components/categories/coach/coach.component';
import { MembershipComponent } from './components/categories/membership/membership.component';
import {ClientInfoComponent} from './components/categories/client/client-info/client-info.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IdService} from './components/categories/client/client-service/id.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ClientMembershipComponent} from './components/categories/client/client-info/client-membership/client-membership.component';
import {ClientCafeComponent} from './components/categories/client/client-info/client-cafe/client-cafe.component';
import {ClientMembershipFormComponent} from './components/categories/client/client-info/client-membership/client-membership-form/client-membership-form.component';
import {ClientPtComponent} from './components/categories/client/client-info/client-pt/client-pt.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ClientFormComponent } from './components/categories/client/client-form/client-form.component';
import {AppRoutingModule} from './app.routing.module';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import {RequestInterceptorService} from './app-service/request-interceptor.service';
import {LoginService} from './components/login/login.service';
import { SearchComponent } from './components/search/search.component';




@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    CafeComponent,
    ClientComponent,
    CoachComponent,
    MembershipComponent,
    ClientCafeComponent,
    ClientMembershipComponent,
    ClientPtComponent,
    ClientMembershipFormComponent,
    ClientInfoComponent,
    ClientFormComponent,
    LoginComponent,
    MainComponent,
    SearchComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    IdService,
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptorService, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
