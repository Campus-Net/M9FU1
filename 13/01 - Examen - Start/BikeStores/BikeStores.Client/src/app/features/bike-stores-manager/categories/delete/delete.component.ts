import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../../../core/services/data/categories.service';
import { CustomErrorStateMatcher } from '../../../../shared/error/custom-error-state-matcher';
import { Category } from '../../../../shared/models/category';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  categoryForm!: FormGroup;
  categoryId = 0;
  matcher = new CustomErrorStateMatcher();
  category = new Category();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      'categoryId': [null, Validators.required],
      'categoryName': [null, Validators.required]
    });

    this.categoryForm.get('categoryId')?.disable();
    this.categoryForm.get('categoryName')?.disable();

    this.categoryId = this.route.snapshot.params['categoryId']
    this.getCategoryByCategoryId(this.categoryId);
  }

  private getCategoryByCategoryId(categoryId: number) {
    //To Do   
  }

  onFormSubmit(form: any) {
    const categoryForm = form;
    //To Do    
  }

  goToCategoryList() {
    this.router.navigate(['/bike-stores/categories/list']);
  }

  public onClickBtnCancel(e: any) {
    this.goToCategoryList();
  }

}
