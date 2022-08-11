import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  map,
  Observable,
  timeInterval,
  first,
  BehaviorSubject,
  switchMap,
} from 'rxjs';

interface OrderCount {
  cartTotal: number;
  favouriteTotal: number;
}
@Injectable({ providedIn: 'root' })
export class AbmService {
  apiMock = 'https://6239d4e1bbe20c3f66cac67f.mockapi.io/productos/detalle';
  apiMockX = 'http://localhost:8080/api/products';
  apiMockCart = 'http://localhost:8080/api/cart';
  availableProducts;
  availableProductsFromProducts;
  private currentCounter = new BehaviorSubject<number>(null);
  currentCart = this.currentCounter.asObservable();

  changeCount(val: number): void {
    this.currentCounter.next(val);
  }

  getCount(): Observable<number> {
    return this.currentCart;
  }

  // private _orderCount = new BehaviorSubject<OrderCount>({
  //   cartTotal: 0,
  //   favouriteTotal: 0,
  // });
  // private _orderCount$ = this._orderCount.asObservable();

  // getOrderCount(): Observable<OrderCount> {
  //   return this._orderCount$;
  // }

  // setOrderCount(latestValue: OrderCount) {
  //   return this._orderCount.next(latestValue);
  // }

  constructor(private http: HttpClient) {}

  millisToTime = function (ms): string {
    const x = ms / 1000;
    const seconds = Math.floor(x % 60);
    // x /= 60;
    // let minutes = Math.floor(x % 60);
    // x /= 60;
    // let hours = Math.floor(x % 24);
    // x /= 24;
    // let days = Math.floor(x);
    const msg = `Recibido ${seconds === 0 ? x : seconds} seg. aprox.`;
    return msg;
  };

  // Obsevables RXJS GET
  getCartItems(): Observable<any> {
    return this.http.get<any>(this.apiMockCart).pipe(
      timeInterval(),
      map((data) => {
        console.log('Datos', data.value);
        console.log('tiempo de demora', this.millisToTime(data.interval));
        console.log('Dato crudo:', data);
        console.log('GETCARTITEMS', data.value.cart.length);
        // let products = data.value.cart[0].products;
        this.changeCount(
          data.value.cart.length ? data.value.cart[0].products.length : null
        );
        this.availableProducts = data.value.cart[0].products;
        console.log('this.availableProducts map', this.availableProducts);

        console.log('GETCARTITEMS2', data.value.cart.length);

        // this.setOrderCount({
        //   cartTotal: products.length,
        //   favouriteTotal: 0,
        // });
        return data.value;
      })
    );
  }

  getAllItems(): Observable<any> {
    return this.http.get<any>(this.apiMockX).pipe(
      timeInterval(),
      map((data) => {
        console.log('Datos', data.value);
        this.availableProductsFromProducts = data.value;
        console.log('tiempo de demora', this.millisToTime(data.interval));
        console.log('Dato crudo:', data);
        this.getCount();
        console.log('GETCOUNT from products');
        return data.value;
      })
    );
  }

  // EDIT
  editItemAbm(itemAbm): Observable<any> {
    console.log('El Item es', itemAbm);
    console.log('Se inició en servicio la consulta Usuario Update');
    let noIdItemAbm = {
      title: itemAbm.title,
      price: itemAbm.price,
      stock: itemAbm.stock,
      thumbnail: itemAbm.thumbnail,
    };

    // !itemAbm.id ? noIdItemAbm : (noIdItemAbm['id'] = itemAbm.id);
    // !itemAbm._id ? noIdItemAbm : noIdItemAbm['_id'] = itemAbm._id;
    return this.http
      .put<any>(
        `${this.apiMockX}/${itemAbm.id}`, // MOCK
        // .put<any>(`${apiAbmDemo}/${itemAbm._id}`, // MONGO
        noIdItemAbm
      )
      .pipe(
        first(),
        map((data) => {
          console.log('Update dato devuelto Update:', data);
          // const getRole = String(data.role._id);
          // this.authenticationService.getMenu(getRole);
          return data;
        })
      );
  }

  // CREATE

  createAbmItem(itemAbm): Observable<any> {
    console.log('El itemAbm es', itemAbm);
    console.log('Se inició en servicio la consulta ItemAbm Create');
    let withIditemAbm = {
      title: itemAbm.title,
      price: itemAbm.price,
      stock: itemAbm.stock,
      thumbnail: itemAbm.thumbnail,
      timestamp: itemAbm.timestamp,
    };

    return this.http.post<any>(`${this.apiMockX}`, withIditemAbm).pipe(
      first(),
      map((data) => {
        console.log('Create dato devuelto Create:', data);
        // const getRole = String(data.role._id);
        // this.authenticationService.getMenu(getRole);
        return data;
      })
    );
  }

  createCart(): Observable<any> {
    console.log('Cart');
    console.log('Se inició en servicio la consulta Cart Create');
    return this.http.post<any>(`${this.apiMockCart}`, {}).pipe(
      first(),
      map((data) => {
        console.log('Create dato devuelto Create Cart:', data);
        return data;
      })
    );
  }

  createCartItemComplex(itemCart): Observable<any> {
    console.log('POR ID', itemCart);
    const id = '1658269276051';
    return this.http
      .post<any>(`${this.apiMockCart}/${id}/products`, {
        id: id,
        product: itemCart,
      })
      .pipe(
        first(),
        map((data) => {
          console.log('Create dato devuelto Create Cart:', data);
          return data;
        })
      );
  }

  createCartItem(itemCart): Observable<any> {
    console.log('El itemCart es', itemCart);
    console.log('Se inició en servicio la consulta ItemCart Create');
    return this.getCartItems().pipe(
      first(),
      map((data) => {
        console.log('Create GET dato devuelto Create:', data);
        // const getRole = String(data.role._id);
        // this.authenticationService.getMenu(getRole);
        return data.cart[0].id;
      })
    );
  }

  // Obsevables RXJS DELETE
  deleteAbmItem(itemAbmId): Observable<any> {
    console.log('El Item es', itemAbmId);

    console.log('Se inició en servicio la consulta ITEM ABM Delete');
    return this.http.delete<any>(`${this.apiMockX}/${itemAbmId}`).pipe(
      first(),
      map((data) => {
        console.log('Delete dato devuelto Delete:', data);
        // const getRole = String(data.role._id);
        // this.authenticationService.getMenu(getRole);
        return data;
      })
    );
  }
  // Obsevables RXJS DELETE
  deleteCart(itemCartId): Observable<any> {
    console.log('El Item es', itemCartId);
    console.log('Se inició en servicio la consulta ITEM Cart Delete');
    return this.http.delete<any>(`${this.apiMockCart}/${itemCartId}`).pipe(
      first(),
      map((data) => {
        console.log('Delete dato devuelto Delete:', data);
        // const getRole = String(data.role._id);
        // this.authenticationService.getMenu(getRole);
        return data;
      })
    );
  }

  deleteProductItemFromCart(idCart, idProduct): Observable<any> {
    console.log('El Item es', idProduct);
    console.log('Se inició en servicio la consulta ITEM CART Delete');
    return this.http
      .delete<any>(`${this.apiMockCart}/${idCart}/products/${idProduct}`)
      .pipe(
        first(),
        map((data) => {
          console.log('Delete dato devuelto Delete:', data);
          // const getRole = String(data.role._id);
          // this.authenticationService.getMenu(getRole);
          return data;
        })
      );
  }

  // Fetch JS
  fetchData = async (endpoint, method) => {
    try {
      const res = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return res.json();
    } catch (err) {
      return err;
    }
  };

  fetchDelete = async (endpoint, method) => {
    try {
      const res = await fetch(endpoint, {
        method: method,
      });
      return res.json();
    } catch (err) {
      return err;
    }
  };
}
