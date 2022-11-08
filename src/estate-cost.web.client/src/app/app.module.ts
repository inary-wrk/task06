import { HttpClientModule } from '@angular/common/http';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HeaderComponent } from './core/layouts/header/header.component';
import { MainComponent } from './pages/main/main.component';
import { FooterComponent } from './core/layouts/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { mapConfig } from './core/services/ya-maps';
import { API_BASE_URL, Client } from './core/Client';
import { UnderMapLayoutComponent } from './pages/under-map-layout/under-map-layout.component';
import { ObjectsStartComponent } from './pages/objects-start/objects-start.component';
import { ObjectsDefaultComponent } from './pages/objects-default/objects-default.component';
import { BlocksOpenManagerService } from './core/services/blocks-open-manager.service';
import { ObjectsFromHistoryComponent } from './pages/objects-from-history/objects-from-history.component';
import { SourcesComponent } from './pages/sources/sources.component';
import { HistoryComponent } from './pages/history/history.component';
import { ObjectsIdComponent } from './pages/objects-id/objects-id.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LogoutModalComponent } from './pages/logout-modal/logout-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ObjectsAnalogComponent } from './pages/objects-analog/objects-analog.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { StateDataService } from './core/services/stateData.service';
import {AuthGuard} from "./core/guards/auth-guard";
import {AuthService} from "./core/services/auth.service";
registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    UnderMapLayoutComponent,
    ObjectsStartComponent,
    ObjectsDefaultComponent,
    ObjectsFromHistoryComponent,
    SourcesComponent,
    HistoryComponent,
    ObjectsIdComponent,
    LogoutModalComponent,
    ObjectsAnalogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularYandexMapsModule.forRoot(mapConfig),
    // Материаловские модули
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    Client,
    BlocksOpenManagerService,
    StateDataService,
    AuthGuard,
    AuthService,
    { provide: API_BASE_URL, useValue: environment.API_URL },
    { provide: LOCALE_ID, useValue: 'ru' },
    // Не забыть провайднуть AuthGuard, Client файл, общие сервисы, JwtHelperService
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatInputModule,
    MatFormFieldModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
