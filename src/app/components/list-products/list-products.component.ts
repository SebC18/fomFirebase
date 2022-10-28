import { UploadFileService } from './../../services/upload-file.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  products:  any[] = [];
  
  constructor(private firestore : AngularFirestore, 
              private _productService : ProductService,
              private _fileService : UploadFileService,
              private toastr: ToastrService) {
   }

  ngOnInit(): void {
    this.fetchProducts();
  }
  

  fetchProducts(){
    this._productService.getProducts().subscribe(data =>{
      this.products = [];
      
      data.forEach((element: any) => {
        this.products.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data(),
        })
      });
    });
    this._fileService.initFiles();
  }

  delete(id :string){
    this._productService.deleteProduct(id).then(()=>{
      this.toastr.info('Product successfully deleted from Firebase!','Product Deleted!' , {
        positionClass: 'toast-bottom-right'
      });
    }).catch(error =>{
      console.log(error);
      this.toastr.error('Product was not deleted from Firebase!', 'Error!',{
        positionClass: 'toast-bottom-right'
      });
    });
  }
}
