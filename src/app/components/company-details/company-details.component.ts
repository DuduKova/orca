import { Component, OnInit } from '@angular/core';
import {DataService} from "../../_services/data.service";

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  public selectedCompany;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentCompany.subscribe(company => this.selectedCompany = company);
  }

}
