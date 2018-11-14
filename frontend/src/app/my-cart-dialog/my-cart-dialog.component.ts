import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Purchasable } from '../purchasable';

@Component({
  selector: 'app-my-cart-dialog',
  templateUrl: './my-cart-dialog.component.html',
  styleUrls: ['./my-cart-dialog.component.css']
})
export class MyCartDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MyCartDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public purchasable: Purchasable
  ) {}

  ngOnInit() {
  }

  cancelClicked() {
    this.dialogRef.close();
  }
  confirmClicked() {
    this.dialogRef.close(this.purchasable.options);
  }
}
