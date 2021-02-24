import { ɵSafeHtml } from '@angular/core'
import { SafeHtml } from '@angular/platform-browser'
import moment from 'moment'

export class OrderModule {
  Id: number
  AggregatorOrderId: number
  AllItemDisc: number
  AllItemTaxDisc: number
  AllItemTotalDisc: number
  BillAmount: number
  BillDate: string
  BillDateTime: string
  BillStatusId: number
  ChargeJson: string
  Charges: number
  Closed: boolean
  CompanyId: number
  CustomerAddressId: number
  CustomerData: string
  CustomerId: number
  DeliveryDateTime
  DiningTableId: number
  DiscAmount: number
  DiscPercent: number
  DiscType: number
  FoodReady: boolean
  InvoiceNo: string
  IsAdvanceOrder: boolean
  ItemJson: string
  Items: Array<OrderItemModule>
  KOTS: Array<KOTModule>
  ModifiedDate: string
  Note: string
  OrderDiscount: number
  OrderedDate: string
  OrderedDateTime: string
  OrderJson: string
  OrderNo: number
  OrderStatusDetails: string
  OrderStatusId: number
  OrderTaxDisc: number
  OrderTotDisc: number
  OrderTypeId: number
  OrderName: string
  PaidAmount: number
  PreviousStatusId: number
  RefundAmount: number
  RiderStatusDetails: string
  Source: string
  SourceId: number
  SplitTableId: number
  StoreId: number
  Tax1: number
  Tax2: number
  Tax3: number
  UPOrderId: number
  UserId: number
  WaiterId: number
  TaxAmount: number
  additionalchargearray = []
  subtotal: number
  extra: number
  constructor(ordertypeid) {
    this.OrderTypeId = ordertypeid
    this.BillAmount = 0
    this.DiscAmount = 0
    this.DiscPercent = 0
    this.OrderDiscount = 0
    this.OrderNo = 0
    this.PaidAmount = 0
    this.PreviousStatusId = 0
    this.RefundAmount = 0
    this.SourceId = 1
    this.Tax1 = 0
    this.Tax2 = 0
    this.Tax3 = 0
    this.Items = []
    this.KOTS = []
    this.AllItemDisc = 0
    this.AllItemTaxDisc = 0
    this.AllItemTotalDisc = 0
    this.OrderDiscount = 0
    this.OrderTaxDisc = 0
    this.OrderTotDisc = 0
    this.subtotal = 0
  }

  // ADD PRODDUCT
  additem(product, options) {
    if (product.isorderitem) {
      this.mergeitem(product, options)
      this.setbillamount()
      return
    }
    var productkey = this.productkeygenerator(product)
    var showname = this.getshowname(product)
    if (this.Items.some(x => x.ProductKey == productkey)) {
      this.Items.filter(x => x.ProductKey == productkey)[0].Quantity += options.quantity
    } else {
      options.key = productkey
      this.Items.push(new OrderItemModule(product, options, showname))
    }
    this.setbillamount()
  }
  mergeitem(product, options) {
    var oldkey = product.ProductKey
    var productkey = this.productkeygenerator(product)
    var showname = this.getshowname(product)
    var index = this.Items.findIndex(x => x.ProductKey == oldkey)
    options.key = productkey
    this.Items[index] = new OrderItemModule(product, options, showname)
  }
  productkeygenerator(product) {
    var key = ''
    key = product.ProductId ? product.ProductId.toString() : product.Id.toString()
    if (product.OptionGroup) {
      product.OptionGroup.forEach(opg => {
        if (opg.selected) {
          opg.Option.forEach(option => {
            if (option.selected) {
              key += '_' + option.Id
            }
          })
        }
      })
    }
    return key
  }
  getshowname(product: OrderItemModule) {
    var name = product.Product
    if (product.OptionGroup) {
      product.OptionGroup.forEach(opg => {
        if (opg.selected) {
          opg.Option.forEach(option => {
            if (option.selected) {
              if (opg.OptionGroupType == 1) name += '/' + option.Name
              if (opg.OptionGroupType == 2) name += '+' + option.Name
            }
          })
        }
      })
    }
    return name
  }
  // BILL AMOUNT CALCULATION LOGIC
  setbillamount() {
    var extracharge = 0
    this.BillAmount = 0
    this.Tax1 = 0
    this.Tax2 = 0
    this.Tax3 = 0
    this.AllItemDisc = 0
    this.AllItemTaxDisc = 0
    this.AllItemTotalDisc = 0
    this.Charges = 0
    this.TaxAmount = 0
    this.extra = 0
    this.subtotal = 0
    var isdiscinclusivoftax = false

    this.Items.forEach(item => {
      item.TaxAmount1 = 0
      item.TaxAmount2 = 0
      item.TaxAmount3 = 0
      item.TaxAmount = 0
      item.TotalAmount = 0
      item.baseprice = 0
      var optionprice = 0
      if (item.DiscAmount == null) item.DiscAmount = 0
      //if(item.DiscPercent > 0) item.DiscAmount = (item.Price*item.Quantity)*item.DiscPercent/100;
      item.OptionGroup.forEach(opg => {
        if (opg.selected) {
          opg.Option.forEach(option => {
            if (option.selected) optionprice = optionprice + option.Price
          })
        }
      })
      item.baseprice = item.Price + optionprice
      if (item.IsTaxInclusive) {
        item.TotalAmount =
          (item.Price / ((item.Tax1 + item.Tax2 + item.Tax2) / 100 + 1) + optionprice) *
          item.Quantity
      } else {
        item.TotalAmount = (item.Price + optionprice) * item.Quantity
      }
      console.log(optionprice, item.TotalAmount)
      item.TaxAmount1 = (item.Tax1 * item.TotalAmount) / 100
      item.TaxAmount2 = (item.Tax2 * item.TotalAmount) / 100
      item.TaxAmount3 = (item.Tax3 * item.TotalAmount) / 100
      item.TaxAmount = item.TaxAmount1 + item.TaxAmount2 + item.TaxAmount3
      if (item.DiscAmount || item.DiscPercent) {
        if (item.DiscPercent == 0) {
          if (isdiscinclusivoftax) {
            item.DiscPercent = (item.DiscAmount * 100) / (item.TotalAmount + item.TaxAmount)
          } else {
            item.DiscPercent = (item.DiscAmount * 100) / item.TotalAmount
          }
        }
        item.ItemDiscount = (item.TotalAmount * item.DiscPercent) / 100
        item.TotalAmount = item.TotalAmount - (item.TotalAmount * item.DiscPercent) / 100

        item.TaxAmount1 -= (item.TaxAmount1 * item.DiscPercent) / 100
        item.TaxAmount2 -= (item.TaxAmount2 * item.DiscPercent) / 100
        item.TaxAmount3 -= (item.TaxAmount3 * item.DiscPercent) / 100

        item.TaxItemDiscount =
          (item.TaxAmount1 * item.DiscPercent) / 100 +
          (item.TaxAmount2 * item.DiscPercent) / 100 +
          (item.TaxAmount3 * item.DiscPercent) / 100

        item.TaxAmount = item.TaxAmount1 + item.TaxAmount2 + item.TaxAmount3
      }
      if (item.DiscType == 1) {
        item.DiscPercent = 0
      }
      this.extra += item.Extra
      this.BillAmount += item.TotalAmount
      this.subtotal += item.TotalAmount
      this.Tax1 += item.TaxAmount1
      this.Tax2 += item.TaxAmount2
      this.Tax3 += item.TaxAmount3

      this.AllItemDisc += item.ItemDiscount
      this.AllItemTaxDisc += item.TaxItemDiscount
      this.AllItemTotalDisc += item.ItemDiscount + item.TaxItemDiscount
    })

    this.TaxAmount = this.Tax1 + this.Tax2 + this.Tax3

    if (this.DiscAmount || this.DiscAmount) {
      if (this.DiscAmount == 0) {
        if (isdiscinclusivoftax) {
          this.DiscPercent = (this.DiscAmount * 100) / (this.BillAmount + this.TaxAmount)
        } else {
          this.DiscPercent = (this.DiscAmount * 100) / this.BillAmount
        }
      }
      this.BillAmount -= (this.BillAmount * this.DiscPercent) / 100
      this.Tax1 -= (this.Tax1 * this.DiscPercent) / 100
      this.Tax2 -= (this.Tax2 * this.DiscPercent) / 100
      this.Tax3 -= (this.Tax3 * this.DiscPercent) / 100
      this.TaxAmount = this.Tax1 + this.Tax2 + this.Tax3

      this.OrderDiscount = (this.BillAmount * this.DiscPercent) / 100
      this.OrderTaxDisc =
        (this.Tax1 * this.DiscPercent) / 100 +
        (this.Tax2 * this.DiscPercent) / 100 +
        (this.Tax3 * this.DiscPercent) / 100
      this.OrderTotDisc = this.OrderDiscount + this.OrderTaxDisc
    }

    this.additionalchargearray.forEach(charge => {
      if (charge.ChargeType == 2) {
        charge.ChargeAmount = Number((this.BillAmount / 100) * charge.ChargeValue)
      } else {
        charge.ChargeAmount = Number(charge.ChargeValue)
      }
      extracharge += charge.ChargeAmount
      this.Charges += charge.ChargeAmount
    })
    this.BillAmount += extracharge

    this.Items.forEach(item => {
      item.OrderDiscount = (item.TotalAmount * this.OrderDiscount) / this.BillAmount
      item.TaxOrderDiscount = (item.TaxAmount * this.OrderTaxDisc) / this.TaxAmount
    })

    this.BillAmount += this.TaxAmount + this.extra
    if (this.DiscType == 1) {
      this.DiscPercent = 0
    }
    this.setkotquantity()
  }
  setkotquantity() {
    this.Items.forEach(item => {
      var key = item.ProductKey
      item.kotquantity = 0
      this.KOTS.forEach(kot => {
        kot.Items.forEach(kitem => {
          if (kitem.ProductKey == key) item.kotquantity += kitem.Quantity
        })
      })
    })
  }

  addkot(items, kotno) {
    this.KOTS.push(new KOTModule(items, kotno))
  }
}

export class OrderItemModule {
  Id: number
  CategoryId: number
  ComplementryQty: number
  DiscAmount: number
  DiscPercent: number
  DiscType: number
  Extra: number
  FreeQtyPercentage: number
  ItemDiscount: number
  KitchenUserId: number
  KOTGroupId: number
  KOTId: number
  Message: string
  MinimumQty: number
  Note: string
  OptionJson: string
  OptionGroup: Array<OptionGroupModule>
  OrderDiscount: number
  OrderId: number
  Price: number
  ProductId: number
  ProductKey: string
  Name: string
  Quantity: number
  StatusId: number
  tax1_p: number
  tax2_p: number
  tax3_p: number
  Tax1: number
  Tax2: number
  Tax3: number
  TaxGroupId: number
  TaxItemDiscount: number
  TaxOrderDiscount: number
  TotalAmount: number
  TaxAmount1: number
  TaxAmount2: number
  TaxAmount3: number
  TaxAmount: number
  IsTaxInclusive: number
  Product: string
  showname: SafeHtml
  isorderitem: boolean
  kotquantity: number
  baseprice: number
  constructor(product, options, showname) {
    this.isorderitem = true
    this.showname = showname
    this.Id = 0
    this.CategoryId = product.CategoryId
    this.ComplementryQty = 0
    this.MinimumQty = product.MinimumQty
    this.DiscAmount = product.DiscAmount
    this.DiscPercent = product.DiscPercent
    this.DiscType = product.DiscType
    this.Extra = product.Extra ? product.Extra : 0
    this.FreeQtyPercentage = product.FreeQtyPercentage
    this.ItemDiscount = 0
    this.KitchenUserId = null
    this.KOTGroupId = product.KOTGroupId ? product.KOTGroupId : 0
    this.KOTId = 0
    this.Message = ''
    this.MinimumQty = product.MinimumQty
    this.Name = product.Product
    this.Product = product.Product
    this.Note = ''
    this.OptionJson = ''
    this.OptionGroup = []
    this.OrderDiscount = 0
    this.OrderId = 0
    this.ProductId = product.ProductId
    this.ProductKey = options.key
    this.Price = product.Price
    this.Quantity = options.quantity
    this.StatusId = 0
    this.Tax1 = product.Tax1
    this.Tax2 = product.Tax2
    this.Tax3 = product.Tax3
    this.TaxGroupId = product.TaxGroupId
    this.TaxItemDiscount = 0
    this.TaxOrderDiscount = 0
    this.TotalAmount = 0

    if (this.Quantity >= this.MinimumQty) {
      this.ComplementryQty = (this.Quantity * this.FreeQtyPercentage) / 100
    }
    if (product.OptionGroup) {
      product.OptionGroup.forEach(opg => {
        if (opg.OptionGroupType == 1) opg.selected = true
        this.OptionGroup.push(new OptionGroupModule(opg))
      })
    }
  }
}

export class KOTModule {
  Id: number
  KOTStatusId: number
  Instruction
  KOTNo: number
  OrderId: number
  CreatedDate: string
  Items: Array<OrderItemModule>
  ModifiedDate: string
  CompanyId: number
  StoreId: number
  KOTGroupId: number
  added: Array<OrderItemModule>
  removed: Array<OrderItemModule>
  isprinted: boolean
  constructor(items: Array<OrderItemModule>, kotno) {
    this.KOTStatusId = 0
    this.Instruction = ''
    this.KOTNo = kotno
    this.OrderId = null
    this.CreatedDate = moment().format('YY-MM-DD HH:MM A')
    this.Items = []
    this.ModifiedDate = moment().format('YY-MM-DD HH:MM A')
    this.CompanyId = 3
    this.StoreId = 4
    this.KOTGroupId = items[0].KOTGroupId
    var options = {
      key: '',
      quantity: 0,
      iskotitem: true,
    }
    items.forEach(item => {
      options.key = item.ProductKey
      options.quantity = item.Quantity - item.kotquantity
      item.kotquantity += options.quantity
      this.Items.push(new OrderItemModule(item, options, item.showname))
    })
    this.added = this.Items.filter(x => x.Quantity > 0)
    this.removed = this.Items.filter(x => x.Quantity < 0)
  }
}

export class OptionGroupModule {
  Id: number
  Name: string
  OptionGroupType: number
  Option: Array<OptionModule>
  MinimumSelectable: number
  MaximumSelectable: number
  SortOrder: number
  selected: boolean
  constructor(optiongroup) {
    this.Id = optiongroup.Id
    this.Name = optiongroup.Name
    this.OptionGroupType = optiongroup.OptionGroupType
    this.MinimumSelectable = optiongroup.MinimumSelectable
    this.MaximumSelectable = optiongroup.MaximumSelectable
    this.SortOrder = optiongroup.SortOrder ? optiongroup.SortOrder : -1
    this.selected = optiongroup.selected
    this.Option = []
    if (this.OptionGroupType == 1) {
      if (!optiongroup.Option.some(x => x.selected == true)) {
        optiongroup.Option[0].selected = true
      }
    }
    optiongroup.Option.forEach(option => {
      this.Option.push(new OptionModule(option))
    })
  }
}

export class OptionModule {
  Id: number
  DeliveryPrice: number
  Name: string
  Price: number
  selected: number
  TakeawayPrice: number
  constructor(option) {
    this.Id = option.Id
    this.DeliveryPrice = option.DeliveryPrice
    this.Name = option.Name
    this.Price = option.Price
    this.selected = option.selected
    this.TakeawayPrice = option.TakeawayPrice
  }
}
export class CurrentItemModule {
  Id: number
  CategoryId: number
  ComplementryQty: number
  DiscAmount: number
  DiscPercent: number
  DiscType: number
  Extra: number
  FreeQtyPercentage: number
  ItemDiscount: number
  KitchenUserId: number
  KOTGroupId: number
  KOTId: number
  Message: string
  MinimumQty: number
  Note: string
  OptionJson: string
  OptionGroup: Array<OptionGroupModule>
  OrderDiscount: number
  OrderId: number
  Price: number
  ProductId: number
  ProductKey: string
  Name: string
  Quantity: number
  StatusId: number
  tax1_p: number
  tax2_p: number
  tax3_p: number
  Tax1: number
  Tax2: number
  Tax3: number
  TaxGroupId: number
  TaxItemDiscount: number
  TaxOrderDiscount: number
  TotalAmount: number
  TaxAmount1: number
  TaxAmount2: number
  TaxAmount3: number
  TaxAmount: number
  IsTaxInclusive: number
  Product: string
  showname: string
  isorderitem: boolean
  kotquantity: number
  baseprice: number
  constructor(product) {
    this.Id = 0
    this.CategoryId = product.CategoryId
    this.ComplementryQty = 0
    this.MinimumQty = product.MinimumQty
    this.DiscAmount = product.DiscAmount ? product.DiscAmount : 0
    this.DiscPercent = product.DiscPercent ? product.DiscPercent : 0
    this.DiscType = product.DiscType ? product.DiscType : 1
    this.Extra = 0
    this.FreeQtyPercentage = product.FreeQtyPercentage
    this.ItemDiscount = 0
    this.KitchenUserId = null
    this.KOTGroupId = product.KOTGroupId ? product.KOTGroupId : 0
    this.KOTId = 0
    this.Message = ''
    this.MinimumQty = product.MinimumQty
    this.Name = product.Product
    this.Product = product.Product
    this.Note = ''
    this.OptionJson = ''
    this.OptionGroup = []
    this.OrderDiscount = 0
    this.OrderId = 0
    this.ProductId = product.Id > 0 ? product.Id : product.ProductId
    this.ProductKey = product.ProductKey ? product.ProductKey : ''
    this.Price = product.Price
    this.Quantity = product.Quantity ? product.Quantity : 1
    this.StatusId = 0
    this.Tax1 = product.Tax1
    this.Tax2 = product.Tax2
    this.Tax3 = product.Tax3
    this.TaxGroupId = product.TaxGroupId
    this.TaxItemDiscount = 0
    this.TaxOrderDiscount = 0
    this.TotalAmount = 0
    this.kotquantity = 0
    this.isorderitem = product.isorderitem ? true : false
    if (this.Quantity >= this.MinimumQty) {
      this.ComplementryQty = (this.Quantity * this.FreeQtyPercentage) / 100
    }
    if (product.OptionGroup) {
      product.OptionGroup.forEach(opg => {
        if (opg.OptionGroupType == 1) {
          opg.selected = true
          if (!opg.Option.some(x => x.selected == true)) opg.Option[0].selected = true
        }
        if (opg.OptionGroupType == 2 && !this.isorderitem) {
          opg.Option.forEach(option => {
            option.selected = false
          })
        }
        this.OptionGroup.push(opg)
      })
      product.OptionGroup.forEach(opg => {
        if (opg.selected) {
          opg.Option.forEach(option => {
            if (option.selected) {
              this.TotalAmount += option.Price
            }
          })
        }
      })
    }
    this.TotalAmount += this.Price
    this.TotalAmount *= this.Quantity
    if (this.DiscType == 1) {
      this.TotalAmount -= this.DiscAmount
    } else if (this.DiscType == 2) {
      this.TotalAmount -= (this.TotalAmount * this.DiscPercent) / 100
    }
  }
}
