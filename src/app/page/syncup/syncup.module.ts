import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SyncUpPage } from './syncup.page';

import { SyncUpPageRoutingModule } from './syncup-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SyncUpPageRoutingModule
  ],
  declarations: [SyncUpPage]
})
export class SyncUpPageModule {}
