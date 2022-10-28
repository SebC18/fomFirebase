import { FileUploadService } from './../../services/file-upload.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss']
})
export class UploadListComponent implements OnInit {
 fileUploads?: any[];

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    // this.uploadService.getFiles().snapshotChanges().pipe(
    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        changes.map(c=> ({key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads =>{
      console.log('List of files :' + fileUploads);
      this.fileUploads = fileUploads;
    });
  }

}
