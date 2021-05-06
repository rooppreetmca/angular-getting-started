import { ProductService } from './product.service';
import { Component, OnDestroy, OnInit } from "@angular/core";
import { IProduct } from "./products";

@Component({
    selector:"pm-products",
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
  })
export class ProductListComponent implements OnInit, OnDestroy
{
    pageTitle: string = "Product List";
    imageWidth : number = 50;
    imageMargin: number = 2;
    showImage : boolean = false;
    // listFilter :string = '';

    private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }
   
    filteredProducts: IProduct[] = [];

    products : IProduct[] = [];

    
    constructor(private productService : ProductService) {
  
    }
    toogleImage():void{
      this.showImage = !this.showImage;
      console.log(this.showImage);
    }

    ngOnInit(): void {
     console.log("ngOnInit Fired!!");
    this.products = this.productService.getProducts();
     this.filteredProducts = this.products;
    }
  
    ngOnDestroy(): void {
      console.log("ngOnDestroy Fired!!");
    }

    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) =>
        product.productName.toLocaleLowerCase().includes(filterBy));
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }
}