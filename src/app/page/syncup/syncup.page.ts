import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { user } from "../../interface/user";
import { ClientService } from "../../service/client.service";

@Component({
  selector: 'app-syncup',
  templateUrl: 'syncup.page.html',
  styleUrls: ['syncup.page.scss']
})
export class SyncUpPage{

    isLoading = false;
    syncUpWithout:number = 0;
    listUserCurrent:user[];

    constructor(
        public alertController: AlertController,
        public loadingController: LoadingController,
        private clientService: ClientService
    ){

        this.openLoading( 'Cargando Información' );
        this._getList();
    }

    ionViewWillEnter(){

        this.openLoading( 'Cargando Información' );
        this._getList();
    }

    _getList(){

    	let listUser = JSON.parse( localStorage.getItem( "list-user" ) );

        var listUserExist = [];
        if( listUser ){

            for( var u = 0; u < listUser.list.length; u++ ){
            
                listUserExist.push( listUser.list[u] );
            }
        }

        this.listUserCurrent = listUserExist;
        this.syncUpWithout = this.listUserCurrent.length;
        this._closeLoading();
    }

    async _closeLoading(){
        
        this.isLoading = false;
        return await this.loadingController.dismiss().then();
    }

    async _messageToast( title:string, message:string ){

        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: title,
            message: message,
            buttons: ['OK']
        });

        await alert.present();
    }

    async openLoading( msg:string ) {
        
        this.isLoading = true;
        return await this.loadingController.create({
            message: msg
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then();
                }
            });
        });
    }

    sycnUpServer(){

        this.openLoading( 'Sincronizando Información con Server' );
        let flatBad = 0;
        var listUserNotInsert = [];
        alert("sycnUpServer 2");

        for( var u = 0; u < this.listUserCurrent.length; u++ ){

            alert( "enviando información 2" );
            this.clientService.saveServer( this.listUserCurrent[u] ).subscribe( data => {

                alert( "el servicio 2" );
                alert( data );
            },
            error =>{
                alert( "error 2" );
                alert( JSON.stringify( error ) );
                flatBad = 1;
                listUserNotInsert.push( this.listUserCurrent[u] );
            });
        }
        /*
        if( flatBad == 1 ){

            this.listUserCurrent = listUserNotInsert;
            this.syncUpWithout = this.listUserCurrent.length;

            this._closeLoading();
            this._messageToast( "Ocurrio un Error", "Ocurrio un Error Inesperado en agun registro, vuelve a intentarlo" );
        }
        else{
            console.log( "todo se argo" );
            this.listUserCurrent = [];
            this.syncUpWithout = 0;

            this._closeLoading();
            this._messageToast( "Sincronización Exitosa", "Felicidades Se sincronizo correctamente" );
        }

        localStorage.removeItem( 'list-user' );

		var productsCart = { 
            list: this.listUserCurrent
        };

        // Guardo el objeto como un string
        localStorage.setItem( 'list-user', JSON.stringify( productsCart ) );*/
    }
}