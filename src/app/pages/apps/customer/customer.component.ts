import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../auth.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import * as moment from "moment";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  Customer: any;
  CompanyId: any;
  status: number;
  errorMsg: any;
  show: any = false;
  StoreId: number;
  term;
  p;
  filteredcustomer = null;
  deleteId;

  constructor(private Auth: AuthService, private modalService: NgbModal) {
    var logInfo = JSON.parse(localStorage.getItem("logInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.StoreId;
  }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer() {
    this.Auth.getCustomers(this.CompanyId).subscribe(data => {
      this.Customer = data;
      for (let i = 0; i < this.Customer.length; i++) {
        this.Customer[i].LastSeen = moment(this.Customer[i].LastSeen).format('LLL');
      }
    });
  }

  setcustomerdetail(Id) {
    this.filteredcustomer = Object.assign({}, this.Customer.filter(x => x.Id == Id)[0]);
  }

  savecustomer(input) {
    this.filteredcustomer.ModifiedDate = moment();
    var data = { data: JSON.stringify(this.filteredcustomer) }
    this.Auth.UpdateCustomer(data).subscribe(data => {
      var response: any = data
      if (response.status == 0) {
        // console.log(dangertoast(response.msg));
        this.getCustomer()
      }
      else {
        this.getCustomer()
      }
    });
  }

  getcusdelete(Id) {
    this.Auth.Deletecustomer(Id).subscribe(data => {
      var response: any = data
      if (response.status == 0) {
        this.status = 0;
        this.errorMsg = response.msg;
        // dangertoast(this.errorMsg)
      }
      else {
        this.getCustomer();
        this.show = false;
      }
    });

  }

}
