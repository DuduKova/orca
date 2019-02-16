import {Component, OnInit, ViewChild} from '@angular/core';
import {DataService} from "../../_services/data.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public selectedCompany;

  @ViewChild('productModal') proModal;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentCompany.subscribe(company => this.selectedCompany = company);
  }

  showProductModal(product) {
    console.log(product);
    this.proModal.show();
  }

  closeProductModal() {
    this.proModal.hide();
  }
  onClosed(event: any) {
    console.log(event);
  }

  onClose(event: any) {
    console.log(event);
  }

  onOpened(event: any) {
    console.log(event);
  }

  onOpen(event: any) {
    console.log(event);
  }

}
