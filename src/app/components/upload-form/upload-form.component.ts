import { FileUploadService } from './../../services/file-upload.service';
import { FileUpload } from './../../models/file-upload.model';
import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})


export class UploadFormComponent implements OnInit {
@Input('submited') submited: boolean | undefined; 
imgSrc : string = '../../../assets/img/Placeholder.jpg';
selectedImg : any = null;
imgChoosen : boolean = true;

selectedFiles?: FileList;
currentFileUpload?: FileUpload;
percentage = 0;

  constructor(private uploadService: FileUploadService,
              private _productService : ProductService,
              ) { }

  ngOnInit(): void {
  }

  selectFile(event : any):void{
     this.selectedFiles = event.target.files;   
  }

  uploadMultipleFiles():void{    
    
    if (this.selectedFiles){

        for (let i = 0; i < this.selectedFiles.length; i++) {

          const file = this.selectedFiles.item(i);

          if (file) {
            this.currentFileUpload = new FileUpload(file);

            this.uploadService.pushFiletoStorage(this.currentFileUpload, this._productService.docId ).subscribe(
              percentage => {
                this.percentage = Math.round(percentage ? percentage : 0);
              },
              error =>{
                console.log(error);
              }
            )}
     
        }

      }
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
