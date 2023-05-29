import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { SortsComponent } from './sorts/sorts.component';
import { ColumnComponent } from './column/column.component';
import { ColumnListComponent } from './column-list/column-list.component';

@NgModule({
  declarations: [AppComponent, SortsComponent, ColumnComponent, ColumnListComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
