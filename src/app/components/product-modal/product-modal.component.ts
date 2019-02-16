import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit{
@Output() closePM = new EventEmitter();
  constructor() { }
  ngOnInit() {

  }

  hide() {
    this.closePM.emit()
  }
}

