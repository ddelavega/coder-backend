import { Products } from './../../_models/product';
import { SwalertService } from './../../_services/swalert.service';
import { first, timeInterval } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AbmService } from '../../_services/abm.services';
import { Router } from '@angular/router';
// import { FormGroup } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import Swal from 'sweetalert2';
// import { Product } from '../../_models/product';

type Steps = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.sass'],
})
export class InitComponent implements OnInit {
  defaultTitle;
  items = [];
  itemsCart = [];
  itemsFetch = [];
  server = 'http://localhost:8080';
  apiProducts = `${this.server}/api/products`;

  step: Steps;

  itemCreateAbmForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    thumbnail: new FormControl(''),
    // createdAt: new FormControl(''),
    // image: new FormControl(''),
    // _id: new FormControl(''),
    // id: new FormControl(''),
  });

  itemsAbmForm = new FormGroup({
    title: new FormControl(''),
    price: new FormControl(''),
    stock: new FormControl(''),
    thumbnail: new FormControl(''),
  });

  private formSubmitAttempt: boolean;
  error = '';
  itemsAbm = [];
  loading = false;
  getItemAbm: Products;

  cartTotalCount: number;

  // favouriteTotal: number;
  // cartTotal: number;
  // subscription: Subscription;

  // fetchData = async (endpoint, method) => {
  //   try {
  //     const res = await fetch(endpoint, {
  //       method: method,
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //       },
  //     });
  //     return res.json();
  //   } catch (err) {
  //     return err;
  //   }
  // };
  constructor(
    private abmService: AbmService,
    private swalertService: SwalertService,
    private router: Router
  ) {
    this.getCartItems();
    this.getAllItems();
    this.getAllFetchItems();
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
    // this.getAllItems();

    console.log('init');
    this.setStep('READ');
  }

  setStep(step: Steps) {
    this.step = step;
    console.log('Step: ', step);
  }

  backTo(step) {
    this.itemsAbm = [];
    this.loading = true;
    this.setStep(step);
    step === 'READ'
      ? [this.getAllItems(), this.getCartItems(), console.log('READ FROM CL')]
      : console.log('No se recargó');
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
          // console.log('items LENGHT', this.itemsCart[0].products.lenght);
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
  getAllItems() {
    this.abmService
      .getAllItems()
      .pipe(first(), timeInterval())
      .subscribe({
        next: (data: any) => {
          this.items = data.value.products;
          console.log('items', this.items);
          // this.abmService.currentCart.subscribe((count) => {
          //   this.cartTotalCount = count;
          //   console.log('CART COUNT FROM GET ITEMS', count);
          // });
        },
        error: (error) => {
          console.error('on error ', error);
        },
      });
    console.log('GETITEMS');
  }

  editItemAbm(item) {
    console.log('Editar');
    console.log(item);
    this.getItemAbm = item;
    // this.selectedRole = 'Admin';
    this.itemsAbmForm.patchValue(item);
    // this.itemsAbmForm = employee
    this.setStep('UPDATE');
  }

  editAbmItemForm(item) {
    this.loading = true;
    // console.log(this.itemsAbmForm.valid, this.itemsAbmForm,item)
    if (this.itemsAbmForm.valid) {
      let itemAbmSend = {
        id: item.id, // MOCK
        // _id: item._id, // MONGO
        title: this.itemsAbmForm.value.title,
        price: this.itemsAbmForm.value.price,
        stock: this.itemsAbmForm.value.stock,
        thumbnail: this.itemsAbmForm.value.thumbnail,
      };
      this.getItemAbm['title'] === this.itemsAbmForm.value.title
        ? itemAbmSend
        : (itemAbmSend['title'] = this.itemsAbmForm.value.title);
      this.getItemAbm['price'] === this.itemsAbmForm.value.price
        ? itemAbmSend
        : (itemAbmSend['price'] = this.itemsAbmForm.value.price);
      this.getItemAbm['stock'] === this.itemsAbmForm.value.stock
        ? itemAbmSend
        : (itemAbmSend['stock'] = this.itemsAbmForm.value.stock);
      this.getItemAbm['thumbnail'] === this.itemsAbmForm.value.thumbnail
        ? itemAbmSend
        : (itemAbmSend['thumbnail'] = this.itemsAbmForm.value.thumbnail);
      this.abmService
        .editItemAbm(itemAbmSend)
        .pipe(first(), timeInterval())
        .subscribe({
          next: (data) => {
            console.log(
              'Actualiza Item',
              this.abmService.millisToTime(data.interval)
            );
            console.log('Objeto crudo', data.value);
            this.loading = false;
            this.backTo('READ');
            this.swalertService.successNotification(
              '¡Éxito!',
              'Se han actualizado los datos.'
            );
            this.backTo('READ');
            this.itemsAbmForm.reset();
            this.reloadCurrentRoute();
            // }
          },
          error: (error) => {
            console.error('on error ', error);
          },
        });
      console.log('Editar Update');
    }
    this.formSubmitAttempt = true;
  }

  isFieldEditInvalid(field: string) {
    return (
      (!this.itemsAbmForm.get(field).valid &&
        this.itemsAbmForm.get(field).touched) ||
      (this.itemsAbmForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  addToCart(item) {
    console.log('item', item);

    this.abmService
      .createCartItemComplex(item)
      .pipe(first(), timeInterval())
      .subscribe({
        next: (data) => {
          // console.log('interval', data.interval);
          console.log(
            'Crea Item Cart',
            this.abmService.millisToTime(data.interval)
          );
          console.log('Objeto crudo', data.value);

          this.loading = false;
          this.swalertService.successNotification(
            '¡Éxito!',
            'Se ha creado Item Cart.'
          );
          this.backTo('READ');
          // this.reloadCurrentRoute();
        },
        error: (error) => {
          console.error('on error ', error);
        },
      });
    // this.subscription = this.abmService
    //   .getOrderCount()
    //   .subscribe((orderCount) => {
    //     this.cartTotal = orderCount.cartTotal;
    //     this.favouriteTotal = orderCount.favouriteTotal;
    //   });

    // // let count = {
    // //   cartTotal: this.cartTotal + 1,
    // //   favouriteTotal: this.favouriteTotal,
    // // };
    // this.abmService.getOrderCount();

    console.log('Creado');
    // this.getCartItems();
    // this.getAllItems();
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

          this.loading = false;
          this.swalertService.successNotification(
            '¡Éxito!',
            'Se ha creado Cart.'
          );
          this.backTo('READ');
          // this.reloadCurrentRoute();
        },
        error: (error) => {
          console.error('on error ', error);
        },
      });

    console.log('Creado');
    // this.getCartItems();
  }

  createFormAbm() {
    console.log('Creando...');
    // this.setStep('UPDATE');
    // modelo edit
    this.loading = true;

    if (this.itemCreateAbmForm.valid) {
      let itemAbmToSend = {
        // timestamp: this.itemCreateAbmForm.value.timestamp,
        title: this.itemCreateAbmForm.value.title,
        price: this.itemCreateAbmForm.value.price,
        stock: this.itemCreateAbmForm.value.stock,
        thumbnail: this.itemCreateAbmForm.value.thumbnail,
      };

      this.abmService
        .createAbmItem(itemAbmToSend)
        .pipe(first(), timeInterval())
        .subscribe({
          next: (data) => {
            // console.log('interval', data.interval);
            console.log(
              'Crea Item ABM',
              this.abmService.millisToTime(data.interval)
            );
            console.log('Objeto crudo', data.value);

            this.loading = false;
            this.swalertService.successNotification(
              '¡Éxito!',
              'Se ha creado Item Abm, verifique su correo.'
            );
            this.backTo('READ');
            this.itemCreateAbmForm.reset();
            this.reloadCurrentRoute();
          },
          error: (error) => {
            console.error('on error ', error);
          },
        });

      console.log('Creado');
      console.log(this.getItemAbm);
    }
    this.formSubmitAttempt = true;
  }

  isFieldCreateInvalid(field: string) {
    return (
      (!this.itemCreateAbmForm.get(field).valid &&
        this.itemCreateAbmForm.get(field).touched) ||
      (this.itemCreateAbmForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  createAbmItem(msg = null) {
    msg ? msg : null;
    console.log(msg);
    this.itemCreateAbmForm.reset();
    this.setStep('CREATE');
  }

  // get g() {
  //   return this.itemCreateAbmForm.controls;
  // }

  // isEmailInvalid(field: string) {
  //   return (
  //     this.itemsAbmForm.get(field).errors
  //   );
  // }

  get fc() {
    const forms = [this.itemCreateAbmForm.controls, this.itemsAbmForm.controls];
    return forms;
  }

  deleteProduct(item) {
    console.log('SWA DELETE', item.title);
    this.swalertService.deleteItemConfirmation(item, item.title);
  }
  // deleteProduct(id) {
  //   this.abmService
  //     .deleteAbmItem(id)
  //     // this.abmService.deleteAbmItem(item._id) // MONGO
  //     .pipe(timeInterval())
  //     .subscribe({
  //       next: (data) => {
  //         console.log('Objeto crudo', data.value);
  //         this.reloadCurrentRoute();
  //       },
  //       error: (error) => {
  //         console.error('on error ', error);
  //       },
  //     });
  //   console.log('deletedItem', `${this.apiProducts}/${id}`);
  // }

  // FETCH
  getAllFetchItems = async () => {
    this.itemsFetch = await this.abmService.fetchData(this.apiProducts, 'GET');
    console.log('this.itemsFetch', this.itemsFetch['products']);
  };

  deleteFetchProduct = async (id) => {
    console.log('id', id);
    const deletedItem = await this.abmService.fetchData(
      `${this.apiProducts}/${id}`,
      'DELETE'
    );
    deletedItem.statusCode === 200 ? this.reloadCurrentRoute() : null;
    console.log('deletedItem', deletedItem, `${this.apiProducts}/${id}`);
  };

  // REDIRECT
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log('currentUrl', currentUrl);
      // this.loansPaymentService.getcuit = this.isCuit ? this.isCuit : null;
    });
  }
}
