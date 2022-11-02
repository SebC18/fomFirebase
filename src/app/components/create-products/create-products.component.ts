import { UploadFileService } from './../../services/upload-file.service';
import { ProductService } from './../../services/product.service';
import { Component, Inject, LOCALE_ID, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-create-products',
  templateUrl: './create-products.component.html',
  styleUrls: ['./create-products.component.scss']
})
export class CreateProductsComponent implements OnInit {

  imgSrc : string = '../../../assets/img/Placeholder.jpg';
  selectedImg : any = null;
  imgChoosen : boolean = true;

  productForm: FormGroup;
  loading = false;
  id: string | null;
  title: string = 'Create a Product';

  creationId: any;
  products: any;

  submited = false;

  constructor(private fb : FormBuilder, 
              private _productService : ProductService, 
              private _uploadService: UploadFileService,
              private _fileService : UploadFileService,
              private router : Router,
              private toastr : ToastrService,
              private aRoute : ActivatedRoute,
              @Inject(LOCALE_ID) private locale: string) 
  {
    this.productForm = this.fb.group({
      type: ['', Validators.required],
      name:['', Validators.required],
      price:['', [Validators.required]],
      description:[''],
      uv_protection:[''],
      lens_colour:[''],
      lens_type:[''],
      frame_colour:[''],
      length_of_temple:[''],
      height:[''],
      width:[''],
      intensity:[''],
      imgUrl: [''],
      date:[new Date()]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    this.submited = false;

  }

  ngOnInit(): void {
    this.onEdit();
  }

  onEdit(){
    console.log('id:' + this.id)
    if (this.id !== null ){
      
      this.title = 'Edit a Product';
      
      this._productService.getProduct(this.id).subscribe(data =>{
        const currentProduct = data.payload.data();

        console.log(data.payload.data());
        this.productForm.setValue({
          name : data.payload.data()['name'], 
          type : data.payload.data()['type'],
          price: data.payload.data()['price'],
          height: data.payload.data()['height'] || 0,
          width : data.payload.data()['width'] || 0,
          lens_colour: data.payload.data()['lens_colour'] || '',
          lens_type: data.payload.data()['lens_type'] || '',
          frame_colour: data.payload.data()['frame_colour'] || '',
          length_of_temple: data.payload.data()['length_of_temple'] || 0,
          intensity: data.payload.data()['intensity'] || '',
          uv_protection: data.payload.data()['uv_protection'] || '',
          description: data.payload.data()['description'] || '',
          imgUrl: data.payload.data()['imgUrl'] || '',
          date: data.payload.data()['date'] || '',
        })
      })
    }
  }

  onCreateOrUpdate(){
    if(this.id == null){
      this.onCreate();
    }else{
      this.UpdateProduct(this.id);
    }
  }

  onCreate(){
    this.submited = false;

    this.title = 'Create a Product';
    const product = this.productForm.value;
    
    this.productForm.patchValue({
      date: formatDate(Date.now(), 'yyyy-MM-dd-H-mm-ss', this.locale)//"2022-10-29    14h-41m-29s"
    });
    console.log(this.productForm.value);
     
     this._productService.createProduct(product).then(()=>{

       this.toastr.success('Product successfully added to Firebase!', 'Product Created!',{
         positionClass: 'toast-bottom-right'
       });
       this.creationId = this._productService.docId;
       this.submited = true;
       //this.router.navigate(['/list-products']);
     }).catch(error =>{
       this.toastr.error('Product was not added from Firebase!', 'Error!', {
         positionClass: 'toast-bottom-right'
       });
       console.log(error)
     });
  }

  UpdateProduct(id: string){
    this.submited = false;

    this.loading = true;

    const editedProduct = this.productForm.value;
    
    this._productService.updateProduct(id, editedProduct).then(()=>{
      this.loading = false;
      this.toastr.info('Product successfully edited!', 'Product Edited!',{
        positionClass: 'toast-bottom-right'
      });
      this.router.navigate(['/list-products']);
    });
  }

  showImgPreview(event: any){
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();

      reader.onload = (e:any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImg = event.target.files[0];
      this.imgChoosen = true;
    }else{
      return; 
    }
  }
}
