import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  freshnessList = ['Brand New', 'Second Hand', 'Refurbished']
  productForm !: FormGroup;
  actionBtn: string = 'Save'

  constructor( 
    private fb: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) {
  }
  
  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    })

    if( this.editData){
      this.actionBtn = 'update';
      this.productForm.controls['productName'].setValue(this.editData.productName)
      this.productForm.controls['category'].setValue(this.editData.category)
      this.productForm.controls['freshness'].setValue(this.editData.freshness)
      this.productForm.controls['price'].setValue(this.editData.price)
      this.productForm.controls['comment'].setValue(this.editData.comment)
      this.productForm.controls['date'].setValue(this.editData.date)
    }
  }

  addProduct(){
   if( !this.editData ){
    if( this.productForm.valid ){
      this.api.createProduct(this.productForm.value)
        .subscribe({
          next: (res) => {
            alert('Product addes successfully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: ()=> {
            alert('Error while adding the product')
          }
        })
    } 
   } else {
    this.updateProduct();
  }
  }

  updateProduct(){
    const { id } = this.editData
    this.api.updateProduct( this.productForm.value, id )
      .subscribe({
        next: (res: any) => {
          alert('Product updated Successfully');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: ()=> {
          alert('Error while updating the record!!');
        }
      })
  }

}
