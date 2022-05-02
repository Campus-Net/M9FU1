import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../../core/services/data/brands.service';
import { Brand } from '../../../../shared/models/brand';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['brandId', 'brandName', 'actions'];
  brands: Brand[] = [];
  isLoadingResults = true;

  constructor(
    private brandsService: BrandsService
  ) {    
  }

  ngOnInit(): void {
    this.listBrands();
  }
    
  private listBrands() {    
    //To Do
    this.isLoadingResults = false;
  }
}
