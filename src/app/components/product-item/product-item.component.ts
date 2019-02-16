import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
@Input() private product;
@Output() productModalShow = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  show(product) {
    this.productModalShow.emit(product);
  }
}
