import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
/* Angular Material stuffs */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

export const DEFAULT_IMPORTS = [
  BrowserModule,
  HttpClientTestingModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
  MatDividerModule,
  MatListModule,
  MatBadgeModule,
  MatButtonModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  ReactiveFormsModule,
  FormsModule,
  AgmCoreModule,
];

export const DEFAULT_DUMB_IMPORTS = [
  RouterTestingModule,
];
