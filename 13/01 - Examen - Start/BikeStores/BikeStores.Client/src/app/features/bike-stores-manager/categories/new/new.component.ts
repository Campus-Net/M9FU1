import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../../core/services/data/categories.service';
import { CustomErrorStateMatcher } from '../../../../shared/error/custom-error-state-matcher';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  categoryForm!: FormGroup;
  matcher = new CustomErrorStateMatcher();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      'categoryName': [null, Validators.required]
    });
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
