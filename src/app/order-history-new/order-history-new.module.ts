import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderHistoryNewRoutingModule } from './order-history-new-routing.module';
import { OrderHistoryNewComponent } from './order-history-new.component';
import { GlobalModuleModule } from '../global/global-module/global-module.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    OrderHistoryNewComponent
  ],
  imports: [
    CommonModule,
    OrderHistoryNewRoutingModule,
    GlobalModuleModule,
    MatTableModule,
    MatProgressSpinnerModule
  ]
})
export class OrderHistoryNewModule { }
