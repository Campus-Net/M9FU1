import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/data/categories.service';
import { Category } from '../../../../shared/models/category';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['categoryId', 'categoryName', 'actions'];
  categories: Category[] = [];
  isLoadingResults = true;

  constructor(
    private categoriesService: CategoriesService
  ) {
  }

  ngOnInit(): void {
    this.listCategories();
  }

  private listCategories() {
    //To Do
    this.isLoadingResults = false;    
  }
}
