import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  
  products: Product[];  
  subscription: Subscription;  
  items: Product[] =[];  
  tableResource: DataTableResource<Product>;
  itemCount: number;
  

  constructor(
    private productService: ProductService
  ) { 
    
    this.subscription = this.productService.getAll()
    .subscribe( products => { 
      this.products = products;
      this.initializeTable(products);
    });


  }

  private initializeTable(products: Product[]){
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 })
      .then(items => this.items = items );
    this.tableResource.count()
      .then(count => this.itemCount = count);
  }
  
  recargar(paramas){
    if(!this.tableResource) return;

    this.tableResource.query(paramas)
    .then(items => this.items = items );
  }

  filter(query: string){
      let filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLocaleLowerCase()) ) : 
      this.products;

      this.initializeTable(filteredProducts);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }



}
