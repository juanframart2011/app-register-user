import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { userLogin } from "../interfaces/user-login";
import { user } from "../interfaces/user";
import { environment } from './../../environments/environment';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

    constructor( private http: HttpClient ){}

    validFormLogin( login:userLogin ): Observable<any>{

        let headers = new HttpHeaders({
            'Access-Control-Allow-Origin' : '*'
        });
        
        const formData = new FormData();
        formData.append("email", login.email);
        formData.append("password", login.password);
        formData.append("playerid", login.playerId);

        let result = this.http.post( environment.apiUrl + "login", formData, { headers } );

        return result.pipe( map( data => data ) );
    }
}