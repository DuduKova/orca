import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CartItem, Product} from "../../_models";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../_services/product.service";

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit , OnChanges{
@Output() closePM = new EventEmitter();
@Input() selectedProduct;
  productForm: FormGroup;
  cartItem: CartItem;
  submitted = false;
  private _changes: SimpleChanges;
  constructor(private formBuilder: FormBuilder , private productService: ProductService) {
    this.productForm = this.formBuilder.group({
      '_id': ['', [Validators.required]],
      'quantity': ['1', [Validators.required]],
      'price': ['', [Validators.required]]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this._changes = changes;
    console.log(changes);
    if(this.selectedProduct) {
      this.productForm.patchValue(this.selectedProduct);
      this.productForm.touched;
    } else {
      this.productForm.reset();
    }

  }
  ngOnInit() {
    this.productService.currentProduct.subscribe(product => this.selectedProduct = product);
  }

  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.productForm.invalid) {
      return;
    }

    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.productForm.value))
  }

  hide() {
    this.closePM.emit()
  }
}

