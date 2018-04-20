import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Fiche } from '../models/Fiche';

@Injectable()
export class DataService {

  apiRoot = 'http://localhost:5000/api';
  results: Array<any>;
  loading: boolean;

  constructor(private http: Http) {
    this.results = new Array<any>();
    this.loading = false;
   }
   collapseFiches(item) {

   }
   uriBuilder(api: string): string {
     return `${this.apiRoot}/${api}`;
   }
   getFiches() {
    // tslint:disable-next-line:prefer-const
    let promise = new Promise((resolve, reject) => {
      // tslint:disable-next-line:prefer-const
      let apiURL = this.uriBuilder('Fiches');
      this.http.get(apiURL)
          .toPromise()
          .then(
              res => { // Success
                
                this.results = res.json().map(item => {
                  let fiche = new Fiche();
                  fiche.Id = item.id;
                  fiche.Designation = item.designation;
                  return fiche;
                });
                // this.results = res.json().results;
                resolve(this.results);
              },
              msg => { // Error
                reject(msg);
              }
          );
    });
    return promise;
  }
}
