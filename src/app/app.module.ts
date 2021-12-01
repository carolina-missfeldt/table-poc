import { StateSelectComponent } from './shared/state-select/state-select.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';

import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RealtimeComponent } from './realtime/realtime.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

const webSocketConfig: SocketIoConfig = {
  url: environment.socketUrl, // socket server url;
  options: {
    autoConnect: false,
    transports: ['websocket']
  }
}
@NgModule({
  declarations: [	
    AppComponent,
    PageComponent,
    RealtimeComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocketIoModule.forRoot(webSocketConfig),
    AgGridModule.withComponents([StateSelectComponent]),
    BrowserAnimationsModule
  ],
  exports: [
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
