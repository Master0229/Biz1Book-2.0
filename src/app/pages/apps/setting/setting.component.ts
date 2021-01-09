import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'
import { slideFadeinUp, slideFadeinRight, zoomFadein, fadein } from '../../../layouts/router-animations'
import { AuthService } from "src/app/auth.service";
import { ElectronService } from 'ngx-electron';
import * as moment from 'moment';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  animations: [slideFadeinUp, slideFadeinRight, zoomFadein, fadein],
})
export class SettingComponent implements OnInit {
  activeKey = 0
  pskey = 0
  demoValue = 1
  value: string

  // olf pos


  settings$: Observable<any>
  isContentMaxWidth: Boolean
  isAppMaxWidth: Boolean
  isGrayBackground: Boolean
  isSquaredBorders: Boolean
  isCardShadow: Boolean
  isBorderless: Boolean
  menuLayoutType: string
  isMobileView: Boolean
  isMobileMenuOpen: Boolean
  routerAnimation: string
  isMenuCollapsed: Boolean
  leftMenuWidth: Number
  isTopbarFixed: Boolean
  isGrayTopbar: Boolean

  touchStartPrev: Number = 0
  touchStartLocked: Boolean = false

  constructor(private store: Store<any>){
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.isContentMaxWidth = state.isContentMaxWidth
      this.isAppMaxWidth = state.isAppMaxWidth
      this.isGrayBackground = state.isGrayBackground
      this.isSquaredBorders = state.isSquaredBorders
      this.isCardShadow = state.isCardShadow
      this.isBorderless = state.isBorderless
      this.menuLayoutType = state.menuLayoutType
      this.isMobileView = state.isMobileView
      this.isMobileMenuOpen = state.isMobileMenuOpen
      this.routerAnimation = state.routerAnimation
      this.isMenuCollapsed = state.isMenuCollapsed
      this.leftMenuWidth = state.leftMenuWidth
      this.isTopbarFixed = state.isTopbarFixed
      this.isGrayTopbar = state.isGrayTopbar
    })

  }

  // printers = [];
  // printersettings: any;
  // ipaddress: string = '';
  // ipServerAddressList = [];
  // setting_nav = 'preference';
  // userrole;
  // kotgroups = [];
  // orderbackups = [];
  // private socketServer = (this.electronService.isElectronApp) ? this.electronService.remote.require('./socket-server/src/socket-server') : null;
  // constructor(public electronService: ElectronService, private Auth: AuthService) {
  //   this.printersettings = JSON.parse(localStorage.getItem("printersettings"));
  //   this.kotgroups = JSON.parse(localStorage.getItem("KotGroups"));
  //   // this.kotgroups.forEach(grp => {
  //   //   grp.Printer = JSON.parse(grp.Printer);
  //   // })
  //   this.userrole = 1;
  //   console.log(this.kotgroups);
  //   if (this.printersettings.receiptcount == undefined) {
  //     this.printersettings.receiptcount = 1
  //   }
  //   if (this.printersettings.kotcount == undefined) {
  //     this.printersettings.kotcount = 1
  //   }
  // }
  // typesOfShoes: any[] = [
  //   { name: 'Boots', id: 1 },
  //   { name: 'Clogs', id: 1 },
  //   { name: 'Loafers', id: 1 },
  //   { name: 'Moccasins', id: 1 },
  //   { name: 'Sneakers', id: 1 }
  // ];
  // isbool: boolean;
  // orderPreferences: any;
  // preferences: any;


  ngOnInit(): void {
    this.bindMobileSlide()
    // this.orderbackups = JSON.parse(localStorage.getItem('orderbackup'))
    // console.log(moment("2020-09-28 13:09").format())
    // console.log(new Date("2020-09-28 13:09").getTime() / 1000, new Date().getTime() / 1000)
    // // setHeightWidth();
    // // mintos();
    // this.orderPreferences = JSON.parse(localStorage.getItem("orderPreferences"));
    // this.getpreferences();
    // this.ipaddress = localStorage.getItem('server-ip-address');
    // if (this.electronService.isElectronApp) {
    //   this.printers = this.electronService.remote.getGlobal("GetPinters")();
    //   console.log("sys-printers", this.printers);
    //   this.ipServerAddressList = this.socketServer.getServerIpAddress();
    // }
  }
  changeKey(key) {
    this.activeKey = key
  }
  changeKeyps(ps) {
    this.pskey = ps
  }


  // copy setting

  onCollapse(value: any) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isMenuCollapsed: value,
      }),
    )
  }

  toggleCollapsed() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isMenuCollapsed: !this.isMenuCollapsed,
      }),
    )
  }

  toggleMobileMenu() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isMobileMenuOpen: !this.isMobileMenuOpen,
      }),
    )
  }

  bindMobileSlide() {
    // mobile menu touch slide opener
    const unify = e => {
      return e.changedTouches ? e.changedTouches[0] : e
    }
    document.addEventListener(
      'touchstart',
      e => {
        const x = unify(e).clientX
        this.touchStartPrev = x
        this.touchStartLocked = x > 70 ? true : false
      },
      { passive: false },
    )
    document.addEventListener(
      'touchmove',
      e => {
        const x = unify(e).clientX
        const prev = this.touchStartPrev
        if (x - <any>prev > 50 && !this.touchStartLocked) {
          this.toggleMobileMenu()
          this.touchStartLocked = true
        }
      },
      { passive: false },
    )
  }

  routeAnimation(outlet: RouterOutlet, animation: string) {
    if (animation === this.routerAnimation) {
      return outlet.isActivated && outlet.activatedRoute.routeConfig.path
    }
  }

  // OLD POS
  // setstorepreferences() {
  //   localStorage.setItem("preferences", JSON.stringify(this.preferences))
  // }

  // setorderpreferences() {
  //   localStorage.setItem("orderPreferences", JSON.stringify(this.orderPreferences))
  // }

  // getPrintersettings() {
  //   this.printersettings = JSON.parse(localStorage.getItem("printersettings"));
  //   console.log(this.printersettings);
  // }
  // setprinter(Id, selected) {
  //   console.log(selected)
  //   var printers = []
  //   selected.selected.forEach(element => {
  //     printers.push(element.value)
  //   });
  //   this.kotgroups.filter(x => x.Id == Id)[0].Printer = printers;
  //   console.log(printers)
  // }
  // isprinter(id, printer) {
  //   return this.kotgroups.filter(x => x.Id == id)[0].Printer.some(x => x == printer);
  // }
  // saveSettings() {
  //   localStorage.setItem("printersettings", JSON.stringify(this.printersettings));
  //   if (navigator.onLine) {
  //     var storeId = JSON.parse(localStorage.getItem("logInfo")).StoreId;
  //     var store;
  //     this.Auth.editStore(storeId).subscribe(data => {
  //       store = data;
  //       // console.log(store);
  //       var printersettings = JSON.parse(localStorage.getItem("printersettings"))
  //       store.receiptprinter = printersettings.receiptprinter;
  //       store.kotprinter = printersettings.kotprinter;
  //       this.kotgroups.forEach(grp => {
  //         grp.Printer = JSON.stringify(grp.Printer);
  //       })
  //       localStorage.setItem("KotGroups", JSON.stringify(this.kotgroups))
  //       this.Auth.updateStore({ data: JSON.stringify(store), kotprinterdata: JSON.stringify(this.kotgroups) }).subscribe(response => {
  //         var res: any = response;
  //         if (res.status == 200) {
  //           // toast('PrinterSettings Saved Successfully')
  //           // } else {
  //           // dangertoast('Please Try again!')
  //         }
  //       });
  //     });
  //   } else {
  //     // dangertoast('Your offline. Please check your internet connection')
  //   }
  // }
  // saveandatartserver() {
  //   if (this.ipaddress != ('' || null || undefined)) {
  //     localStorage.setItem('server-ip-address', this.ipaddress)
  //     if (this.electronService.isElectronApp)
  //       this.socketServer.startServer(this.ipaddress);
  //   }
  // }
  // updatepreferences() {
  //   this.setstorepreferences();
  //   if (navigator.onLine) {
  //     this.Auth.updatepreference(this.preferences).subscribe(data => {
  //       console.log(data)
  //       if (data["status"] == 200) {
  //       }
  //     })
  //   } else {
  //     // dangertoast('Your offline. Please check your internet connection')
  //   }
  // }
  // getpreferences() {
  //   this.preferences = JSON.parse(localStorage.getItem("preferences"));
  // }
  // retryorder(order) {
  //   this.Auth.saveOrder({ ordData: JSON.stringify([order]) }).subscribe(data => {
  //     var response: any = data;
  //     // this._snackBar.open(response.msg, 'x',
  //     //  {
  //     //   duration: 1000,
  //     // });
  //   })
  // }
  // clearorderbackup() {
  //   localStorage.setItem('orderbackup', '[]')
  //   this.orderbackups = [];
  // }

}
