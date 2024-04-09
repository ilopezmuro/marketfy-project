import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderHistoryNewComponent } from './order-history-new.component';

const routes: Routes = [{ path: '', component: OrderHistoryNewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderHistoryNewRoutingModule { }
