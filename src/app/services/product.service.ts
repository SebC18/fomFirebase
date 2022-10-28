import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore : AngularFirestore, private storage: AngularFireStorage) { }

  getProducts():Observable<any>{
    return this.firestore.collection('products').snapshotChanges();
  }

  getProduct(id: string):Observable<any>{
    return this.firestore.collection('products').doc(id).snapshotChanges();
  }

  createProduct(newProduct : Partial<Product>): Promise<any>{
    return this.firestore.collection('products').add(newProduct);
  }

  deleteProduct(id: string): Promise<any>{
    return this.firestore.collection('products').doc(id).delete();
  }

  updateProduct(id: string, data: any): Promise<any>{
    return this.firestore.collection('products').doc(id).update(data);
  }
}