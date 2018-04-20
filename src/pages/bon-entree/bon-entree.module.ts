import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BonEntreePage } from './bon-entree';


@NgModule({
  declarations: [
    BonEntreePage,
  ],
  imports: [
    IonicPageModule.forChild(BonEntreePage)
  ],
})
export class BonEntreePageModule {}
