import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FicheEntreePage } from './fiche-entree';

@NgModule({
  declarations: [
    FicheEntreePage,
  ],
  imports: [
    IonicPageModule.forChild(FicheEntreePage),
  ],
})
export class FicheEntreePageModule {}
