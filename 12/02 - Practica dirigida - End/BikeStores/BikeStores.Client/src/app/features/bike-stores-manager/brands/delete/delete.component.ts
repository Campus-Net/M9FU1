import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandsService } from '../../../../core/services/data/brands.service';
import { CustomErrorStateMatcher } from '../../../../shared/error/custom-error-state-matcher';
import { Brand } from '../../../../shared/models/brand';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  brandForm!: FormGroup;
  brandId = 0;
  matcher = new CustomErrorStateMatcher();
  brand = new Brand();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private brandsService: BrandsService
  ) { }

  ngOnInit(): void {
    this.brandForm = this.formBuilder.group({
      'brandId': [null, Validators.required],
      'brandName': [null, Validators.required]
    });

    this.brandForm.get('brandId')?.disable();
    this.brandForm.get('brandName')?.disable();

    this.brandId = this.route.snapshot.params['brandId']
    this.getBrandByBrandId(this.brandId);
  }

  private getBrandByBrandId(brandId: number) {
    //To Do
    this.brandsService.getByBrandId(brandId).subscribe(brand => {
      this.brand = brand;
    });
  }

  onFormSubmit(form: any) {
    const brandForm = form;
    //To Do
    this.brandsService.delete(this.brandId).subscribe(() => {
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
