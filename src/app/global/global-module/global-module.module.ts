import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from '../../app-routing.module';

@NgModule({
  declarations: [NavigationBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  exports: [NavigationBarComponent]
})
export class GlobalModuleModule { }
