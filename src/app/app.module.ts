import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { VenueListComponent } from './venue-list/venue-list.component';
import { VenueService } from './shared/venue.service';

import { MasonryModule } from 'angular2-masonry';
import {MdProgressSpinnerModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    VenueListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdProgressSpinnerModule,
    MasonryModule
  ],
  providers: [VenueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
