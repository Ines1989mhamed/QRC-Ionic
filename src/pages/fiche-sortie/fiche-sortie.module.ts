import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FicheSortiePage } from './fiche-sortie';

@NgModule({
  declarations: [
    FicheSortiePage,
  ],
  imports: [
    IonicPageModule.forChild(FicheSortiePage),
  ],
})
export class FicheSortiePageModule {}
