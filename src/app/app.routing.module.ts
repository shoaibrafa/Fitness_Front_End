import { MembershipComponent } from './components/categories/membership/membership.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchComponent } from './components/search/search.component';
import {NgModel} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './components/categories/client/client.component';
import {ClientInfoComponent} from './components/categories/client/client-info/client-info.component';
import {ClientCafeComponent} from './components/categories/client/client-info/client-cafe/client-cafe.component';
import {ClientMembershipComponent} from './components/categories/client/client-info/client-membership/client-membership.component';
import {ClientPtComponent} from './components/categories/client/client-info/client-pt/client-pt.component';
import {CoachComponent} from './components/categories/coach/coach.component';
import {NgModule} from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {MainComponent} from './components/main/main.component';
import {AuthGuard} from './auth.guard';
import {CafeComponent} from './components/categories/cafe/cafe.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
      {path:'dashboard', component: DashboardComponent, canActivate: [AuthGuard], outlet: 'c'},
      {path:'membership', component: MembershipComponent, canActivate: [AuthGuard], outlet: 'c'},
      { path: 'client', component: ClientComponent, canActivate: [AuthGuard], outlet: 'c' },
      { path: 'client/clientinfo', component: ClientInfoComponent, outlet: 'c', children: [
          { path: 'cafe', component: ClientCafeComponent},
          { path: 'membership', component: ClientMembershipComponent },
          { path: 'pt', component: ClientPtComponent }
        ] },
      { path: 'search', component: SearchComponent, outlet: 'c'},
      { path: 'coach', component: CoachComponent, outlet: 'c'},
      { path: 'cafe', component: CafeComponent, outlet: 'c'},
    ] },
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{

}
