import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { OrderModule, OrderItemModule } from './order.moduel'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from '../../../auth.service'
import { NzModalService } from 'ng-zorro-antd/modal'
import { ElectronService } from 'ngx-electron'
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  // Auto complete+
  inputValue: string
  options: string[] = []
  // Modal for Order edit
  isVisible = false
  // Dine In Select Table
  listOfOption: Array<{ label: string; value: string }> = []
  size = 'default'
  selectedValue = 'gf'
  // OLD POS Auto Complete
  autocompletevalidation: boolean = true
  typeheadSelected: any
  public model: any
  // OLD POS ITEM
  item: any = []
  // OLD POS
  KOTNo: any
  locKOTNo: any
  paymentType: any
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
  selectedcategoryid = 0
  public show: boolean = false
  public buttonName: any = 'Back'
  autocompleteproducts = []
  hide = true

  cards = [
    { name: 'Quick Order', ordertypeid: 5, class: 'bg-success', icon: 'fe fe-zap' },
    { name: 'Dine In', ordertypeid: 1, class: 'bg-primary', icon: 'fa fa-cutlery' },
    { name: 'Take Away', ordertypeid: 2, class: 'bg-warning', icon: 'fe fe-briefcase' },
    { name: 'Delivery', ordertypeid: 3, class: 'bg-gray-6', icon: 'fa fa-send-o' },
    { name: 'Pick Up', ordertypeid: 4, class: 'bg-red', icon: 'fa fa-truck' },
    { name: 'Online Orders', ordertypeid: 6, class: 'bg-dark', icon: 'fe fe-globe' },
  ]
  orderpageid = 0
  sectionid = 0

  // Test Print
  // count = 10
  // printer = '';
  // template = '';
  constructor(
    private modalService: NgbModal,
    private auth: AuthService,
    private modalService1: NzModalService,
  ) // private electronservice: ElectronService,
  {}

  ngOnInit(): void {
    this.getcategories()
    this.getproducts()
    this.getPaymentTypes()
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
      console.log(this.products)
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
    this.sectionid = 2
    console.log(this.order)
  }

  // Option Group
  @ViewChild('prod_details', { static: false }) public prod_detail_modal: TemplateRef<any>

  currentitem = null
  addProduct(product) {
    var options = {
      quantity: 1,
      key: '',
    }
    if (product.OptionGroup && product.OptionGroup.length > 0) {
      this.currentitem = product
      this.modalService.open(this.prod_detail_modal, { centered: true })
    } else {
      this.order.additem(product, options)
    }
    console.log(this.order)
  }

  itemdetails(product) {
    console.log(product)
    this.currentitem = product
    this.modalService.open(this.prod_detail_modal, { centered: true })
  }

  SetOptionValue(OptionGroup, Option) {
    OptionGroup.Option.forEach(element => {
      element.selected = 0
    })
    if (OptionGroup.selected != Option.Id) {
      OptionGroup.selected = Option.Id
      Option.selected = 1
    } else {
      OptionGroup.selected = 0
      Option.selected = 0
    }
  }
  SetAddonValue(OptionGroup, Option, check) {
    if (check) {
      Option.selected = 1
    } else {
      OptionGroup.selected = 0
      Option.selected = 0
    }
    if (OptionGroup.Option.some(x => x.selected > 0)) {
      OptionGroup.selected = 1
    } else {
      OptionGroup.selected = 0
    }
  }
  nzClick(event) {
    console.log(event)
  }
  openCustomClass(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-holder' })
  }

  // Auto Compelete

  onInput(value: string): void {
    this.autocompleteproducts = value
      ? this.products.filter(x => x.Product.toLowerCase().includes(value.toLowerCase()))
      : []
  }

  @ViewChild('Quantity', { static: false }) private QuantityRef: ElementRef

  // OLD POS Auto Complete
  selectedItem(item, contentDetail) {
    this.autocompletevalidation = false
    if (item.hasOwnProperty('OptionGroup')) {
      this.addItem(contentDetail, item, 1)
    } else {
      this.typeheadSelected = item
      this.QuantityRef.nativeElement.focus()
    }
  }

  addItem(contentDetail, productObj, qty: number) {
    // mintos();
    // this.getPaymentTypes();
    if (this.order.OrderTypeId == 5) {
      this.order.PaidAmount = 0
    }
    productObj.KOTNo = this.KOTNo
  }
  fieldselect(event) {
    console.log(event)
    console.log(event.element.nativeElement.id)
    var product = this.products.filter(x => x.Id == +event.element.nativeElement.id)[0]
  }
  getPaymentTypes() {
    // console.log("getpaymanet");
    // this.paymentType = JSON.parse(localStorage.getItem("PaymentType"));
    // this.paymentType.forEach(element => {
    //   element.Price = 0;
    // });
    // this.IDB.IDBGetStoreObser("PaymentType").subscribe(data => {
    //   this.paymentType = data;
    //   this.paymentType.forEach(element => {
    //     element.Price = 0;
    //   });
    // });
  }

  // Modal for Edit Order
  // Bootstrap
  open(content) {
    this.modalService.open(content)
  }
  vieworderlist(type) {
    this.sectionid = 1
    this.orderpageid = type
  }
  // print() {
  //   this.electronservice.remote.getGlobal('testPrint')(this.count, this.printer, this.template)
  // }
}
