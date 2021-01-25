import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectronService } from 'ngx-electron';
import { AuthService } from 'src/app/auth.service';
import * as moment from "moment";
import {  SafeHtml } from '@angular/platform-browser';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap'



@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  model: NgbDateStruct
  date: { year: number; month: number }



  // hide and Show
  // public show: boolean = false;

  // Hide and show with Back function

  public buttonName: any = 'Back';

  value: string

  dateRange = []

  selectedValue = 'All'





 

  //OLD Pos
  receipts: any;
  show: number = 0;
  orderitem: any;
  orderno: any;
  Subtotal: number = 0;
  CGST: number = 0;
  SGST: number = 0;
  IGST: number = 0;
  Total: number = 0;
  additionalCharge: number = 0;
  element: any;
  KOTs: any;
  html: SafeHtml;
  KOTItems: any = {};
  CompanyId: any;
  StoreId: any;
  UserId: number;
  OrderStauts: number;
  AdditionalCharges: any = [];
  FirstId: boolean;
  LastId: boolean;
  systemPrinters: any;
  address: any;
  city: any;
  phone: any;
  orderedDate: any;
  Company: any;
  ContactNo: any;
  strdate: string;
  enddate: string;
  user: any;
  id = 1;


  constructor(
    private Auth: AuthService, private modalService: NgbModal, private sanitizer: DomSanitizer, private electron: ElectronService, private calendar: NgbCalendar,
    // private datService: DataService,
    // public printService: PrintService,
    // public dialog: MatDialog,
  ) {
    // var logInfo = JSON.parse(localStorage.getItem("logInfo"));
    // this.CompanyId = logInfo.CompanyId;
    // this.Company = logInfo.Company;
    // this.StoreId = logInfo.StoreId;
    // this.ContactNo = logInfo.ContactNo;
    // var userInfo = JSON.parse(localStorage.getItem("user"));
    // this.UserId = userInfo.Id;
    // this.transaction = { Amount: 0, OrderId: 0, CompanyId: this.CompanyId, StoreId: this.StoreId, PaymentTypeId: 0, CustomerId: 0, UserId: this.UserId };
    // this.user = JSON.parse(localStorage.getItem("user"));
    this.CompanyId = 3;
    this.StoreId = 4;
    this.UserId=null;
  }

  //OLD POS MAster
  ordData: any;
  pending: any;
  PaidAmount: any;
  transaction: { Amount: number, OrderId: number, CompanyId: number, StoreId: number, PaymentTypeId: number, CustomerId: number, UserId: number };
  transactions: any;
  customer: any;
  cash: number;
  card: number;
  paymentid: number;
  price: number;
  remaining: number;
  online$: boolean = navigator.onLine;
  Discount: number;
  invoice;
  OrderSts = {};
  PaymentSts = {};
  exclude1 = {};
  exclude2 = {};
  ordSts = 'All';
  pmtSts = 'All';
  ngforLen;
  totalsales: number;
  totalpayments: number;
  paymentpercent;
  ordertype = '';
  orderlogs: any = [];
  show_carousel = false;
  ranges: any = {
    'Today': [moment(), moment()],
    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
    'This Month': [moment().startOf('month'), moment().endOf('month')],
    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  }
  invalidDates: moment.Moment[] = [moment().add(2, 'days'), moment().add(3, 'days'), moment().add(5, 'days')];
  selected: any = { startDate: moment(), endDate: moment() };
  isInvalidDate = (m: moment.Moment) => {
    return this.invalidDates.some(d => d.isSame(m, 'day'))
  }
  today: string = moment().format('YYYY-MM-DD')
  preferences;
  carouseldata = [
    { id: 1, name: 'DineIn', count: 0, sales: 0, paid: 0, cancellcount: 0 },
    { id: 2, name: 'TakeAway', count: 0, sales: 0, paid: 0, cancellcount: 0 },
    { id: 3, name: 'Delivery', count: 0, sales: 0, paid: 0, cancellcount: 0 },
    { id: 4, name: 'Pickup', count: 0, sales: 0, paid: 0, cancellcount: 0 },
    { id: 5, name: 'Counter', count: 0, sales: 0, paid: 0, cancellcount: 0 },
    { id: 6, name: 'Partner', count: 0, sales: 0, paid: 0, cancellcount: 0 },
  ]

  


  ngOnInit(): void {
      // this.datService.execute();
    this.preferences = JSON.parse(localStorage.getItem("preferences"));
    // setHeightWidth();
    this.strdate = moment().format('YYYY-MM-DD');
    this.enddate = moment().format('YYYY-MM-DD');
    console.log(this.strdate, this.enddate);
    this.getReceipt(0, "next", "all", moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD'), null);
    this.html = this.sanitizer.bypassSecurityTrustHtml(`<h1>qwerty</h1>`);
    // this.getorderlogs();
   
  }



 

  toggle() {
    // this.show = !this.show;


    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Back";
    else
      this.buttonName = "Back";
  }



  // OLD POS

  nextRecipts(type) {
    if (type == "next") {
      this.getReceipt(this.receipts.receipts[this.receipts.receipts.length - 1].Id, "next", "all", this.strdate, this.enddate, null);
    } else if (type == "prev") {
      this.getReceipt(this.receipts.receipts[0].Id, "prev", "all", this.strdate, this.enddate, null);
    }
  }

  getorderlogs() {
    this.Auth.getorderlogs(this.StoreId, this.CompanyId).subscribe(data => {
      this.orderlogs = data;
      // this.orderlogs.forEach(element => {
      //   element.order = JSON.parse(element.Payload)
      // });
    })
  }
  i = 63;
  retry(order) {
    this.Auth.saveOrder({ ordData: JSON.stringify([order]) }).subscribe(data => {
      console.log(data)
    })
  }
  filterorderlogs() {
    return this.orderlogs.filter(x => !x.hide);
  }
  print1() {
    var PrintCommandObject = null;
    PrintCommandObject.ExecWB(6, 2);
    function printPage() {
      // console.log(PrintCommandObject)
      if (PrintCommandObject) {
        try {
          PrintCommandObject.ExecWB(6, 2);
          PrintCommandObject.outerHTML = "";
        }
        catch (e) {
          alert(e);
          window.print();
        }
      }
      else {
        window.print();
      }
    }
  }
  // filterReceiptFilter(filter) {
  //   var obj:object = this.ReceiptFilter;
  //   if (filter == "payment") {
  //     // delete obj.PaymentStatusId;
  //   } else if (filter == "order") {
  //     delete obj.OrderStatusId;
  //   }
  //   // console.log(obj);
  //   return obj;
  // }
  getReceipt(startId, type, datatype, fromdate, todate, invoice) {
    this.OrderSts = {};
    this.PaymentSts = {};
    this.exclude1 = {};
    this.exclude2 = {};
    this.ordSts = 'All';
    this.pmtSts = 'All';
    this.invoice = '';
    this.FirstId = false;
    this.LastId = false;
    // this.carouseldata.forEach(cdata => {
    //   cdata.cancellcount = 0;
    //   cdata.sales = 0;
    //   cdata.paid = 0;
    //   cdata.count = 0;
    // })
    this.Auth.getReceipt(this.StoreId, this.CompanyId, startId, type, datatype, fromdate, todate, invoice).subscribe(data => {
      this.totalsales = 0;
      this.totalpayments = 0;
      this.receipts = data
      if (this.receipts.receipts.some(x => x.Id === this.receipts.FirstOrderId[0].Id)) {
        this.FirstId = true;
      }
      if (this.receipts.receipts.some(x => x.Id === this.receipts.LastOrderId[0].Id)) {
        this.LastId = true;
      }
      this.receipts.PaymentType.forEach(x => {
        x.Price = 0;
      });
      this.receipts.receipts.forEach(element => {
        if (element.BillAmount > element.PaidAmount && element.OrderStatusId != -1) {
          element.PaymentStatusId = 1;
        } else if (element.BillAmount == element.PaidAmount) {
          element.PaymentStatusId = 2;
        } else if (element.OrderStatusId == -1) {
          element.PaymentStatusId = 3;
        }
        // if (element.OrderStatusId != -1) {
        //   this.totalsales = this.totalsales + element.BillAmount;
        //   this.totalpayments = this.totalpayments + element.PaidAmount;
        // }
        element.OrderedDateTime = moment(element.OrderedDateTime).format('lll');
        if (element.Source == 'swiggy') {
          element.logo = './assets/images/swiggy.svg';
        } else if (element.Source == 'zomato') {
          element.logo = './assets/images/zomato.svg';
        } else {
          element.logo = './assets/images/favicon.png';
        }
      
      });
      this.totalsales = +this.receipts.TotalPayments[0].TotalSales.toFixed(0);
      this.totalpayments = +this.receipts.TotalPayments[0].TotalPayment.toFixed(0);
      this.paymentpercent = +((this.totalpayments / this.totalsales) * 100).toFixed(0);
      // this.paymentpercent = this.paymentpercent.toFixed(0);
      // console.log(this.receipts)
      // this.carouseldata = this.carouseldata.sort((a,b) => b.sales - a.sales);
      console.log(this.carouseldata)
      this.show_carousel = true;
    });
  }
    setdate(e) {
    if (e.startDate != (null || undefined) && e.endDate != (null || undefined)) {
      this.strdate = moment(e.startDate).format("YYYY-MM-DD");
      this.enddate = moment(e.endDate).format("YYYY-MM-DD");
      console.log(this.strdate, this.enddate)
      this.getReceipt(0, "next", "all", this.strdate, this.enddate, null);
    }
  }
  getbyInvoice(e) {
    // console.log(e);
    this.getReceipt(0, "next", "byinvoiceno", null, null, e);
  }
  payment(Id) {
    this.transaction.PaymentTypeId = Id;
    this.receipts.PaymentType.forEach(element => {
      if (element.Id == Id) {
        element.Price = this.Total - this.PaidAmount;
        this.transaction.Amount = element.Price;
        this.remaining = this.transaction.Amount - element.Price;
      }
      else {
        element.Price = 0;
      }
    });
  }
  setPrice() {
    this.transaction.Amount = 0;
    let count = 0;
    let Id;
    this.receipts.PaymentType.forEach(element => {
      if (element.Price > 0) {
        count++;
        Id = element.Id;
      }
      this.transaction.Amount = this.transaction.Amount + element.Price;
    });
    if (count == 1) {
      this.transaction.PaymentTypeId = Id;
    }
  }
  sum() {
    this.price = 0;
    this.receipts.PaymentType.forEach(element => {
      this.price = this.price + element.Price;
    });
    this.remaining = this.Total - this.PaidAmount - this.price;
  }
  filter(id, additionalCharge, PaidAmount) {
    // this.getReceipt(0);
    this.PaidAmount = PaidAmount;
    this.Subtotal = 0;
    this.CGST = this.receipts.receipts.filter(x => x.Id == id)[0].Tax1;
    this.SGST = this.receipts.receipts.filter(x => x.Id == id)[0].Tax2;
    this.IGST = this.receipts.receipts.filter(x => x.Id == id)[0].Tax3;
    this.address = this.receipts.receipts.filter(x => x.Id == id)[0].Address;
    this.city = this.receipts.receipts.filter(x => x.Id == id)[0].City;
    this.phone = this.receipts.receipts.filter(x => x.Id == id)[0].PhoneNo;
    this.orderedDate = this.receipts.receipts.filter(x => x.Id == id)[0].OrderedDateTime;
    this.Total = 0;
    this.Discount = this.receipts.receipts.filter(x => x.Id == id)[0].DiscAmount;
    this.orderno = this.receipts.receipts.filter(x => x.Id == id)[0].InvoiceNo;
    this.ordertype = this.receipts.receipts.filter(x => x.Id == id)[0].OrderType;
    this.AdditionalCharges = this.receipts.AdditionalCharges.filter(x => x.OrderId == id);
    if (additionalCharge != null) {
      this.additionalCharge = additionalCharge;
    }
    else {
      this.additionalCharge = 0;
    }
    this.KOTs = this.receipts.KOTs.filter(x => x.OrderId == id);
    var ordItemArr = JSON.parse(JSON.stringify(this.receipts.orderItems.filter(x => x.OrderId == id)));
    // this.orderitem = this.receipts.orderItems.filter(x => x.OrderId == id);
    this.orderitem = [];
    // console.log(this.receipts.orderItems);
    ordItemArr.forEach(element => {
      // console.log(element.Price)
      if (this.orderitem.some(x => x.Description === element.Description)) {
        if (element.StatusId == -1) {
          this.orderitem.filter(x => x.Description === element.Description)[0].Quantity = this.orderitem.filter(x => x.Description === element.Description)[0].Quantity + element.Quantity;
          this.orderitem.filter(x => x.Description === element.Description)[0].Price = this.orderitem.filter(x => x.Description === element.Description)[0].Price - element.Price;
        } else {
          this.orderitem.filter(x => x.Description === element.Description)[0].Quantity = this.orderitem.filter(x => x.Description === element.Description)[0].Quantity + element.Quantity;
          this.orderitem.filter(x => x.Description === element.Description)[0].Price = this.orderitem.filter(x => x.Description === element.Description)[0].Price + element.Price;
        }
      }
      else {
        this.orderitem.push(element);
      }
    });
    // console.log(this.receipts.orderItems);
    // console.log(this.orderitem);
    this.orderitem = this.orderitem.filter(x => x.Quantity > 0);
    
    this.transactions = this.receipts.Transaction.filter(x => x.OrderId == id);
    // console.log(this.transactions);
    // console.log(this.transactions[0], this.customer)
    if (this.transactions[0] != undefined) {
      this.customer = this.receipts.Customers.filter(x => x.Id == this.transactions[0].CustomerId)[0];
    }
    // console.log(this.customer);
    if (this.customer == undefined) {
      this.customer = { Name: "-", PhoneNo: "-", Address: "-" }
    }
    for (let i = 0; i < this.transactions.length; i++) {
      this.transactions[i].TransDateTime = moment(this.transactions[i].TransDateTime).format('LLL')
    }
    for (let i = 0; i < this.orderitem.length; i++) {
      this.Subtotal = this.Subtotal + this.orderitem[i].UnitPrice * this.orderitem[i].Quantity;
    }
    this.additionalCharge = 0;
    this.AdditionalCharges.forEach(element => {
      this.additionalCharge = this.additionalCharge + element.ChargeAmount;
    });
    this.Total = this.CGST + this.SGST + this.IGST + this.Subtotal + this.additionalCharge - this.Discount;
    this.Total = +this.Total.toFixed(0);
    // this.pending = this.Total - PaidAmount;
    this.transaction.Amount = this.Total - this.PaidAmount;
    this.remaining = this.Total - this.PaidAmount;
    this.element = document.getElementById("qqq") as HTMLElement;
  }
  Pay() {
    // var data1 = {Amount:this.orderitem.PaidAmount,OrderId:this.orderitem[0].OrderId,CompanyId:1,StoreId:2}
    this.transaction.OrderId = this.orderitem[0].OrderId;
    this.transaction.CustomerId = this.customer.Id;
    if (this.transaction.PaymentTypeId == 5) {
      let tempArray = this.receipts.PaymentType.filter(x => x.Price > 0);
      tempArray.forEach(element => {
        if (element.Price > 0) {
          this.transaction.PaymentTypeId = element.Id;
          this.transaction.Amount = element.Price;
          var postdata = { value: JSON.stringify(this.transaction) };
          this.Auth.transact(postdata).subscribe(data => {
            var preorders = JSON.parse(localStorage.getItem("preOrders"));
            preorders.forEach(element1 => {
              if (element1.OrderId == this.orderitem[0].OrderId) {
                element1.PaidAmount = element1.PaidAmount + element.Price;
                localStorage.setItem("preOrders", JSON.stringify(preorders));
                // this.datService.emitOrder();
              }
            });
            this.getReceipt(0, "next", "all", null, null, null);
            this.show = 0
          })
        }
      });
    }
    else {
      var postdata = { value: JSON.stringify(this.transaction) };
      this.Auth.transact(postdata).subscribe(data => {
        var preorders = JSON.parse(localStorage.getItem("preOrders"));
        preorders.forEach(element1 => {
          if (element1.OrderId == this.orderitem[0].OrderId) {
            element1.PaidAmount = element1.PaidAmount + this.transaction.Amount;
            localStorage.setItem("preOrders", JSON.stringify(preorders));
            // this.datService.emitOrder();
          }
        });
        this.getReceipt(0, "next", "all", null, null, null);
        this.show = 0
      })
    }
  }
  cancel(amount) {
    this.transaction.Amount = -amount;
    this.transaction.OrderId = this.orderitem[0].OrderId;
    // this.transaction.PaymentTypeId = 1;
    this.transaction.CompanyId = this.CompanyId;
    this.transaction.CustomerId = this.customer.Id;
    var postdata = { value: JSON.stringify(this.transaction) };
    this.Auth.transact(postdata).subscribe(data => {
      this.getReceipt(0, "next", "all", null, null, null);
      this.show = 0
    })
  }
  openOrderpopup(orderDetail) {
    const modalRef = this.modalService
      .open(orderDetail, {
        ariaLabelledBy: "modal-basic-title",
        centered: true
      })
      .result.then(
        result => {
          //this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  // date() {
  //   var date = datefunc();
  //   // console.log(date);
  // }
  KOTFilter(id) {
    // console.log(this.receipts.orderItems.filter(x => x.KOTId == id));
    this.KOTItems.AddedItems = this.receipts.orderItems.filter(x => x.KOTId == id && x.StatusId != -1);
    this.KOTItems.RemovedItems = this.receipts.orderItems.filter(x => x.KOTId == id && x.StatusId == -1);
    // console.log(this.KOTItems);
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('demo').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
    <html>
      <head>
        <title>Print tab</title>
        <style>
        @media print {
          app-root > * { display: none; }
          app-root app-print-layout { display: block; }
          .header{
            text-align: center;
          }
          th{
            text-align: left 
        }
          body   { font-family: 'Courier New', Courier, monospace; width: 300px }
          br {
            display: block; /* makes it have a width */
            content: ""; /* clears default height */
            margin-top: 0; /* change this to whatever height you want it */
          }
          hr.print{
            display: block;
            height: 1px;
            background: transparent;
            width: 100%;
            border: none;
            border-top: dashed 1px #aaa;
        } 
        tr.print
          {
            border-bottom: 1px solid #000;;
          }
        }
        </style>
      </head>
  <body onload="window.print();window.close()">${printContents}</body>
    </html>`
    );
    popupWin.document.close();
  }
  electronPrint() {
    console.log(this.orderitem, this.Discount)
    var element = `<div class="header">
    <p style="text-align: center;font-family: Helvetica;font-size: medium;"><strong>${this.Company}</strong></p>
    <p style="text-align: center;font-family: Helvetica;font-size: small;">
    ${this.address}, ${this.city},  ${this.ContactNo}<br>
    GSTIN:${localStorage.getItem("GSTno")}<br>
    Receipt: ${this.orderno}<br>
    ${this.orderedDate}</p>
    <hr>
    </div>
    <table>
        <thead>
            <tr>
                <th style="width: 100px;"><strong>ITEM</strong></th>
                <th><strong>PRICE</strong></th>
                <th><strong>QTY</strong></th>
                <th style="text-align: right;padding-right:20px"><strong>AMOUNT</strong></th>
            </tr>
        </thead>
        <tbody>`
    var Subtotal = 0;
    var disc_tax = 0;
    this.orderitem.forEach(item => {
      element = element + `<tr>
      <td style="width: 100px;">${item.Description}</td>
      <td>${item.UnitPrice}</td>
      <td>${item.Quantity}${item.ComplementryQty > 0 ? '+' + item.ComplementryQty : ''}</td>
      <td style="text-align: right;padding-right:20px">${this.preferences.ShowTaxonBill
          ? (item.UnitPrice * item.Quantity).toFixed(2)
          : (item.UnitPrice * item.Quantity * (1 + (item.Tax1 + item.Tax2 + item.Tax3) / 100)).toFixed(2)}</td>
      </tr>`
      if (!this.preferences.ShowTaxonBill) {
        Subtotal = Subtotal + (item.UnitPrice * item.Quantity * (1 + (item.Tax1 + item.Tax2 + item.Tax3) / 100));
        disc_tax = disc_tax + this.Discount * (item.Tax1 + item.Tax2 + item.Tax3) / 100;
      }
    });
    element = element + `
    </tbody>
    </table>
    <hr>
    <table>
        <tbody>
            <tr>
                <td style="width: 100px;"><strong>Subtotal</strong></td>
                <td></td>
                <td></td>
                <td style="text-align: right;padding-right:20px">${this.preferences.ShowTaxonBill
        ? this.Subtotal.toFixed(2)
        : Subtotal.toFixed(2)}</td>
            </tr>`
    this.AdditionalCharges.forEach(item => {
      element = element + `<tr">
                                <td style="width: 100px;"><strong>${item.Description}</strong></td>
                                <td></td>
                                <td></td>
                                <td style="text-align: right;padding-right:20px">${item.ChargeAmount.toFixed(2)}</td>
                            </tr>`
    });
    if (this.Discount > 0) {
      element = element + `<tr>
      <td style="width: 100px;"><strong>Discount</strong></td>
      <td></td>
      <td></td>
      <td style="text-align: right;padding-right:20px">${(this.Discount + disc_tax).toFixed(2)}</td>
      </tr>`
    }
    if (this.CGST > 0 && this.preferences.ShowTaxonBill) {
      element = element + `<tr>
      <td style="width: 100px;"><strong>CGST</strong></td>
      <td></td>
      <td></td>
      <td style="text-align: right;padding-right:20px">${this.CGST.toFixed(2)}</td>
  </tr>`
    }
    if (this.SGST > 0 && this.preferences.ShowTaxonBill) {
      element = element + `<tr>
      <td style="width: 100px;"><strong>SGST</strong></td>
      <td></td>
      <td></td>
      <td style="text-align: right;padding-right:20px">${this.SGST.toFixed(2)}</td>
  </tr>`
    }

    element = element + `
            <tr>
                <td style="width: 100px;">Paid</td>
                <td></td>
                <td></td>
                <td style="text-align: right;padding-right:20px"><strong>${(+this.PaidAmount.toFixed(0)).toFixed(2)}</strong></td>
            </tr>
            <tr>
                <td style="width: 100px;">Total</td>
                <td></td>
                <td></td>
                <td style="text-align: right;padding-right:20px"><strong>${(+this.Total.toFixed(0)).toFixed(2)}</strong></td>
            </tr>
            <tr ${(+(this.Total - this.PaidAmount).toFixed(0) == 0) ? 'hidden' : ''}>
                <td style="width: 100px;">Balance</td>
                <td></td>
                <td></td>
                <td style="text-align: right;padding-right:20px"><strong>${(+(this.Total - this.PaidAmount).toFixed(0)).toFixed(2)}</strong></td>
            </tr>
        </tbody>
    </table>
    <hr>
    <p style="text-align: center;font-family: Helvetica;">Thankyou. Visit again.</p>
</div>
<style>
  table{
    empty-cells: inherit;
    font-family: Helvetica;
    font-size: small;
    width: 290px;
    padding-left: 0px;
  }
  th{
    text-align: left 
  }
  hr{
    border-top: 1px dashed black
  }
  tr.bordered {
    border-top: 100px solid #000;
    border-top-color: black;
  }
</style>`
    console.log(element);
    if (this.electron.isElectronApp) {
      var printer = JSON.parse(localStorage.getItem("printersettings")).receiptprinter;
      // this.printService.print(element, printer, 1);
    }
  }
  @ViewChild('editcustomer', { static: false }) public editcustomer: TemplateRef<any>;


  savetransaction(payload) {
    this.Auth.edittransaction(payload).subscribe(data => {
      console.log(data);
    });
  }

  selectToday() {
    this.model = this.calendar.getToday()
  }
}
