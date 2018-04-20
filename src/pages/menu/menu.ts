import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BonEntreePage } from '../bon-entree/bon-entree';
import { LoginPage } from '../login/login';
import { BonSortiePage } from '../bon-sortie/bon-sortie';
import { BonRetourPage } from '../bon-retour/bon-retour';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
  bonEntree()
  {
    this.navCtrl.setRoot(BonEntreePage);
  }
  bonSortie()
  {
    this.navCtrl.setRoot(BonSortiePage);
  }
  bonRetour()
  {
    this.navCtrl.setRoot(BonRetourPage);
  }
  deconncter()
  {
    this.navCtrl.setRoot(LoginPage);
  }
}
