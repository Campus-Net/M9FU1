import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BrandsService } from '../../../../core/services/data/brands.service';
import { CustomErrorStateMatcher } from '../../../../shared/error/custom-error-state-matcher';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  brandForm!: FormGroup;    
  matcher = new CustomErrorStateMatcher();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private brandsService: BrandsService
  ) { }

  ngOnInit(): void {
    this.brandForm = this.formBuilder.group({
      'brandName': [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const brandForm = form;
    //To Do
    const brand = {
      brandId: 0,
      brandName: brandForm.brandName
    };
    this.brandsService.insert(brand).subscribe(() => {
      this.goToBrandList();
    });
  }

  goToBrandList() {
    this.router.navigate(['/bike-stores/brands/list']);
  }

  public onClickBtnCancel(e: any) {
    this.goToBrandList();
  }

}
