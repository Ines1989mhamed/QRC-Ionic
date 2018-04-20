import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Toast } from '@ionic-native/toast';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { BonEntreePage} from '../pages/bon-entree/bon-entree';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LoginPage } from '../pages/login/login';
import { EntrepotServiceProvider } from '../providers/entrepot-service/entrepot-service';
import { MenuPage } from '../pages/menu/menu';
import { DataService } from '../Shared/data.service';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { DataProvider } from '../providers/data/data';
import { HttpHandler } from '@angular/common/http';
import { FicheEntreePage } from '../pages/fiche-entree/fiche-entree';
import { FicheSortiePage } from '../pages/fiche-sortie/fiche-sortie';
import { BonSortiePage } from '../pages/bon-sortie/bon-sortie';
import { BonRetourPage } from '../pages/bon-retour/bon-retour';
import { FicheRetourPage } from '../pages/fiche-retour/fiche-retour';
import { HttpModule } from '@angular/http';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { HomePage } from '../pages/home/home';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { firebaseConfig } from '../config';
import { RegisterPage } from '../pages/register/register';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,HomePage,
    BonEntreePage, BonSortiePage, BonRetourPage,
    LoginPage,RegisterPage,
    MenuPage,
  
    FicheEntreePage, FicheSortiePage,FicheRetourPage
   ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,HomePage,
    BonEntreePage, BonSortiePage, BonRetourPage,
    LoginPage,RegisterPage,
    MenuPage,
    FicheEntreePage, FicheSortiePage,FicheRetourPage
  ],
  providers: [
    File,
    FileOpener,DocumentViewer,
    FileTransfer,
    HttpModule,
    BarcodeScanner,AngularFireAuth,
    StatusBar,
    SplashScreen,Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EntrepotServiceProvider, DataService,AuthService ,
    DataProvider
  ]
})
export class AppModule {}
