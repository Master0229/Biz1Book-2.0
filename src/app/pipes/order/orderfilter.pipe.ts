import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'parentcategory',
})
export class ParentcategoryfilterPipe implements PipeTransform {
  transform(childcategories: any[], parentcategoryid: number): any[] {
    if (!childcategories) return []

    return childcategories.filter(x => x.ParentId == parentcategoryid)
  }
}

@Pipe({
  name: 'productfilter',
})
export class ProductfilterPipe implements PipeTransform {
  transform(products: any[], categoryid: number): any[] {
    if (!products) return []

    if (categoryid == 0) return products

    return products.filter(x => x.ParentCategoryId == categoryid || x.CategoryId == categoryid)
  }
}
