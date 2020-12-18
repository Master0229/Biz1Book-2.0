import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../auth.service';
// import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pricebook',
  templateUrl: './pricebook.component.html',
  styleUrls: ['./pricebook.component.scss']
})
export class PricebookComponent implements OnInit {

  activeKey = 0
  StoreId: any;
  Pricedata: any;
  show = false;
  CompanyId: any;
  p;
  p1;
  term;
  datachange: boolean = false;
  @HostListener('document:click', ['$event']) ClickOutsideDirective($event) {
    var Id = $event.path[0].id
    var element = document.getElementById(Id);
    if (element != null) {
      element.focus();
    }
  }
  constructor(private Auth: AuthService, 
    // private datService: DataService
    ) {
    var logInfo = JSON.parse(localStorage.getItem("logInfo"));
    console.log(logInfo)
    // this.CompanyId = logInfo.CompanyId;
    // this.StoreId = logInfo.StoreId;
  }
  canDeactivate(): boolean {
    return !this.datachange;
  }
  ngOnInit() {
    this.GetPrice();
  }
  GetPrice() {
    this.Auth.GetPrice(this.StoreId).subscribe(data => {
      this.Pricedata = data;
      console.log(this.Pricedata);
      this.Pricedata.streprd.forEach(element => {
        element.priceE = false;
        element.delpriceE = false;
        element.takpriceE = false;
        element.Changed = false;
      });
      console.log(this.Pricedata);
    })
  }
  SavePrd() {
    var arr = this.Pricedata.streprd.filter(x => x.Changed == true)
    var postdata = { data: JSON.stringify(arr) };
    this.Auth.Updatepricebook(postdata).subscribe(data => {
      var response: any = data;
      this.GetPrice();
      if (response.status == 200) {
        // console.log(toast(response.msg));
      } else if (response.status == 0) {
        // console.log(dangertoast(response.msg));
      }
      this.datachange = false;
    });
  }
  // savePrice(item)
  // {
  //   console.log(item);
  //   var postdata = { data: JSON.stringify(item) };
  //   this.Auth.Updatepricebook(postdata).subscribe(data=>{})
  // }
  saveOpt() {
    var arr = this.Pricedata.streopt.filter(x => x.Changed == true)
    var postdata = { data: JSON.stringify(arr) };
    this.Auth.Updateoptionbook(postdata).subscribe(data => {
      var response: any = data;
      if (response.status == 200) {
        // console.log(toast(response.msg));
      } else if (response.status == 0) {
        // console.log(dangertoast(response.msg));
      }
    });
  }
  focus() {
    // var Id = price+id;
    console.log(document.getElementById('myTabContent'));
    document.getElementById("Price1056").focus();
  }
  changeKey(key) {
    this.activeKey = key
  }

}