import { Component, OnInit, ViewChild } from '@angular/core'
import { NzFormatEmitEvent, NzTreeNodeOptions, NzTreeComponent } from 'ng-zorro-antd/tree'

@Component({
  selector: 'app-urbanpiper',
  templateUrl: './urbanpiper.component.html',
  styleUrls: ['./urbanpiper.component.scss'],
})
export class UrbanpiperComponent implements OnInit {
  // Serach Filter Icon
  size = 'large'

  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent
  defaultCheckedKeys = ['10020']
  defaultSelectedKeys = ['10010']
  defaultExpandedKeys = ['100', '1001']

  nodes: NzTreeNodeOptions[] = [
    {
      title: 'Cakes 1 Kg + 1/2 Kg Extra Free',
      key: '100',
      children: [
        {
          title: 'Fresh Cream Cakes 1 Kg + (1/2 Kg Free)',
          key: '1001',
          children: [
            {
              title: 'Vanilla 1 KG + (1/2 KG Free)',

              icon: '<fa fa-dot-circle-o />',
              key: '10010',
              isLeaf: true,
            },

            {
              title: ' Black Forest 1 KG + (1/2 KG Free)',
              key: '10011',
              isLeaf: true,
            },
          ],
        },
      ],
    },
  ]
  inputValue: string
  options: string[] = []

  inputValueCustom: string
  optionsCustom: string[] = []

  onInput(value: string): void {
    this.options = value ? [value, value + value, value + value + value] : []
  }

  nzClick(event: NzFormatEmitEvent): void {
    console.log(event)
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event)
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log(keys, this.nzTreeComponent.getSelectedNodeList())
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // get node by key: '10011'
    console.log(this.nzTreeComponent.getTreeNodeByKey('10011'))
    // use tree methods
    console.log(
      this.nzTreeComponent.getTreeNodes(),
      this.nzTreeComponent.getCheckedNodeList(),
      this.nzTreeComponent.getSelectedNodeList(),
      this.nzTreeComponent.getExpandedNodeList(),
    )
  }
}
