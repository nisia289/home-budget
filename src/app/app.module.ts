import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { CrudTestComponent } from './crud-test/crud-test.component';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { PrzychodyComponent } from './przychody/przychody.component';
import { WydatkiComponent } from './wydatki/wydatki.component';
import { TransakcjeComponent } from './transakcje/transakcje.component';
import { OplatyComponent } from './oplaty/oplaty.component';
import { KontoComponent } from './konto/konto.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CrudTestComponent,
    NavBarComponent,
    PrzychodyComponent,
    WydatkiComponent,
    TransakcjeComponent,
    OplatyComponent,
    KontoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'home', component: MainPageComponent},
      {path: 'crudtest', component: CrudTestComponent},
      {path: 'przychody', component: PrzychodyComponent},
      {path: 'wydatki', component: WydatkiComponent},
      {path: 'transakcje', component: TransakcjeComponent},
      {path: 'oplaty', component: OplatyComponent},
      {path: 'konto', component: KontoComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
