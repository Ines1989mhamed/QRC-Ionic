import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { LigneProduit } from '../../models/LigneProduit';
import { Fiche } from '../../models/Fiche';
import { ModelS } from './modelS';

/*
  Generated class for the EntrepotServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EntrepotServiceProvider {

  buildUri(api): string {
    return "http://localhost:5000/api/" + api;
  }

  constructor(public http: Http) {
    console.log('Hello EntrepotServiceProvider Provider');
  }

  getFiches() {
    let url = this.buildUri("Fiches");
    return this.http.get(url);
  }

  addFiche(data: Fiche) {
    let url = this.buildUri("Fiches");
    //  this.http
    //       .post(url, data)
    let modelS: ModelS = new ModelS();
    let dataToSend = JSON.stringify(data);
    // return this.http.post(url, JSON.stringify(modelS));
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    // headers.append('Authentication', `${my-saved-token}`);
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, dataToSend, options)
      .map((response: Response) => {
        return response.json();
      });;
  }
}
