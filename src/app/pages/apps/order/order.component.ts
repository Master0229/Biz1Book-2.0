import { Component, OnInit } from '@angular/core'
import { OrderModule, OrderItemModule } from './order.moduel'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from '../../../auth.service'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order: OrderModule
  categories: any = []
  parentcategories = []
  childcategories = []
  nodesFiles = [
    {
      title: 'All',
      key: '100',
      expanded: false,
    },
  ]
  activeKey = 0
  products: any = []
  // Hide and Show
  selectedcategoryid = 0
  public show: boolean = false

  public buttonName: any = 'Back'

  hide = true
  cards = [
    { name: 'Quick Order', ordertypeid: 5, class: 'bg-success', icon: 'fe fe-zap' },
    { name: 'Dine In', ordertypeid: 1, class: 'bg-primary', icon: 'fa fa-cutlery' },
    { name: 'Take Away', ordertypeid: 2, class: 'bg-warning', icon: 'fe fe-briefcase' },
    { name: 'Delivery', ordertypeid: 3, class: 'bg-gray-6', icon: 'fa fa-send-o' },
    { name: 'Pick Up', ordertypeid: 4, class: 'bg-red', icon: 'fa fa-truck' },
    { name: 'Online Orders', ordertypeid: 6, class: 'bg-dark', icon: 'fe fe-globe' },
  ]
  constructor(private modalService: NgbModal, private auth: AuthService) {}

  ngOnInit(): void {
    this.getcategories()
    this.getproducts()
  }
  changeKey(key) {
    this.activeKey = key
  }

  //Hide and Show toggle
  getcategories() {
    // this.categories = JSON.parse(localStorage.getItem('Category'))
    this.auth.getcategories().subscribe(data => {
      this.categories = data
      this.parentcategories = this.categories.filter(x => x.ParentId == 0)
      this.childcategories = this.categories.filter(x => x.ParentId != 0)
    })
  }
  getproducts() {
    // this.products = JSON.parse(localStorage.getItem('Product'))

    this.auth.getproducts().subscribe(data => {
      this.products = data
    })
  }
  toggle() {
    this.show = !this.show
    if (this.show) this.buttonName = 'Back'
    else this.buttonName = 'Back'
  }

  createorder(ordertypeid) {
    this.order = new OrderModule(ordertypeid)
    this.show = !this.show
    console.log(this.order)
  }
  addProduct(product) {
    var options = {
      quantity: 1,
      key: '',
    }
    this.order.additem(product, options)
  }
  nzClick(event) {
    console.log(event)
  }
  openCustomClass(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-holder' })
  }
}
