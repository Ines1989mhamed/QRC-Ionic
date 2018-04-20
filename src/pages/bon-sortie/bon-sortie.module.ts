import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BonSortiePage } from './bon-sortie';

@NgModule({
  declarations: [
    BonSortiePage,
  ],
  imports: [
    IonicPageModule.forChild(BonSortiePage),
  ],
})
export class BonSortiePageModule {}
