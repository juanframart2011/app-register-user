import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { user } from "../interface/user";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

    constructor( private http: HttpClient ){}

    saveServer( userInsert:user ):Observable<any>{

        let headers = new HttpHeaders({
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", 
            'Accept': 'application/json, text/plain',
            "cache-control": "no-cache", 
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
            "Access-Control-Allow-Credentials" : "true",
            "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT",
        });
        /*const headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8", 
            'Accept': 'application/json, text/plain',
            "cache-control": "no-cache", 
            "Access-Control-Allow-Origin": "*", 
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With, Access-Control-Request-Method, Access-Control-Request-Headers",
            "Access-Control-Allow-Credentials" : "true",
            "Access-Control-Allow-Methods" : "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT",
        };*/
        
        const formData = new FormData();

        for( var u in userInsert ){

            formData.append( u, userInsert[u] );
        }

        let result = this.http.post( "http://app.homgency.com/endpoint.php", formData, { headers } );

        return result.pipe( map( data => data ) );
    }
}