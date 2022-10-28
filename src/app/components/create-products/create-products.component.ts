import { UploadFileService } from './../../services/upload-file.service';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';


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

  constructor(private fb : FormBuilder, 
              private _productService : ProductService, 
              private _uploadService: UploadFileService,
              private router : Router,
              private toastr : ToastrService,
              private aRoute : ActivatedRoute) 
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
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.onEdit();
  }

  onEdit(){
    console.log('id:' + this.id)
    if (this.id !== null ){
      this.loading = true;
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
        })
        this.loading = false;
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
    this.loading = true;
    this.title = 'Create a Product';
    const product = this.productForm.value;
    console.log(this.productForm);
 
     this._productService.createProduct(product).then(()=>{
      this._uploadService.uploadImg('fdvfs');
       this.loading = false;
       this.toastr.success('Product successfully added to Firebase!', 'Product Created!',{
         positionClass: 'toast-bottom-right'
       });
       this.router.navigate(['/list-products']);
     }).catch(error =>{
       this.loading = false;
       this.toastr.error('Product was not added from Firebase!', 'Error!', {
         positionClass: 'toast-bottom-right'
       });
       console.log(error)
     });
  }

  UpdateProduct(id: string){
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

  uploadImgToFireStorage(path: string, imgName: string){
    this
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
