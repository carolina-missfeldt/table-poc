import { PageComponent } from './page/page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RealtimeComponent } from './realtime/realtime.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent
  },
  {
    path: 'websocket',
    component: RealtimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
