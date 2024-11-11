import { CommonModule } from '@angular/common';
import { AfterContentChecked, AfterViewChecked, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { Product } from '../interface';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, TableModule, ToolbarModule, InputTextModule, ToastModule, RippleModule,
            ButtonModule, DialogModule, ReactiveFormsModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  providers: [MessageService]
})

export class TableComponent implements OnInit{
  @Input() childData: string | undefined = '';
  @Output() dataChanged = new EventEmitter<any>();
  products: Product[] = [
                { name: 'Product A', price: 100, category: 'Category 1' },
                { name: 'Product B', price: 200, category: 'Category 2' },
                { name: 'Product C', price: 100, category: 'Category 3' },
                { name: 'Product D', price: 200, category: 'Category 4' },
                { name: 'Product E', price: 100, category: 'Category 5' },
  ]

  update:boolean = false; 
  visible: boolean = false;
  productForm: FormGroup;
  index: any;
  delete: boolean = false;
  deleteIndex: any;
 
  constructor(private fb: FormBuilder, private messageService: MessageService){
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [1, [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
    });


  }

  ngOnInit(): void {
    this.updateParentData()
  }
  
  // common code for add and update that hide and emit data to parent component 
  updateParentData() {
    this.productForm.reset();
    this.visible = false
    this.update = false
    this.products = this.products.slice(); 
    this.dataChanged.emit(this.products);
  }


  // opens confirmation modal

  onDelete(i: number) {
     this.delete = true
     this.deleteIndex = i
    // this.products = this.products.filter((product, index )=> index !== i);
    // // this.productsChange.emit(this.products);
    // this.updateParentData();
  }

  // deletes element from array

  deleteConfirm(){
    
    this.products = this.products.filter((product, index )=> index !== this.deleteIndex);
    // this.productsChange.emit(this.products);
    this.delete = false

    this.updateParentData();
    this.showBottomRight('delete')
  }

  // opens modal and sets value to form

  
  onEdit(product: Product, index: number) {

    this.visible = true
    this.update = true
    this.index = index
    this.productForm.setValue(product)
    
  }

//  adds product to array
  onSubmit() {
    if (this.productForm.valid) {
      this.products.push(this.productForm.value)
      // this.productForm.reset();
      // this.visible = false
      this.products = this.products
      this.updateParentData()
      this.showBottomRight('Add')
    }
    else{
      this.showBottomCenter()
    }

  }



// updates the table with inserted value
  onUpdate(){
    if (this.productForm.valid){
      this.products[this.index] = this.productForm.value;
      this.updateParentData()
      this.showBottomRight('Update')
    }
    else{
      this.showBottomCenter()
    }
  }

  // opens form
  showDialog() {
    this.visible = true;
    this.productForm.reset()
}

onCancel(){
  this.visible = false;
  this.update = false
}

// display toast on success
showBottomRight(val: string) {
  this.messageService.clear();
  this.messageService.add({ severity: 'success', summary: val == 'Update'? 'Updated': val == 'Add'? 'Inserted': 'Deleted', detail: val == 'Update'? 'Product Updated Successfully': val == 'Add'? 'Product Added Successfully': 'Product Deleted Successfully', key: 'br', life: 3000 });
}

// displays error msg for invalid form
showBottomCenter() {
  this.messageService.clear();
  this.messageService.add({key: 'er', severity:'error', summary: 'Error', detail: 'All fields are required'});
}

}
