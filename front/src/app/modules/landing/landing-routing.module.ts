import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent  } from './landing/landing.component';



// canActivate: [NotLoggedInGuard],
const routes: Routes = [
  {
    path: 'landing',
    
    component: LandingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
