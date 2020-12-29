import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectronService } from 'ngx-electron';
import { AuthService } from 'src/app/auth.service';
import * as moment from "moment";


@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent implements OnInit {

  // hide and Show
  public show: boolean = false;

  // Hide and show with Back function

  public buttonName: any = 'Back';

  value: string

  dateRange = []

  selectedValue = 'All'


 

  //OLD Pos


  constructor(
  ) {
   
  }

  //OLD POS MAster

  


  ngOnInit(): void {
   
  }



 

  toggle() {
    this.show = !this.show;


    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Back";
    else
      this.buttonName = "Back";
  }

}
