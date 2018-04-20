import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

import { Guid } from '../../models/Guid';
import { Toast } from '@ionic-native/toast';
import { ToastController } from 'ionic-angular';
import { TokenType } from '@angular/compiler';

import { isActivatable } from 'ionic-angular/tap-click/tap-click';
import { LoginPage } from '../login/login';
import { MenuPage } from '../menu/menu';
import { LigneProduit } from '../../models/LigneProduit';
import { Fiche } from '../../models/Fiche';
import { EntrepotServiceProvider } from '../../providers/entrepot-service/entrepot-service';
import {FicheRetourPage } from '../fiche-retour/fiche-retour';

@Component({
  selector: 'page-bon-retour',
  templateUrl: 'bon-retour.html',
})
export class BonRetourPage implements OnInit {
  ngOnInit(): void {
    // this.getAllFiches();
 }
  scanData: any = {};
  Produits: Array<LigneProduit> = new Array<LigneProduit>();
  Fiche: Fiche = new Fiche();
  options: BarcodeScannerOptions;
  Fiches = new Array<Fiche>();
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private dataService : EntrepotServiceProvider,
    private barcodeScanner: BarcodeScanner, public toastCtrl: ToastController) {
    this.Fiche.Id = Guid.newGuid();
    this.clearData();
  }
  scan() {
    this.options = {
      prompt: "Scannez le code "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

      console.log(barcodeData);
      this.scanData = barcodeData;
    }, (err) => {
      console.log("erreur est survenu : " + err);
    });
  }

  valider() {

    if (!this.validate()) {
      return;
    }

    let ligneProduit: LigneProduit;

    let filteredLigneProduitIndex = this.Fiche.LignesProduits.findIndex(item => item.Produit.Designation == this.scanData.text);

    if (filteredLigneProduitIndex != -1) {
      ligneProduit = this.Fiche.LignesProduits[filteredLigneProduitIndex];
      ligneProduit.Quantite += Number(this.scanData.Quantite);
    }
    else {
      
      ligneProduit = new LigneProduit();
      ligneProduit.Produit.Designation = this.scanData.text;
      ligneProduit.Quantite = Number(this.scanData.Quantite);
      
      ligneProduit.Fiche_Id = this.Fiche.Id;
      this.Fiche.LignesProduits.push(ligneProduit);
    }

    this.clearData();
  }
  clearData() {
    this.scanData.text = "";
    this.scanData.Quantite = "";
  }
  delete(Produit_Id) {
    let filteredLigneProduitIndex = this.Fiche.LignesProduits.findIndex(item => item.Produit.Designation == Produit_Id);

    if (filteredLigneProduitIndex != -1) {

      this.Fiche.LignesProduits.splice(filteredLigneProduitIndex, 1);
    }
  }
  validate(): boolean {
    let isValid: boolean = true;
    let message = "";
    if (this.scanData.text == "") {
      message = "Veuillez entrer un nom produit valide!</br>";
      isValid = false;
    }
    if (this.scanData.Quantite <= 0) {
      message = "Veuillez entrer une quantité valide!";
      isValid = false;
    }
    if (!isValid) 
    {
      let toast = this.toastCtrl.create({
      message: 'Produit ajouté avec succès !',
      duration: 5000
      });
      toast.present();
    }
    return isValid;
  }
  retour()
  {
    this.navCtrl.push(MenuPage);
  }
  // getAllFiches() {
  //   let getAllFiches = this.dataService.getFiches();
  //   getAllFiches  
  //    .then(
  //         res => { // Success   
  //           this.Fiches = <Array<Fiche>> res;
  //         },
  //         (error) => console.error(error)
  //     );
  // }
  getDetails(ficheId : Guid){}
  sauvegarder()
  {
    this.dataService.addFiche(this.Fiche).subscribe(
      () => {
        this.toastCtrl.create({
          message: 'Fiche ajoutée avec succès !',
          duration: 5000
          });
      }
    );
    this.navCtrl.setRoot(FicheRetourPage);
  }
}
