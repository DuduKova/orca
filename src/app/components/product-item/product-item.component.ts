import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../../_services/product.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
@Input() private product;
@Output() productModalShow = new EventEmitter();
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  show(product) {
    this.productService.changeProduct(product);
    console.log(product);
    this.productModalShow.emit();
  }
}
