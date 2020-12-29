import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  activeKey = 0
  pskey=0
  demoValue = 1
  value: string

  constructor() { }

  ngOnInit(): void {
  }
  changeKey(key) {
    this.activeKey = key
  }
  changeKeyps(ps) {
    this.pskey = ps
  }

}
