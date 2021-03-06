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
  id;

  constructor(
    private route: ActivatedRoute,
    private catergoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = catergoryService.getCategories();

    this.id= this.route.snapshot.paramMap.get('id');  
    if(this.id){ 
      this.productService.get(this.id).take(1).subscribe(p  => this.product = p );
    }
   }

   save(product){      
      if(this.id)  this.productService.update(this.id, product);
      else this.productService.create(product);
      
      this.router.navigate(['/admin/products']);
   }

   delete(){
     if (!confirm('Esta Seguro de Eliminar el Producto?')) return;
     
     this.productService.delete(this.id);
     this.router.navigate(['/admin/products']);     
   }

  ngOnInit() {
  }




}
