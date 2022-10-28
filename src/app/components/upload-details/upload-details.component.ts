import { FileUploadService } from './../../services/file-upload.service';
import { FileUpload } from './../../models/file-upload.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements OnInit {
@Input() fileUpload!: FileUpload;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  deleteFileUpload(fileUpload: FileUpload): void{
    this.uploadService.deleteFile(fileUpload);
  }
}
