import { AbmService } from './abm.services';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { first, shareReplay, timeInterval } from 'rxjs/operators';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root',
})
export class SwalertService {
  public paymentStatus;
  users = [];
  isCuit: any;

  constructor(private abmServices: AbmService, private router: Router) {}

  tinyAlert(title = false) {
    const swalCustomClassButtons = Swal.mixin({
      customClass: {
        confirmButton: 'uk-button-altern btn-primary', //insert class here
        closeButton: 'uk-button-altern uk-button-secondary uk-margin-small ', //insert class here
        cancelButton: 'uk-button-altern uk-black uk-margin-small ', //insert class here
        denyButton: 'uk-button-altern uk-danger uk-margin-small ', //insert class here
        input: 'uk-button-altern uk-warning uk-margin-small ', //insert class here
      },
      buttonsStyling: false,
    });
    swalCustomClassButtons.fire({
      icon: 'success',
      title: `${title ? title : 'OK!'}`,
    });

    console.log('FUNCION ALERT OK');
  }

  successNotification(title, text) {
    const swalCustomClassButtons = Swal.mixin({
      customClass: {
        confirmButton: 'uk-button-altern btn-primary uk-margin-small ', //insert class here
        closeButton: 'uk-button-altern uk-button-secondary uk-margin-small ', //insert class here
        cancelButton: 'uk-button-altern uk-black uk-margin-small ', //insert class here
        denyButton: 'uk-button-altern uk-danger uk-margin-small ', //insert class here
        input: 'uk-button-altern uk-warning uk-margin-small ', //insert class here
      },
      buttonsStyling: false,
    });

    swalCustomClassButtons.fire({
      // position: 'top-end',
      icon: 'success',
      title: `${title}`,
      text: `${text}`,
      showConfirmButton: false,
      timer: 1500,
    });
    // Swal.fire(`${title}`, `${text}`, 'success');
    // Swal.fire({
    //   text: 'example text',
    //   buttonsStyling: false,
    //   customClass: {
    //     confirmButton: 'btn-custom', //insert class here
    //     closeButton: 'btn-custom', //insert class here
    //     cancelButton: 'btn-custom', //insert class here
    //     denyButton: 'btn-custom', //insert class here
    //     input: 'btn-custom', //insert class here
    //   }
    // })
    // Swal.fire(`${title}`, `${text}`, 'success');
    console.log('FUNCION EXITO');
  }

  alertConfirmation() {
    const swalCustomClassButtons = Swal.mixin({
      customClass: {
        confirmButton: 'uk-button-altern btn-primary uk-margin-small ', //insert class here
        closeButton: 'uk-button-altern uk-button-secondary uk-margin-small ', //insert class here
        cancelButton: 'uk-button-altern uk-black uk-margin-small ', //insert class here
        denyButton: 'uk-button-altern uk-danger uk-margin-small ', //insert class here
        input: 'uk-button-altern uk-warning uk-margin-small ', //insert class here
      },
      buttonsStyling: false,
    });

    swalCustomClassButtons
      .fire({
        title: `¿Continuar?`,
        text: 'No se puede deshacer esta acción.',
        icon: 'warning',
        showCancelButton: true, // confirmButtonClass: 'btn-danger',
        showConfirmButton: true, // confirmButtonClass: 'btn-danger',
        confirmButtonText: 'Si, continuar',
        cancelButtonText: 'No, veré luego',
      })
      .then((result) => {
        if (result.value) {
          swalCustomClassButtons.fire(
            'Confirmado!',
            `El proceso se ha confirmado.`,
            'success'
          );
          console.log('FUNCION SWAL CONFIRM');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalCustomClassButtons.fire(
            'Cancelado',
            `El proceso se canceló.`,
            'error'
          );
          console.log('FUNCION SWAL CANCEL');
        }
      });
  }

  // showCoinExchangeData(elementData) {
  //   console.log('toma de datos', elementData);
  //   // if(elementData.account)

  //   let btc = [];
  //   let eth = [];
  //   let datos = [{ name: elementData.name, dni: elementData.dni }];

  //   elementData.accounts.map(dato => {

  //     dato.currency === 'BTC' && btc.push({ currency: dato.currency, amount: dato.amount });
  //     dato.currency === 'ETH' && eth.push({ currency: dato.currency, amount: dato.amount });
  //     console.log(datos, dato.currency, dato.amount);
  //   });
  //   // let bt =
  //   // element
  //   // <i class="icon ico-bitcoin bcColor"></i>
  //   // // <i class="icon ico-ethereum etColor"></i>
  //   Swal.fire({
  //     // title: '<strong>HTML <u>example</u></strong>',
  //     // icon: 'info',
  //     html: `
  //       <div class="cripto-data">

  //       <h2 class="titulo-detalle font-semi mb-4">Detalle</h2>
  //       <span class="small">Nombre: </span><br>
  //       <strong>${datos[0].name}</strong><br>
  //       <span class="small">DNI: </span><br>
  //       <strong>${datos[0].dni}</strong><br>
  //       <h2 class="titulo-detalle font-semi my-4">Criptomoneda</h2>
  //       <div class="cripto-coins">
  //       ${btc[0] ? '<img class="coins" src="assets/img/logos/bitcoin.svg" alt="algo" /> ' + btc[0].currency + ' ' + btc[0].amount : ''}<br>
  //       ${eth[0] ? '<img class="coins" src="assets/img/logos/ethereum.svg" alt="algo" /> ' + eth[0].currency + ' ' + eth[0].amount : ''}<br>
  //       </div>
  //       </div>
  //       `,

  //     showCloseButton: false,
  //     buttonsStyling: false,
  //     customClass: {
  //       cancelButton: 'close-button' //insert class here
  //     },
  //     // cancelButtonText: "No, cancel plx!",
  //     // 'You can use <b>bold text</b>, ' +
  //     // '<a href="//sweetalert2.github.io">links</a> ' +
  //     // 'and other HTML tags',
  //     showCancelButton: true,
  //     showConfirmButton: false,

  //     // showCancelButton: true,
  //     // focusCloseButton: false,
  //     cancelButtonText: '<i class="icon ico-times"></i>',
  //     // confirmButtonAriaLabel: 'Thumbs up, great!',
  //     // cancelButtonText:
  //     //   '<i class="fa fa-thumbs-down"></i>',
  //     // cancelButtonAriaLabel: 'Thumbs down'
  //   })
  // }

  // paymentsSWA(operacionUid,
  //   clienteUid,
  //   cahorro,
  //   importe,isCuit = null, otro= null) {
  //   this.isCuit = isCuit ? isCuit : null;
  //   const roundTo = function (num: number, places: number) {
  //     const factor = 10 ** places;
  //     return Math.round(num * factor) / factor;
  //   };
  //   importe = roundTo(Number(importe), 2)
  //   // this.loansPaymentService.currentPS.subscribe(status => (this.paymentStatus = status));
  //   // console.log('this.paymentStatus',this.paymentStatus);
  //   Swal.fire({
  //     title: `¿Desea pagar  $${importe}?`,
  //     text: `${otro ? 'Su importe ingresado no puede ser mayor al monto total a saldar. Está por abonar el monto total a saldar.' : 'Esta acción no se puede deshacer'}`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     buttonsStyling: false,
  //     customClass: {
  //       confirmButton: 'confirm-button', //insert class here
  //       cancelButton: 'cancel-button', //insert class here
  //     },     // confirmButtonClass: 'btn-danger',
  //     confirmButtonText: 'Si, pagar.',
  //     cancelButtonText: 'No, veré luego.'
  //   }).then((result) => {
  //     if (result.value) {
  //       Swal.fire({
  //         title: `Pagado!`,
  //         text: `Se han pagado $${importe}.`,
  //         icon: `success`,
  //         buttonsStyling: false,
  //         customClass: {
  //           confirmButton: 'confirm-button',
  //         },
  //         confirmButtonText: 'Entendido',
  //       });
  //         this.loansPaymentService.payLoan(String(operacionUid), String(clienteUid), String(cahorro), String(importe))
  //           .pipe(first(), timeInterval())
  //           .subscribe({
  //             next: (data: any) => {
  //               if (data.value) {
  //                 console.log('PAGAR', data.value);
  //                 // this.setStep('DATA');
  //                 // this.swalertService.successNotification('¡Éxito!', 'Se ha pagado la cuota.');
  //                 // this.reloadCurrentRoute();
  //                 console.log('isCuit swa', isCuit);

  //               }
  //             },
  //             error: error => {

  //               // this.isDataLoaded = false;
  //               console.error('on error ', error);
  //               // this.errores = 'No hay cuentas dadas de alta para tu Empresa';
  //             }

  //           });
  //         console.log('Pago SWA', result.value);
  //       // this.paymentStatus = 'se pago';

  //       // this.reloadCurrentRoute();

  //     } else if (result.dismiss === Swal.DismissReason.cancel) {
  //       console.log('no pay swa isCuit', isCuit);
  //       Swal.fire({
  //         title: `Cancelado`,
  //         text: 'La cuota no se ha pagado.',
  //         icon: 'error',
  //         showConfirmButton: false,
  //         timer: 2000
  //       });
  //       console.log('FUNCION UUUUUUU');
  //     }
  //     // if (result.isConfirmed) {
  //     //             // this.loansPaymentService.getcuit = this.isCuit ? this.isCuit : null;
  //     //     this.loansPaymentService.changeStatusPayment(this.paymentStatus='hizoalgo');
  //     //     // this.loansPaymentService.getSearchByCuit(String(isCuit));
  //     // }

  //     });
  //   }

  deleteItemConfirmation(item, tipo, cart = false) {
    const swalCustomClassButtons = Swal.mixin({
      customClass: {
        confirmButton: 'uk-button-altern btn-primary uk-margin-small ', //insert class here
        closeButton: 'uk-button-altern uk-button-secondary uk-margin-small ', //insert class here
        cancelButton: 'uk-button-altern uk-black uk-margin-small ', //insert class here
        denyButton: 'uk-button-altern uk-danger uk-margin-small ', //insert class here
        input: 'uk-button-altern uk-warning uk-margin-small ', //insert class here
      },
      buttonsStyling: false,
    });
    swalCustomClassButtons
      .fire({
        title: `¿Desea borrar a ${tipo}?`,
        text: 'No se puede deshacer esta acción.',
        icon: 'warning',
        showCancelButton: true, // confirmButtonClass: 'btn-danger',
        confirmButtonText: 'Si, borrar.',
        cancelButtonText: 'No, veré luego.',
      })
      .then((result) => {
        if (result.value) {
          swalCustomClassButtons.fire(
            '¡Borrado!',
            `${tipo} se ha eliminado de la base.`,
            'success'
          );
          if (result.value) {
            if (cart) {
              this.abmServices
                .deleteProductItemFromCart(cart, item.id)
                // this.abmServices.deleteAbmItem(item._id) // MONGO
                .pipe(timeInterval())
                .subscribe({
                  next: (data) => {
                    console.log('Objeto crudo', data.value);
                    this.reloadCurrentRoute();
                  },
                  error: (error) => {
                    console.error('on error ', error);
                  },
                });
            }
          } else {
            this.abmServices
              .deleteAbmItem(item.id)
              // this.abmServices.deleteAbmItem(item._id) // MONGO
              .pipe(timeInterval())
              .subscribe({
                next: (data) => {
                  console.log('Objeto crudo', data.value);
                  this.reloadCurrentRoute();
                },
                error: (error) => {
                  console.error('on error ', error);
                },
              });
          }

          console.log('Delete SWA', result.value);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalCustomClassButtons.fire(
            'Cancelado',
            `${tipo} no se ha borrado.`,
            'error'
          );
          console.log('FUNCION disparada SWA');
        }
      });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log('currentUrl', currentUrl);
      // this.loansPaymentService.getcuit = this.isCuit ? this.isCuit : null;
    });
  }
}
