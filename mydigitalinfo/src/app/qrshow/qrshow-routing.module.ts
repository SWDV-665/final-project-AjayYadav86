import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QrshowPage } from './qrshow.page';

const routes: Routes = [
  {
    path: '',
    component: QrshowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QrshowPageRoutingModule {}
