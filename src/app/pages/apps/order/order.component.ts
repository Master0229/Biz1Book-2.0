import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  
  activeKey = 0

  // Hide and Show

  public show: boolean = false;
  
  public buttonName: any = 'Back';

  hide = true;

  constructor() { }

  ngOnInit(): void {
  }
  changeKey(key) {
    this.activeKey = key
  }

  //Hide and Show toggle

  toggle() {
    this.show = !this.show;
    

    // CHANGE THE NAME OF THE BUTTON.
    if (this.show)
      this.buttonName = "Back";
    else
      this.buttonName = "Back";
    }

  

}
