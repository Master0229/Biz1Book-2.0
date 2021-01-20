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
