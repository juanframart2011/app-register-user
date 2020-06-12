import { Component } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { user } from "../../interface/user";

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage {

    isValidation = false;

    userDummy:user = {
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        sexo: "",
        fechaNacimiento: "",
        nacionalidad: "",
        lugarNacimiento: "",
        paisResidencia: "",
        estadoReside: "",
        municipio: "",
        localidad: "",
        email: "",
        fechaRegistroExterno: "",
        idExterno: 0,
        direccion: ""
    };

    userCurrent:user = this.userDummy;

    constructor(
        public alertController: AlertController,
        private toastCtrl: ToastController,
        public loadingController: LoadingController
    ){}

    async _messageError() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Error de Validación',
            message: 'Los campos son obligatorios',
            buttons: ['OK']
        });

        await alert.present();
    }

    async _messageSuccess(){
        const toast = await this.toastCtrl.create({
            message: "Se guardo con éxito el usuario",
            duration: 3000,
            color: "success",
            position: "top"
        });
        toast.present();
    }

    _dateCurrent():string{

        var date = new Date( Date.now() );
        var monthCurrent = ( ( date.getMonth() > 8 ) ? ( date.getMonth() + 1) : ( '0' + ( date.getMonth() + 1 ) ) );
        
        let dateCurrent =  date.getFullYear() + '-' +  monthCurrent + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
        dateCurrent = dateCurrent + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        return dateCurrent;
    }

    _addUser(){
        
        this.userCurrent.fechaRegistroExterno = this._dateCurrent();
		//validamos si ya existe la lista de usuario
        let users = localStorage.getItem( 'list-user' );

        if( users != null ){

            this._getList( this.userCurrent );
        }
        else{

            this._addUserList( this.userCurrent );
        }
    }
    
    //Función que agrega usuario a la lista de usuario
    _addUserList( user:user ){

    	var listUser = { 
            list: [ user ]
        };

        // Guardo el objeto como un string
        localStorage.setItem( 'list-user', JSON.stringify( listUser ) );
        this._resetdata();
    }

    //Validamos si el producto existe y actualizamos su cantidad
    _getList( user:user ){

    	let listUser = JSON.parse( localStorage.getItem( "list-user" ) );

        var listUserExist = [];
        
		for( var u = 0; u < listUser.list.length; u++ ){
            
			listUserExist.push( listUser.list[u] );
		}

		listUserExist.push( user );

		this._updateList( listUserExist );
    }

    _resetdata(){

        this.userCurrent = {
            nombres: "",
            apellidoPaterno: "",
            apellidoMaterno: "",
            sexo: "",
            fechaNacimiento: "",
            nacionalidad: "",
            lugarNacimiento: "",
            paisResidencia: "",
            estadoReside: "",
            municipio: "",
            localidad: "",
            email: "",
            fechaRegistroExterno: "",
            idExterno: 0,
            direccion: ""
        };
        this._messageSuccess();
        this._closeLoading();
    }

    _updateList( listUser:any ){

        localStorage.removeItem( 'list-user' );

		var productsCart = { 
            list: listUser
        };

        // Guardo el objeto como un string
        localStorage.setItem( 'list-user', JSON.stringify( productsCart ) );
        this._resetdata();
    }

    async _closeLoading(){
        
        this.isValidation = false;
        return await this.loadingController.dismiss().then();
    }

    async openLoading() {
        
        this.isValidation = true;
        return await this.loadingController.create({
            message: 'Validando Información'
        }).then(a => {
            a.present().then(() => {
                if (!this.isValidation) {
                    a.dismiss().then();
                }
            });
        });
    }
    
    saveUser(){

        this.openLoading();
        
        if( this.userCurrent.nombres && this.userCurrent.apellidoPaterno /*&& this.userCurrent.sexo
            && this.userCurrent.fechaNacimiento && this.userCurrent.nacionalidad 
            && this.userCurrent.lugarNacimiento && this.userCurrent.paisResidencia
            && this.userCurrent.estadoReside && this.userCurrent.municipio && this.userCurrent.localidad
            && this.userCurrent.direccion*/ ){

                this._addUser();
        }
        else{

            this._closeLoading();
            this._messageError();
        }
    }
}