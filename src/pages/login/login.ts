import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthService } from '../../services/auth.service';
import { BonEntreePage } from '../bon-entree/bon-entree';
import { MenuPage } from '../menu/menu';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  authForm: FormGroup;
	loginError: string;
	user ={} as User;
  constructor(private sAuth:AuthService,private fb: FormBuilder, public navCtrl: NavController, public navParams: NavParams) {
      this.authForm = fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
  }
  login() {
		let data = this.authForm.value;

		if (!data.email) {
			return;
		}

		let credentials = {
			email: data.email,
			password: data.password
		};
		this.sAuth.signInWithEmail(credentials)
			.then(
				() => this.navCtrl.setRoot(MenuPage),
				error => this.loginError = error.message
			);
	}
	register()
	{
		this.navCtrl.push(RegisterPage);
	}
 
}