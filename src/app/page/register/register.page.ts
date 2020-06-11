import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { user } from "../../interface/user";

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss']
})
export class RegisterPage {

    isValidation = false;

    userCurrent:user = {
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
        registrado: "",
        direccion: ""
    };
    constructor(
        public alertController: AlertController,
        public loadingController: LoadingController
    ){}

    async presentAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: ['OK']
        });

        await alert.present();
    }

    /*add_cart( p:number ){

		let product = this.products[p];
        //validamos si ya existe el arreglo de cart
        let products = localStorage.getItem( 'list-user' );

        if( products != null ){

            this._getCart( product, 1 );
        }
        else{

            this._addProductCart( product, 1 );
        }

        window.location.reload();
    }
    
    //Función que agrega producto a carrito de compras
    _addProductCart( product:any, qty:number ){

    	let price = 0;
    	
    	if( product.onsale == '0' ){

    		price = product.price_store;
    	}
    	else{

    		price = product.onsale_price_store;
    	}

        var products = { 
            list: [
                {
                	product: product.product_id,
                	qty:qty,
                	description: product.description,
					image: product.image_thumb,
					name: product.product_name,
					price: price
                }
            ]
        };

        // Guardo el objeto como un string
        localStorage.setItem( 'list-user', JSON.stringify( products ) );
    }

    //Validamos si el producto existe y actualizamos su cantidad
    _getCart( product:any, qty:any ){

    	let products = JSON.parse( localStorage.getItem( "list-user" ) );
    	let product_exists = 0;

		var cartProduct = [];
		var qty_current = 0;
		for( var p = 0; p < products.cart.length; p++ ){

			//console.log( "Producto :: " + products.cart[p].product + " cantidad :: " + products.cart[p].qty );
			if( products.cart[p].product == product ){

				qty_current = Number( qty ) + parseInt( products.cart[p].qty );
				product_exists = 1;
			}
			else{

				qty_current = products.cart[p].qty;
			}
			cartProduct.push({
				product: products.cart[p].product,
				qty: qty_current,
				description: products.cart[p].description,
				image: products.cart[p].image,
				name: products.cart[p].name,
				price: products.cart[p].price
			});
		}

		if( product_exists != 1 ){

			let price = 0;
    	
	    	if( product.onsale == '0' ){

	    		price = product.price_store;
	    	}
	    	else{

	    		price = product.onsale_price_store;
	    	}

			cartProduct.push({
				product: product.product_id,
				qty: qty,
				description: product.description,
				image: product.image_thumb,
				name: product.product_name,
				price: price
			});
		}

		this._updateCart( cartProduct );
    }

    //Modificamos el carrito
    _updateCart( cartProduct:any ){

        localStorage.removeItem( 'list-user' );

		var productsCart = { 
            list: cartProduct
        };

        // Guardo el objeto como un string
        localStorage.setItem( 'list-user', JSON.stringify( productsCart ) );
    }*/

    async closeLoading(){
        
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
    }
}