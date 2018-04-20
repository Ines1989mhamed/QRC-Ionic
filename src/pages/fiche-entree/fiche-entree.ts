import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BonEntreePage } from '../bon-entree/bon-entree';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the FicheEntreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fiche-entree',
  templateUrl: 'fiche-entree.html',
})
export class FicheEntreePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  suivant() {
    this.navCtrl.push(BonEntreePage);
  }
retour() {
  this.navCtrl.push(MenuPage);
}
}
