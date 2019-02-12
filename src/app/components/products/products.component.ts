import { Component, OnInit } from '@angular/core';
import {DataService} from "../../_services/data.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public selectedCompany;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentCompany.subscribe(company => this.selectedCompany = company);
  }

}
