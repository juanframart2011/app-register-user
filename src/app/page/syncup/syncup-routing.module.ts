import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SyncUpPage } from './syncup.page';

const routes: Routes = [
  {
    path: '',
    component: SyncUpPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SyncUpPageRoutingModule {}
