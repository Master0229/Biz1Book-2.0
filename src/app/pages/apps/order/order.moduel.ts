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
  }
  additem(product, options) {
    var productkey = this.productkeygenerator(product)
    console.log(product, productkey)
    if (this.Items.some(x => x.ProductKey == productkey)) {
      this.Items.filter(x => x.ProductKey == productkey)[0].Quantity += options.quantity
    } else {
      options.key = productkey
      this.Items.push(new OrderItemModule(product, options))
    }
  }
  productkeygenerator(product) {
    var key = ''
    key = product.Id.toString()
    return key
  }
  setbillamount() {
    var extracharge = 0
    this.BillAmount = 0
    this.Tax1 = 0
    this.Tax2 = 0
    this.Tax3 = 0
    this.AllItemDisc = 0
    this.AllItemTaxDisc = 0
    this.AllItemTotalDisc = 0

    var isdiscinclusivoftax

    var item = []

    var subtotal = 0

    item.forEach(item => {
      var optionprice = 0
      if (item.DiscAmount == null) item.DiscAmount = 0
      //if(item.DiscPercent > 0) item.DiscAmount = (item.Price*item.Quantity)*item.DiscPercent/100;
      item.OptionGroup.forEach(opg => {
        opg.Option.forEach(option => {
          optionprice = optionprice + option.Price
        })
      })

      if (item.IsTaxInclusive) {
        item.TotalPrice =
          (item.Price / ((item.Tax1 + item.Tax2 + item.Tax2) / 100 + 1) + optionprice) *
          item.Quantity
      } else {
        item.TotalPrice = (item.Price + optionprice) * item.Quantity
      }

      item.TaxAmount1 = item.Tax1 * item.TotalPrice
      item.TaxAmount2 = item.Tax2 * item.TotalPrice
      item.TaxAmount3 = item.Tax3 * item.TotalPrice
      item.TaxAmount = item.TaxAmount1 + item.TaxAmount2 + item.TaxAmount3
      if (item.DiscAmount || item.DiscPercent) {
        if (item.DiscPercent == 0) {
          if (isdiscinclusivoftax) {
            item.DiscPercent = (item.DiscAmount * 100) / (item.TotalPrice + item.TaxAmount)
          } else {
            item.DiscPercent = (item.DiscAmount * 100) / item.TotalPrice
          }
        }
        item.ItemDiscount = (item.TotalPrice * item.DiscPercent) / 100
        item.TotalPrice = item.TotalPrice - (item.TotalPrice * item.DiscPercent) / 100

        item.TaxAmount1 -= (item.TaxAmount1 * item.DiscPercent) / 100
        item.TaxAmount2 -= (item.TaxAmount2 * item.DiscPercent) / 100
        item.TaxAmount3 -= (item.TaxAmount3 * item.DiscPercent) / 100

        item.TaxItemDiscount =
          (item.TaxAmount1 * item.DiscPercent) / 100 +
          (item.TaxAmount2 * item.DiscPercent) / 100 +
          (item.TaxAmount3 * item.DiscPercent) / 100

        item.TaxAmount = item.TaxAmount1 + item.TaxAmount2 + item.TaxAmount3
      }
      this.BillAmount += item.TotalPrice
      this.Tax1 += item.TaxAmount1
      this.Tax2 += item.TaxAmount2
      this.Tax3 += item.TaxAmount3

      this.AllItemDisc += item.ItemDiscount
      this.AllItemTaxDisc += item.TaxItemDiscount
      this.AllItemTotalDisc += item.ItemDiscount + item.TaxItemDiscount
    })

    this.TaxAmount = this.Tax1 + this.Tax2 + this.Tax3
    this.additionalchargearray.forEach(charge => {
      if (charge.ChargeType == 2) {
        charge.ChargeAmount = Number((subtotal / 100) * charge.ChargeValue)
      } else {
        charge.ChargeAmount = Number(charge.ChargeValue)
      }
      extracharge += charge.ChargeAmount
    })
    this.BillAmount += extracharge

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

    item.forEach(item => {
      item.OrderDiscount = (item.TotalPrice * this.OrderDiscount) / this.BillAmount
      item.TaxOrderDiscount = (item.TaxAmount * this.OrderTaxDisc) / this.TaxAmount
    })

    this.BillAmount += this.TaxAmount
  }
}

export class OrderItemModule {
  Id: number
  CategoryId: number
  ComplementryQty: number
  DiscAmount: number
  DiscPercent: number
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
  OptionGroups: Array<OptionGroupModule>
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

  constructor(product, options) {
    this.Id = 0
    this.CategoryId = product.CategoryId
    this.ComplementryQty = 0
    this.MinimumQty = product.MinimumQty
    this.DiscAmount = 0
    this.DiscPercent = 0
    this.Extra = 0
    this.FreeQtyPercentage = product.FreeQtyPercentage
    this.ItemDiscount = 0
    this.KitchenUserId = null
    this.KOTGroupId = product.KOTGroupId
    this.KOTId = 0
    this.Message = ''
    this.MinimumQty = product.MinimumQty
    this.Name = product.Product
    this.Note = ''
    this.OptionJson = ''
    this.OptionGroups = []
    this.OrderDiscount = 0
    this.OrderId = 0
    this.ProductId = product.Id
    this.ProductKey = options.key
    this.Price = product.Price
    this.Quantity = options.quantity
    this.StatusId = 0
    this.tax1_p = product.Tax1
    this.tax2_p = product.Tax2
    this.tax3_p = product.Tax3
    this.TaxGroupId = product.TaxGroupId
    this.TaxItemDiscount = 0
    this.TaxOrderDiscount = 0
    this.TotalAmount = 0

    if (this.Quantity >= this.MinimumQty) {
      this.ComplementryQty = (this.Quantity * this.FreeQtyPercentage) / 100
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
  constructor() {}
}

export class OptionGroupModule {
  Id: number
  Name: string
  OptionGroupType: number
  Options: Array<OptionModule>
  MinimumSelectable: number
  MaximumSelectable: number
  SortOrder: number
  constructor() {}
}

export class OptionModule {
  Id: number
  DeliveryPrice: number
  Name: string
  Price: number
  selected: number
  TakeawayPrice: number
  constructor() {}
}
