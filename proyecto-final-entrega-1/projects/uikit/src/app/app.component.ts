import { AbmService } from './_services/abm.services';
import { Component } from '@angular/core';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'uikit';

  cartTotalCount: number;
  // cartTotal: number;
  // favouriteTotal: number;
  // subscription: Subscription;

  public openOver = false;
  constructor(private abmService: AbmService) {
    this.abmService.currentCart.subscribe((count) => {
      this.cartTotalCount = count;
      console.log('CART COUNT APP', count);
    });

    // this.subscription = this.abmService
    //   .getOrderCount()
    //   .subscribe((orderCount) => {
    //     this.cartTotal = orderCount.cartTotal;
    //     this.favouriteTotal = orderCount.favouriteTotal;
    //   });
  }

  // ngOnInit(): void {
  //   this.abmService.currentCart.subscribe((count) => {
  //     this.cartTotalCount = count;
  //     console.log('CART COUNT', count);
  //   });
  // }
  // ngOnDestroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
