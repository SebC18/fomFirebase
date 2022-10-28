import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireStorage  } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  key = '';
  name = '';
  url = '';
  
  files :any ;
  private basePath = '/uploads';
  constructor(private firestore : AngularFirestore, private afStorage: AngularFireStorage ) {
   }

   initFiles(){
    this.files = this.firestore.collection('/uploads');
   }

   uploadImg(imgUrl : string){
    const storageRef = this.afStorage.ref(`/uploads/${Date.now()}.jpg`)
      .putString(imgUrl);
   }
}
