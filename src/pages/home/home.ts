import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

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
import { FicheEntreePage } from '../fiche-entree/fiche-entree';
import * as pdfjsLib from 'pdfjs-dist';
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
  })
  export class HomePage {
 //------------------------ pdf-------------
 fournisseurObj = {
  fournisseur: '',
  transporteur: '',
  equipeTechn: '',
  gsm: ''
}
tableObj=
{
    design : '',
    qte : '',
    
}
//----------------------------------
  scanData: any = {};
  Produits: Array<LigneProduit> = new Array<LigneProduit>();
  Fiche: Fiche = new Fiche();
  options: BarcodeScannerOptions;
  //---------Constructeur---------------
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private dataService : EntrepotServiceProvider, public file: File,
    private barcodeScanner: BarcodeScanner, public toastCtrl: ToastController, private alertCtrl: AlertController,private fileOpener: FileOpener) {

    this.Fiche.Id = Guid.newGuid();
    this.clearData();
  }
//-------------Fonction pdf --------------
makePdf() {
  pdfmake.vfs = pdfFonts.pdfMake.vfs;
  var makePdf = {
  content: [
      {
          columns: [
          {
              image :'data:image/png;base64,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',
          fit: [150, 200]
      },
          {
          text:'Bon D\'entrée ' , style: 'center',color : '#B22222'
          },
  
          { 
              text:  new Date().toLocaleString(), alignment: 'right'
          },
          ]
      },
      {
          columns: [
              
              {
                  text: 'N° :fg147 ',style :'textSize',alignment:'center'
              },
             
          ]
      },
      '\n','\n', 
      {
          columns: [
              {
                  text: 'Fournisseur : ',style :'textSize'
              },
              {
                  text: this.fournisseurObj.fournisseur,style : 'Size'
              },
              {
                  text: 'Transporteur : ',style :'textSize',alignment:'center'
              },
              {
                  text: this.fournisseurObj.transporteur,style : 'Size'
              },
              {
                  text: 'GSM :  ',style :'textSize',alignment:'right'
              },
              {
                  text: this.fournisseurObj.gsm,style : 'Size'
              },
          ]
      },
  
      {
        columns: [
          {text: 'Equipe Technique : ', style: 'textSize'},
          { text: this.fournisseurObj.equipeTechn,style:'Size'},
          {text: '', style: 'textSize'}, {text: '', style: 'textSize'},
        ]
      },'\n','\n',
      {
         
          table: {
              widths: ['auto', '*','auto','auto'],
              body: [
                  ['N°', 'Designation', 'Quantité','Action'],
                  ['1', 'prod1', '25' ,'']
              ]
          }
      }
  ],
  
  styles: {
      header: {
          bold: true,
          fontSize: 9,
      },
      center :{
          bold:true,
          
          alignment :'center',
          fontSize : 25
      },
      textSize: {
          fontSize: 11,
          bold : true
      },
      Size: {
          fontSize: 10,
          bold : false
      },
  
  
  },
  pageSize: 'A4',
  pageOrientation: 'portrait'
  };
  pdfmake.createPdf(makePdf).getBlob(buffer => {
    this.file.resolveDirectoryUrl(this.file.externalRootDirectory)
     .then(dirEntry => {
        this.file.getFile(dirEntry, 'test1.pdf', { create: true })
          .then(fileEntry => {
            fileEntry.createWriter(writer => {
              writer.onwrite = () => {
                this.fileOpener.open(fileEntry.toURL(), 'application/pdf')
                  .then(res => { })
                  .catch(err => {
                    const alert = this.alertCtrl.create({ message: 
  err.message, buttons: ['Ok'] });
                    alert.present();
                  });
              }
              writer.write(buffer);
            })
          })
          .catch(err => {
            const alert = this.alertCtrl.create({ message: err, buttons: ['Ok'] });
            alert.present();
          });
      })
      .catch(err => {
        const alert = this.alertCtrl.create({ message: err, buttons: ['Ok'] 
  });
        alert.present();
      });
  });
}
  //---------------------------------------------------

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
    this.navCtrl.setRoot(FicheEntreePage);
  }
}
