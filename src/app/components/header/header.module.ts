import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  imports: [
    CommonModule
  ],
  exports: [HeaderComponent],
})
export class HeaderModule { }
