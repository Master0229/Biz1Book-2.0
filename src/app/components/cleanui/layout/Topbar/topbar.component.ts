import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'cui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  time = new Date();

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }
}
