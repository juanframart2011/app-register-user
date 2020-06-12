import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { user } from "../../interface/user";

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
        public loadingController: LoadingController
    ){

        this.openLoading();
        this._getList();
    }

    ionViewWillEnter(){

        this.openLoading();
        this._getList();
    }

    _getList(){

    	let listUser = JSON.parse( localStorage.getItem( "list-user" ) );

        var listUserExist = [];
        
		for( var u = 0; u < listUser.list.length; u++ ){
            
			listUserExist.push( listUser.list[u] );
        }

        this.listUserCurrent = listUserExist;
        this.syncUpWithout = this.listUserCurrent.length;
        this._closeLoading();
    }

    async _closeLoading(){
        
        this.isLoading = false;
        return await this.loadingController.dismiss().then();
    }

    async openLoading() {
        
        this.isLoading = true;
        return await this.loadingController.create({
            message: 'Cargando Información'
        }).then(a => {
            a.present().then(() => {
                if (!this.isLoading) {
                    a.dismiss().then();
                }
            });
        });
    }
}