import { baseUrl } from './../../_config/config';
import { first, timeInterval } from 'rxjs';
import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { AbmService } from '../../_services/abm.services';
import { SwalertService } from '../../_services/swalert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass'],
})
export class CartComponent implements OnInit {
  items = [];
  itemsCart = [];
  products;
  cartTotalCount: number;
  // apiMockCart = `${baseUrl}/api/cart`;

  // favouriteTotal: number;
  // cartTotal: number;
  // subscription: Subscription;
  constructor(
    private abmService: AbmService,
    private swalertService: SwalertService // private router: Router
  ) {
    this.getCartItems();
    // console.log('init Cart CART', this.itemsCart['products'].length);
    // this.subscription = this.abmService
    //   .getOrderCount()
    //   .subscribe((orderCount) => {
    //     this.cartTotal = orderCount.cartTotal;
    //     this.favouriteTotal = orderCount.favouriteTotal;
    //   });
    this.abmService.currentCart.subscribe((count) => {
      this.cartTotalCount = count;
      console.log('CART COUNT', count);
    });
  }

  ngOnInit(): void {
    console.log('init Cart');
  }

  // RXJS
  getCartItems() {
    this.abmService
      .getCartItems()
      .pipe(first(), timeInterval())
      .subscribe({
        next: (data: any) => {
          this.itemsCart = data.value.cart;
          // this.products = data.value.cart[0].products;
          console.log('items', this.itemsCart);
          // console.log('itemss PRoducst', this.products.length);
          // this.abmService.setOrderCount({
          //   cartTotal: this.products.length,
          //   favouriteTotal: 0,
          // });
        },
        error: (error) => {
          console.error('on error ', error);
        },
      });
  }

  deleteProductFromCart(idCart, product) {
    console.log('idCart', idCart, 'product', product);
    console.log('SWA DELETE FROM CART', product.title);
    this.swalertService.deleteItemConfirmation(product, product.title, idCart);
    // this.abmService
    //   .deleteProductItemFromCart(idCart,product.id)
    //   // this.abmService.deleteAbmItem(item._id) // MONGO
    //   .pipe(timeInterval())
    //   .subscribe({
    //     next: (data) => {
    //       console.log('Objeto crudo', data.value);
    //       this.reloadCurrentRoute();
    //     },
    //     error: (error) => {
    //       console.error('on error ', error);
    //     },
    //   });
    // console.log('deletedItemFromCart', `${this.apiMockCart}/${idCart}/products/${product.id}`);
  }
  createCart() {
    this.abmService
      .createCart()
      .pipe(first(), timeInterval())
      .subscribe({
        next: (data) => {
          // console.log('interval', data.interval);
          console.log('Crea Cart', this.abmService.millisToTime(data.interval));
          console.log('Objeto crudo', data.value);

          // this.loading = false;
          this.swalertService.successNotification(
            '¡Éxito!',
            'Se ha creado Cart.'
          );
          // this.backTo('READ');
          // this.reloadCurrentRoute();
        },
        error: (error) => {
          console.error('on error ', error);
        },
      });

    console.log('Creado');
    // this.getCartItems();
  }

  deleteCart(idCart) {
    this.abmService
      .deleteCart(idCart)
      // this.abmService.deleteAbmItem(item._id) // MONGO
      .pipe(timeInterval())
      .subscribe({
        next: (data) => {
          console.log('Objeto crudo', data.value);
          this.swalertService.reloadCurrentRoute();
        },
        error: (error) => {
          console.error('on error ', error);
        },
      });
    console.log('idCart Delete', idCart);
  }
}
