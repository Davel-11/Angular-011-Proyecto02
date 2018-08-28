import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import { Router, ActivatedRoute } from '@angular/router';

import 'rxjs/add/operator/take';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};

  constructor(
    private route: ActivatedRoute,
    private catergoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = catergoryService.getCategories();

    let id= this.route.snapshot.paramMap.get('id');
    console.log(id);
    if(id){ 
      this.productService.get(id).take(1).subscribe(p  => this.product = p );
    }
   }

   save(product){
      console.log(product);
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
   }

  ngOnInit() {
  }



}
