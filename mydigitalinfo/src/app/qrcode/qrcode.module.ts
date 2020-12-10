import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { QrcodePageRoutingModule } from './qrcode-routing.module';
import { QrcodePage } from './qrcode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    QrcodePageRoutingModule
  ],
  declarations: [QrcodePage]
})
export class QrcodePageModule {}
