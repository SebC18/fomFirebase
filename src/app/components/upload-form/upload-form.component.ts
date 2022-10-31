import { FileUploadService } from './../../services/file-upload.service';
import { FileUpload } from './../../models/file-upload.model';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.scss']
})
export class UploadFormComponent implements OnInit {

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

  upload():void{
    
    if (this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file){
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
