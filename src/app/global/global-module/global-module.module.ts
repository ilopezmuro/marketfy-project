import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [NavigationBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [NavigationBarComponent]
})
export class GlobalModuleModule { }
