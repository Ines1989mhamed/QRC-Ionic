import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;

  constructor(private afAuth: AngularFireAuth,private toastCtrl: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  async register(user: User) {
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      let toast = this.toastCtrl.create({
        message: 'Utilisateur ajouté avec succès !',
        duration: 5000,
        position: 'top'
      });
    
      toast.present();
    }
    catch (e) {
      console.error(e);
    }
    
    this.navCtrl.setRoot(LoginPage);
  }
 
}